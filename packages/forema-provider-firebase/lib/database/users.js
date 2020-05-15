// @flow
import 'firebase/auth'
import 'firebase/firestore'

import type { IUserCatalog, User } from 'shared/types'

import Ajv from 'ajv'
import type { ValidateFunction } from 'ajv'
import firebase from '../firebaseApp'
import userSchema from 'shared/schemas/user.json'

export class UserCatalog implements IUserCatalog {
  usersCollection = firebase.firestore().collection('users')
  validateUser: ValidateFunction = new Ajv().compile(userSchema)

  async createUser(user: User): Promise<User> {
    if (!this.validateUser(user)) {
      console.error(this.validateUser.errors, user)
      throw new Error('Invalid user schema')
    }

    ;(await this.usersCollection.doc(user.userId)).set({
      userId: user.userId,
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
      email: user.email,
      role: user.role,
    })

    return user
  }

  async getUser(userId: string): Promise<User> {
    const result = await this.usersCollection.doc(userId).get()
    if (result.exists) {
      const user = result.data()
      return {
        userId: user.userId,
        name: user.name,
        username: user.username,
        avatarUrl: user.avatarUrl,
        email: user.email,
        role: user.role,
      }
    }
  }

  async updateUser(user: User): Promise<User> {
    if (!this.validateUser(user)) {
      console.error(this.validateUser.errors, user)
      throw new Error('Invalid user schema')
    }

    ;(await this.usersCollection.doc(user.userId)).set(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
        email: user.email,
        role: user.role,
      },
      { merge: true },
    )

    return user
  }

  async deleteUser(userId: string): Promise<boolean> {
    await this.usersCollection.doc(userId).delete()
    return true
  }
}
