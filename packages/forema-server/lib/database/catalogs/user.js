// @flow
import type { User, UserCatalog } from 'shared/types';

import type { Collection } from 'mongodb';
import { ObjectID } from 'mongodb';

export class Users implements UserCatalog {
  usersCollection: Collection;
  constructor(db: any) {
    this.usersCollection = db.collection('users');
  }

  createUser(user: User): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const newUser = await this.usersCollection.insertOne(user);
        resolve(newUser.ops[0]);
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

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  updateUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {});
  }
  deleteUser(userId: string): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {});
  }
}

/*// @flow
export type User = {
  userId: string,
  name: string,
  username: string,
  avatarUrl: string,
  email: string,
  role: 'admin' | 'moderator' | 'user',
};

export interface UserCatalog {
  getUser(userId: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(userId: string): Promise<Boolean>;
}
*/
