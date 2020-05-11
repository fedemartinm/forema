// @flow
import type { Forema, IForemaCatalog } from 'shared/types';

import type { Db } from 'mongodb';

export class ForemaCatalog implements IForemaCatalog {
  db: Db;

  constructor(db: any) {
    this.db = db;
  }

  getOverview(): Promise<Forema> {
    return new Promise<Forema>(async (resolve, reject) => {
      try {
        let [forums, opinions, discussions, users] = await Promise.all([
          this.db.collection('forums').countDocuments(),
          this.db.collection('opinions').countDocuments(),
          this.db.collection('discussions').countDocuments(),
          this.db.collection('users').countDocuments(),
        ]);

        resolve({
          forums,
          opinions,
          discussions,
          users,
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
