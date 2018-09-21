const users = require('./data/users.json');
const { MongoClient, ObjectId } = require('mongodb');

class MongoDb {
  constructor(port = 27017) {
    const DB_URL = `mongodb://localhost:${port}`;
    const self = this;
    MongoClient.connect(
      DB_URL,
      { useNewUrlParser: true }
    )
      .then(database => {
        self.db = database.db('admin');
        this.intializeDb();
      })
      .catch(err => console.error(err));
  }

  intializeDb() {
    const userCollection = this.db.collection('users');
    if (userCollection) userCollection.drop();
    this.insertUsers(users).catch(err => console.error(err));
  }

  dbClose() {
    return this.db.close();
  }

  insertUsers(users) {
    if (!users || users.length <= 0) {
    }
    const collection = this.db.collection('users');
    return collection.insertMany(users);
  }

  insertUser(user) {
    if (!user.name || !user.age) return console.error('You must specify a name and age.');
    return this.insertUsers([user]);
  }

  findUsers(ids) {
    const collection = this.db.collection('users');
    return collection
      .find(!!ids ? { _id: { $in: ids.map(id => new ObjectId(id)) } } : {})
      .toArray();
  }
}

module.exports = MongoDb;
