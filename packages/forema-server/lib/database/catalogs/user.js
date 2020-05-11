// @flow
import type { IUserCatalog, User } from 'shared/types';

import type { Collection } from 'mongodb';
import { ObjectID } from 'mongodb';

export class UserCatalog implements IUserCatalog {
  usersCollection: Collection;

  constructor(db: any) {
    this.usersCollection = db.collection('users');
    this.usersCollection.createIndex({ username: 1 }, { unique: true });
  }

  createUser(user: User): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const newUser = await this.usersCollection.insertOne({
          name: user.name,
          username: user.username,
          avatarUrl: user.avatarUrl,
          email: user.email,
          role: user.role,
        });
        const [inserted] = newUser.ops;
        resolve({
          userId: newUser.insertedId,
          name: inserted.name,
          username: inserted.username,
          avatarUrl: inserted.avatarUrl,
          email: inserted.email,
          role: inserted.role,
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getUser(userId: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const result = await this.usersCollection.findOne({
          _id: new ObjectID(userId),
        });

        resolve({
          userId: result._id,
          name: result.name,
          username: result.username,
          avatarUrl: result.avatarUrl,
          email: result.email,
          role: result.role,
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  updateUser(user: User): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const { value } = await this.usersCollection.findOneAndUpdate(
          {
            _id: new ObjectID(user.userId),
          },
          {
            $set: {
              name: user.name,
              avatarUrl: user.avatarUrl,
              email: user.email,
              role: user.role,
            },
          },
          { returnOriginal: false }
        );
        if (value === null) {
          throw new Error('Invalid userId');
        } else {
          resolve({
            userId: value._id,
            name: value.name,
            username: value.username,
            avatarUrl: value.avatarUrl,
            email: value.email,
            role: value.role,
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  deleteUser(userId: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await this.usersCollection.deleteOne({
          _id: new ObjectID(userId),
        });

        resolve(result.deletedCount === 1);
      } catch (e) {
        reject(false);
      }
    });
  }
}
