import { Auth } from "./Auth";
import { DiscussionCatalog } from "./Discussion";
import { ForemaCatalog } from "./Forema";
import { ForumCatalog } from "./Forum";
import { OpinionCatalog } from "./Opinion";
import { UserCatalog } from "./User";

/**
 * Provider top level api
 */
export interface Provider {
  auth: Auth;
  forema: ForemaCatalog;
  forums: ForumCatalog;
  users: UserCatalog;
  discussions: DiscussionCatalog;
  opinions: OpinionCatalog;
}
