// @flow
import type { Forum, IForumCatalog } from 'shared/types';

import type { Collection } from 'mongodb';
import { ObjectID } from 'mongodb';

export class ForumCatalog implements IForumCatalog {
  forumsCollection: Collection;

  constructor(db: any) {
    this.forumsCollection = db.collection('forums');
    this.forumsCollection.createIndex({ forumSlug: 1 }, { unique: true });
  }

  getAllForums(): Promise<Forum[]> {
    return new Promise<Forum[]>(async (resolve, reject) => {
      try {
        const forums = await this.forumsCollection
          .find({})
          .map((f) => ({
            forumId: f._id,
            forumSlug: f.forumSlug,
            forumName: f.forumName,
            forumDescription: f.forumDescription,
            forumCover: f.forumCover,
            forumType: f.forumType,
          }))
          .toArray();
        resolve(forums);
      } catch (e) {
        reject(e);
      }
    });
  }

  createForum(forum: Forum): Promise<Forum> {
    return new Promise<Forum>(async (resolve, reject) => {
      try {
        const forumSlug = forum;
        const exists = await this.forumsCollection.findOne({ forumSlug });

        if (exists) {
          throw new Error('Forum already exists');
        }

        const newForum = await this.forumsCollection.insertOne({
          forumSlug: forum.forumSlug,
          forumName: forum.forumName,
          forumDescription: forum.forumDescription,
          forumCover: forum.forumCover,
          forumType: forum.forumType,
        });

        const [inserted] = newForum.ops;
        resolve({
          forumId: newForum.insertedId,
          forumSlug: inserted.forumSlug,
          forumName: inserted.forumName,
          forumDescription: inserted.forumDescription,
          forumCover: inserted.forumCover,
          forumType: inserted.forumType,
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  updateForum(forum: Forum): Promise<Forum> {
    return new Promise<Forum>(async (resolve, reject) => {
      try {
        const { value } = await this.forumsCollection.findOneAndUpdate(
          {
            _id: new ObjectID(forum.forumId),
          },
          {
            $set: {
              forumName: forum.forumName,
              forumDescription: forum.forumDescription,
              forumCover: forum.forumCover,
              forumType: forum.forumType,
            },
          },
          { returnOriginal: false }
        );
        if (value === null) {
          throw new Error('Invalid forumId');
        } else {
          resolve({
            forumId: value._id,
            forumSlug: value.forumSlug,
            forumName: value.forumName,
            forumDescription: value.forumDescription,
            forumCover: value.forumCover,
            forumType: value.forumType,
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  deleteForum(forumId: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await this.forumsCollection.deleteOne({
          _id: new ObjectID(forumId),
        });

        resolve(result.deletedCount === 1);
      } catch (e) {
        reject(false);
      }
    });
  }
}
