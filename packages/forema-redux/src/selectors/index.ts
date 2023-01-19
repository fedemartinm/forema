import { ForemaStore } from "../reducer";

export const selectUser = (state: ForemaStore) => state.forema.user;
