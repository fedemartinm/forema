// @flow
import type { Discussion, DiscussionCatalog } from 'shared/types';

import type { Collection } from 'mongodb';
import { ObjectID } from 'mongodb';

export class Discussions implements DiscussionCatalog {
  discussionsCollection: Collection;

  constructor(db: any) {
    this.discussionsCollection = db.collection('discussions');
    this.discussionsCollection.createIndex(
      { discussionSlug: 1 },
      { unique: true }
    );
  }

  getDiscussions(
    forumId: string,
    pinned: ?boolean,
    sortingMethod: 'date' | 'popularity'
  ): Promise<Discussion[]> {
    return new Promise<Discussion[]>(async (resolve, reject) => {
      //Options
      const sort = {};
      switch (sortingMethod) {
        case 'popularity':
          sort._id = -1;
          break;
        default:
        case 'date':
          sort._id = 1;
          break;
      }
      console.log('SORT', sort);
      try {
        const discussions = await this.discussionsCollection
          .aggregate([
            { $match: { forumId: new ObjectID(forumId) } },
            // join refs
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
              },
            },
            { $unwind: '$user' },
            {
              $lookup: {
                from: 'forums',
                localField: 'forumId',
                foreignField: '_id',
                as: 'forum',
              },
            },
            { $unwind: '$forum' },
            {
              // rename IDs to entityId
              $addFields: {
                discussionId: '$_id',
                'user.userId': '$user._id',
                'forum.forumId': '$forum._id',
              },
            },
            // remove mongo _id prop
            { $project: { _id: 0, 'user._id': 0, 'forum._id': 0 } },
            { $sort: sort },
          ])
          .toArray();

        resolve(discussions);
      } catch (e) {
        reject(e);
      }
    });
  }

  getDiscussion(
    discussionSlug: ?string,
    discussionId: ?string
  ): Promise<Discussion[]> {
    return new Promise(() => {});
  }

  createDiscussion(discussion: Discussion): Promise<Discussion> {
    return new Promise<Discussion>(async (resolve, reject) => {
      try {
        const newDiscussion = await this.discussionsCollection.insertOne({
          discussionId: discussion.discussionId,
          forumId: new ObjectID(discussion.forumId),
          discussionSlug: discussion.discussionSlug,
          userId: new ObjectID(discussion.userId),
          date: discussion.date,
          title: discussion.title,
          content: discussion.content,
          likes: [],
          dislikes: [],
          tags: discussion.tags,
          pinned: discussion.pinned,
          open: discussion.open,
        });

        const [inserted] = newDiscussion.ops;
        resolve({
          discussionId: newDiscussion.insertedId,
          forumId: newDiscussion.forumId,
          forum: null,
          discussionSlug: inserted.discussionSlug,
          userId: inserted.userId,
          user: null,
          date: inserted.date,
          title: inserted.title,
          content: inserted.content,
          likes: inserted.likes,
          dislikes: inserted.dislikes,
          tags: inserted.tags,
          pinned: inserted.pinned,
          open: inserted.open,
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  updateDiscussion(discussion: Discussion): Promise<Discussion> {
    return new Promise(() => {});
  }
  deleteDiscussion(discussionId: string): Promise<boolean> {
    return new Promise(() => {});
  }
  vote(
    discussionId: string,
    userId: string,
    vote: Number
  ): Promise<Discussion> {
    return new Promise(() => {});
  }
}
