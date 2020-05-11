// @flow
import type { Discussion, IDiscussionCatalog } from 'shared/types';

import type { Collection } from 'mongodb';
import { ObjectID } from 'mongodb';
import { generateSlug } from '../../utils';

export class DiscussionCatalog implements IDiscussionCatalog {
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
      // Match options
      const match = {};
      const sort = {};

      match.forumId = new ObjectID(forumId);
      if (typeof pinned !== 'undefined') match.pinned = pinned;
      if (sortingMethod === 'date') sort.date = -1;
      if (sortingMethod === 'popularity') sort.likes = -1;

      try {
        const discussions = await this.discussionsCollection
          .aggregate([
            { $match: match },
            { $sort: sort },
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
            // remove mongo _id props
            { $project: { _id: 0, 'user._id': 0, 'forum._id': 0 } },
          ])
          .toArray();

        resolve(discussions);
      } catch (e) {
        reject(e);
      }
    });
  }

  getDiscussion(discussionId: string): Promise<Discussion> {
    return new Promise<Discussion>(async (resolve, reject) => {
      try {
        const discussion = await this.discussionsCollection
          .aggregate([
            { $match: { _id: new ObjectID(discussionId) } },
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
            // remove mongo _id props
            { $project: { _id: 0, 'user._id': 0, 'forum._id': 0 } },
          ])
          .toArray();

        resolve(discussion[0]);
      } catch (e) {
        reject(e);
      }
    });
  }

  createDiscussion(discussion: Discussion): Promise<Discussion> {
    return new Promise<Discussion>(async (resolve, reject) => {
      try {
        const newDiscussion = await this.discussionsCollection.insertOne({
          forumId: new ObjectID(discussion.forumId),
          discussionSlug: generateSlug(discussion.title),
          userId: new ObjectID(discussion.userId),
          date: new Date(),
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
    return new Promise<Discussion>(async (resolve, reject) => {
      try {
        const { value } = await this.discussionsCollection.findOneAndUpdate(
          {
            _id: new ObjectID(discussion.discussionId),
          },
          {
            $set: {
              title: discussion.title,
              content: discussion.content,
              likes: discussion.likes,
              dislikes: discussion.dislikes,
              tags: discussion.tags,
              pinned: discussion.pinned,
              open: discussion.open,
            },
          },
          { returnOriginal: false }
        );
        if (value === null) {
          throw new Error('Invalid discussionId');
        } else {
          resolve({
            discussionId: value._id,
            forumId: value.forumId,
            forum: null,
            discussionSlug: value.discussionSlug,
            userId: value.userId,
            user: null,
            date: value.date,
            title: value.title,
            content: value.content,
            likes: value.likes,
            dislikes: value.dislikes,
            tags: value.tags,
            pinned: value.pinned,
            open: value.open,
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  deleteDiscussion(discussionId: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await this.discussionsCollection.deleteOne({
          _id: new ObjectID(discussionId),
        });

        resolve(result.deletedCount === 1);
      } catch (e) {
        reject(false);
      }
    });
  }

  vote(
    discussionId: string,
    userId: string,
    vote: number
  ): Promise<Discussion> {
    return new Promise<Discussion>(async (resolve, reject) => {
      try {
        const discussion = await this.discussionsCollection.findOne({
          _id: new ObjectID(discussionId),
        });
        if (!discussion) {
          throw new Error('Invalid discussionId');
        }

        discussion.likes = discussion.likes.filter((u) => u !== userId);
        discussion.dislikes = discussion.dislikes.filter((u) => u !== userId);

        if (vote === 1) {
          discussion.likes.unshift(userId);
        }
        if (vote === -1) {
          discussion.dislikes.unshift(userId);
        }

        const updated = await this.updateDiscussion(discussion);
        resolve(updated);
      } catch (e) {
        reject(e);
      }
    });
  }
}
