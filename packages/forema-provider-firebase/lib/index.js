// @flow
import * as firebase from 'firebase'

import type {
  IAuth,
  IDiscussionCatalog,
  IForemaCatalog,
  IForumCatalog,
  IOpinionCatalog,
  IProvider,
  IUserCatalog,
} from 'shared/types'

import { Auth } from './auth'
import { UserCatalog } from './database'

/**
 * Forema Firebase-Provider
 * @see https://github.com/fedemartinm/forema/blob/master/docs/forema-firebase/index.md
 */
export default class FirebaseProvider implements IProvider {
  constructor(config: any, firebaseApp: any) {
    const app = firebaseApp ?? firebase.initializeApp(config)
    this.auth = new Auth(app)
    this.users = new UserCatalog(app)
  }

  // Apis
  auth: IAuth
  forema: IForemaCatalog
  forums: IForumCatalog
  users: IUserCatalog
  discussions: IDiscussionCatalog
  opinions: IOpinionCatalog
}
