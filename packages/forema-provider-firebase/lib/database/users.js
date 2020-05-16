// @flow
import type { IUserCatalog, User } from 'shared/types'

import Ajv from 'ajv'
import userSchema from 'shared/schemas/user.json'

export class UserCatalog implements IUserCatalog {
  usersCollection: any
  validator: any
  validate: any

  constructor(app: any) {
    this.usersCollection = app.firestore().collection('users')
    this.validator = new Ajv()
    this.validate = this.validator.compile(userSchema)
  }

  get errors() {
    // errors to human readable format
    return this.validator.errorsText(this.validate.errors)
  }

  async createUser(user: User): Promise<User> {
    if (!this.validate(user)) {
      throw new Error(`Invalid user schema: ${this.errors}`)
    }

    await this.usersCollection.doc(user.userId).set({
      userId: user.userId,
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
      email: user.email,
      role: user.role,
    })

    return user
  }

  async getUser(userId: string): Promise<?User> {
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
    if (!this.validate(user)) {
      throw new Error(`Invalid user schema: ${this.errors}`)
    }

    await this.usersCollection.doc(user.userId).set(
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
