import type { IAuth } from "./Auth";
import type { IDiscussionCatalog } from "./Discussion";
import type { IForemaCatalog } from "./Forema";
import type { IForumCatalog } from "./Forum";
import type { IOpinionCatalog } from "./Opinion";
import type { IUserCatalog } from "./User";

/**
 * Provider top level api
 */
export interface IProvider {
  auth: IAuth;
  forema: IForemaCatalog;
  forums: IForumCatalog;
  users: IUserCatalog;
  discussions: IDiscussionCatalog;
  opinions: IOpinionCatalog;
}
