import { MongoClient } from 'mongodb';

export default class MongoDatabase {
  constructor(dbSettings) {
    this.url = dbSettings.url;
    this.options = dbSettings.options;
    this.client = null;
    this.db = null;
  }

  async connect() {
    return MongoClient.connect(this.url, this.options)
      .then((client) => {
        this.client = client;
        this.db = client.db('forema');
        console.log('Database connection established');
      })
      .catch((err) => console.error(err));
  }

  async disconnect() {
    if (this.client && this.client.isConnected())
      return this.client
        .close()
        .then(() => {
          console.log('Database connection is closed.');
        })
        .catch((err) => {
          console.error('Error closing database connection.');
        });
  }
}
