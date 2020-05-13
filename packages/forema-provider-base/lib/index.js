// @flow
import type { User, IUserCatalog } from 'shared/types'
import type { ValidateFunction } from 'ajv'
import userSchema from 'shared/schemas/user.json'
import Ajv from 'ajv'
/**
 * Sample catalog, just to show types and schema usage
 */
export class Users implements IUserCatalog {
  users: Array<User> = []
  validateUser: ValidateFunction = new Ajv().compile(userSchema)

  createUser(user: User): Promise<User> {
    // validate schema
    return new Promise<User>((resolve, reject) => {
      if (!this.validateUser(user)) {
        reject(new Error('Invalid user schema'))
      }

      // create user
      user.userId = new Date().getTime().toString()
      this.users.push(user)
      resolve(user)
    })
  }
  getUser(userId: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const user = this.users.find((u) => u.userId === userId)
      if (user) resolve(user)
      else reject(new Error('Invalid userId'))
    })
  }
  updateUser(user: User): Promise<User> {
    // validate schema
    return new Promise<User>((resolve, reject) => {
      if (!this.validateUser(user)) {
        reject(new Error('Invalid user schema'))
      }

    // update user
    return new Promise<User>((resolve, reject) => {
      const index = this.users.findIndex((u) => u.userId === user.userId)
      if (user !== -1) {
        this.users[index] = user
        resolve(user)
      } else reject(new Error('Invalid userId'))
    })
  }
  deleteUser(userId: string): Promise<boolean> {
    return new Promise<User>((resolve, reject) => {
      this.users = this.users.filter((u) => u.userId !== userId)
      resolve(true)
    })
  }
}
