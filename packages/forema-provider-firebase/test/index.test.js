import * as firebase from '@firebase/testing'

import Provider from '../dist/index'

const projectId = 'firestore-emulator-example'
const port = 8080

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ projectId, auth })
}

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId }).catch(console.error)
})

// human
afterAll(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete())).catch(
    console.error,
  )
})

test('require users to log in before creating a profile', async () => {
  const app = authedApp({ uid: 'uid' })
  const provider = new Provider(null, app)

  // prevent no-throws
  expect.assertions(1)
  try {
    await provider.users.createUser({
      userId: 'uidb',
      name: 'jhon',
      username: 'jhon',
      avatarUrl: '',
      email: 'jhon@example.com',
      role: 'user',
    })
  } catch (error) {
    //Check explicit permission-denied
    expect(error.code).toBe('permission-denied')
  }
})

//est('Only authenticated users can be stored', () => {

/**
 * export type User = {
  userId: string,
  name: string,
  username: string,
  avatarUrl: ?string,
  email: string,
  role: "admin" | "moderator" | "user",
};

export interface IUserCatalog {
  createUser(user: User): Promise<User>;
  getUser(userId: string): Promise<?User>;
  updateUser(user: User): Promise<User>;
  deleteUser(userId: string): Promise<boolean>;
}

 */
