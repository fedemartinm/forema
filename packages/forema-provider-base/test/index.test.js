import { Users } from '../dist/index'

/**
 * Sample test, just to try jest!
 */
describe('it should manage users', () => {
  it('should add user', () => {
    var users = new Users()
    return users
      .createUser({
        userId: '',
        name: 'User Name',
        username: 'username',
        avatarUrl: '',
        email: 'user@email.com',
        role: 'user',
      })
      .then(({ userId, name, username, avatarUrl, email, role }) => {
        expect(typeof userId).toBe('string')
        expect(name).toEqual('User Name')
        expect(email).toEqual('user@email.com')
        expect(role).toEqual('user')
      })
  })
})
