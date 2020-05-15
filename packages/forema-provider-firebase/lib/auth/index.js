// @flow
import 'firebase/auth'

import * as firebase from 'firebase'

import type { AuthProvider, User } from 'shared/types'

import { Database } from '../database/database'
import firebaseApp from '../firebaseApp'

export class Auth {
  database = new Database()

  /**
   * This method prompt users to sign in with their accounts
   * by opening a pop-up window.
   * @param {*} provider external provider (github, google, facebook)
   * @returns authenticated user object
   * @throws promise is rejected if an error occurs.
   */
  async signInWithProvider(provider: AuthProvider): Promise<User> {
    try {
      var _provider = this.getProvider(provider)
      const { user } = await firebaseApp.auth().signInWithPopup(_provider)

      // get user's data
      let foremaUser = await this.database.users.getUser(user.uid)

      // create if not exists
      if (typeof foremaUser === 'undefined') {
        foremaUser = await this.database.users.createUser({
          userId: user.uid,
          name: user.displayName || 'Full name',
          username: user.uid.slice(0, 15),
          avatarUrl: user.photoURL,
          email: user.email,
          role: 'user',
        })
      }
      // return authenticated user
      return foremaUser
    } catch (e) {
      console.error('login exception:', e)
      throw new Error('Failed to login')
    }
  }

  /**
   * User logout.
   */
  async logout(): Promise<void> {
    await firebaseApp.auth().signOut()
  }

  /**
   * Returns current authenticated user or undefined if not exists.
   *
   */
  getCurrentUser(): Promise<User> {
    return new Promise((resolve) => {
      const unsubscribe = firebaseApp.auth().onAuthStateChanged((authUser) => {
        // onAuthStateChanged is an observer, prevent future calls.
        unsubscribe()
        // get forema user from auth.uid
        if (authUser) {
          this.database.users.getUser(authUser.uid).then((res) => resolve(res))
        } else {
          resolve()
        }
      })
    })
  }

  /**
   * Get firebase authprovider instance
   * @param {*} provider one of: github, google, facebook.
   */
  getProvider(provider: AuthProvider): any {
    switch (provider) {
      case 'github':
        return new firebase.auth.GithubAuthProvider()
      case 'google':
        return new firebase.auth.GoogleAuthProvider()
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider()
      default:
        throw new Error('Login attempt with invalid provider')
    }
  }
}
