// @flow
export type User = {
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
