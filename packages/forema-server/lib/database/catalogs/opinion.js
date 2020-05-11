// @flow
import type { Opinion, OpinionCatalog } from 'shared/types';

import type { Collection } from 'mongodb';
import { ObjectID } from 'mongodb';

export class Opinions implements OpinionCatalog {
  opinionsCollection: Collection;

  constructor(db: any) {
    this.opinionsCollection = db.collection('users');
  }

  getAllOpinions(discussionId: string): Promise<Opinion[]> {
    return new Promise<Opinion[]>(async (resolve, reject) => {
      try {
        const opinions = await this.opinionsCollection
          .aggregate([
            { $match: { discussionId: new ObjectID(discussionId) } },
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
              // rename IDs to entityId
              $addFields: {
                opinionId: '$_id',
                'user.userId': '$user._id',
              },
            },
            // remove mongo _id props
            { $project: { _id: 0, 'user._id': 0 } },
          ])
          .toArray();

        resolve(opinions);
      } catch (e) {
        reject(e);
      }
    });
  }

  createOpinion(opinion: Opinion): Promise<Opinion> {
    return new Promise<Opinion>(async (resolve, reject) => {
      try {
        const newOpinion = await this.opinionsCollection.insertOne({
          parentId: opinion.parentId
            ? new ObjectID(opinion.parentId)
            : undefined,
          forumId: new ObjectID(opinion.forumId),
          discussionId: new ObjectID(opinion.discussionId),
          userId: new ObjectID(opinion.userId),
          likes: [],
          dislikes: [],
          date: new Date(),
          content: opinion.content,
        });
        const [inserted] = newOpinion.ops;
        resolve({
          opinionId: newOpinion.insertedId,
          parentId: inserted.parentId,
          forumId: inserted.forumId,
          discussionId: inserted.discussionId,
          userId: inserted.userId,
          user: null,
          likes: inserted.likes,
          dislikes: inserted.dislikes,
          date: inserted.date,
          content: inserted.content,
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  updateOpinion(opinion: Opinion): Promise<Opinion> {
    return new Promise<Opinion>(async (resolve, reject) => {
      try {
        const { value } = await this.opinionsCollection.findOneAndUpdate(
          {
            _id: new ObjectID(opinion.opinionId),
          },
          {
            $set: {
              likes: opinion.likes,
              dislikes: opinion.dislikes,
              content: opinion.content,
            },
          },
          { returnOriginal: false }
        );
        if (value === null) {
          throw new Error('Invalid opinionId');
        } else {
          resolve({
            opinionId: value._id,
            parentId: value.parentId,
            forumId: value.forumId,
            discussionId: value.discussionId,
            userId: value.userId,
            user: null,
            likes: value.likes,
            dislikes: value.dislikes,
            date: value.date,
            content: value.content,
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  deleteOpinion(opinionId: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await this.opinionsCollection.deleteOne({
          _id: new ObjectID(opinionId),
        });

        resolve(result.deletedCount === 1);
      } catch (e) {
        reject(false);
      }
    });
  }

  vote(opinionId: string, userId: string, vote: number): Promise<Opinion> {
    return new Promise<Opinion>(async (resolve, reject) => {
      try {
        let opinion = await this.opinionsCollection.findOne({
          _id: new ObjectID(opinionId),
        });
        if (!opinion) {
          throw new Error('Invalid opinionId');
        }

        // Re-map
        opinion.opinionId = opinion._id;
        delete opinion._id;

        // Vote
        opinion.likes = opinion.likes.filter((u) => u !== userId);
        opinion.dislikes = opinion.dislikes.filter((u) => u !== userId);

        if (vote === 1) {
          opinion.likes.unshift(userId);
        }
        if (vote === -1) {
          opinion.dislikes.unshift(userId);
        }

        const updated = await this.updateOpinion(opinion);
        resolve(updated);
      } catch (e) {
        reject(e);
      }
    });
  }
}
