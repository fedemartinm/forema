import { UserCatalog, Provider } from "shared";

/**
 *
 */
export class ForemaClient {
  private static instance: ForemaClient;
  private provider: Provider;

  // private to prevent direct construction calls with the `new` operator.
  private constructor(provider: Provider) {
    this.provider = provider;
  }

  /**
   * Use this method to set up a valid provider
   */
  public static initialize(provider: Provider) {
    if (!ForemaClient.instance) {
      ForemaClient.instance = new ForemaClient(provider);
    }

    return ForemaClient.instance;
  }

  /**
   * @returns the unique forema client instance
   */
  public static getInstance(): ForemaClient {
    if (!ForemaClient.instance) {
      throw "Invalid call: Initialize must be called first to set up a valid provider";
    }

    return ForemaClient.instance;
  }

  public get auth() {
    return this.provider.auth;
  }
  public get discussions() {
    return this.provider.discussions;
  }
  public get forema() {
    return this.provider.forema;
  }
  public get forums() {
    return this.provider.forums;
  }
  public get opinions() {
    return this.provider.opinions;
  }
  public get users() {
    return this.provider.users;
  }
}
