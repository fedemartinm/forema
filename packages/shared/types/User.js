// @flow
export type User = {
  userId: string,
  name: string,
  username: string,
  avatarUrl: string,
  email: string,
  role: 'admin' | 'moderator' | 'user',
};

export interface UserCatalog {
  getUser(userId: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(userId: string): Promise<Boolean>;
}
