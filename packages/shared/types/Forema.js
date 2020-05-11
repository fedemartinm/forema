// @flow
export type Forema = {
  forums: number,
  discussions: number,
  opinions: number,
  users: number,
};

export interface IForemaCatalog {
  getOverview(): Promise<Forema>;
}
