// @flow
import type { User, IUserCatalog } from 'shared/types'

/**
 * Sample catalog, just to show catalog types
 */
export class Users implements IUserCatalog {
  users: Array<User> = []

  createUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
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
