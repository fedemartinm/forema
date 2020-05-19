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

//
// #region USERS
//

test('require users to log in before creating a profile', async () => {
  const app = authedApp(null)
  const provider = new Provider(null, authedApp(null))

  // prevent no-throws
  expect.assertions(1)
  try {
    await provider.users.createUser({
      userId: 'auth.result.user.uid',
      name: 'Jane Doe',
      username: 'jane',
      avatarUrl: '',
      email: 'jd@example.com',
      role: 'user',
    })
  } catch (error) {
    //Check explicit permission-denied
    expect(error.code).toBe('permission-denied')
  }
})

test('should only let users create their own profile', async () => {
  const app = authedApp({ uid: 'jane-uid' })
  const provider = new Provider(null, app)

  // prevent no-throws
  expect.assertions(1)

  const createResult = await provider.users.createUser({
    userId: 'jane-uid',
    name: 'Jane Doe',
    username: 'jane',
    avatarUrl: '',
    email: 'jd@example.com',
    role: 'user',
  })
  expect(createResult).toBeDefined()
})

test('no user can create an account for another user', async () => {
  const app = authedApp({ uid: 'john-uid' })
  const provider = new Provider(null, app)
  // prevent no-throws
  expect.assertions(1)
  try {
    await provider.users.createUser({
      userId: 'auth.result.user.uid',
      name: 'Jane Doe',
      username: 'jane',
      avatarUrl: '',
      email: 'jd@example.com',
      role: 'user',
    })
  } catch (error) {
    //Check explicit permission-denied
    expect(error.code).toBe('permission-denied')
  }
})

test('should let anyone read any profile', async () => {
  const app = authedApp(null)
  const provider = new Provider(null, app)
  // prevent no-throws
  expect.assertions(1)

  const getResult = await provider.users.getUser('indexistent-uid')
  expect(getResult).toBeUndefined()
})

//
// #endregion
//

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
