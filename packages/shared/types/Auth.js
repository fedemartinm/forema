/**
 * Supported providers
 */
export type AuthProvider = "google" | "github" | "facebook";

export interface IAuth {
  /**
   * This method prompt users to sign in with their accounts
   * by opening a pop-up window.
   * @returns authenticated user object
   * @throws promise is rejected if an error occurs.
   */
  signInWithProvider(provider: AuthProvider): Promise<User>;

  /**
   * End the user session.
   */
  logout(): Promise<void>;

  /**
   * Get current authenticated user.
   * @returns User object or undefined if not exists.
   */
  getCurrentUser(): Promise<void | User>;
}
