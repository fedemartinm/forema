import { Users } from '../dist/index'

/**
 * Sample test, just to try jest!
 */
describe('it should manage users', () => {
  it('should add user', () => {
    var users = new Users()
    return users
      .createUser({
        name: 'User Name',
        username: 'username',
        avatarUrl: '',
        email: 'user@email',
        role: 'user',
      })
      .then(({ userId, name, username, avatarUrl, email, role }) => {
        expect(typeof userId).toBe('string')
        expect(name).toEqual('User Name')
        expect(email).toEqual('user@email')
        expect(role).toEqual('user')
      })
  })
})
