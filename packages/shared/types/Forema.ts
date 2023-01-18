export type Forema = {
  forums: number;
  discussions: number;
  opinions: number;
  users: number;
};

export interface ForemaCatalog {
  getOverview(): Promise<Forema>;
}
