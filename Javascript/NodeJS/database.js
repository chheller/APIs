const users = require("./data/users.json");

const client = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const DB_URL = "mongodb://localhost:32771";
const DB_NAME = "data.db";

class MongoDb {
  constructor() {
    const self = this;
    client
      .connect(
        DB_URL,
        { useNewUrlParser: true }
      )
      .then(database => {
        self.db = database.db("admin");
        this.intializeDb();
      })
      .catch(err => console.error(err));
  }

  intializeDb() {
    this.db.collection("users").drop();
    this.insertUsers(users).catch(err => console.error(err));
  }

  dbClose() {
    return this.db.close();
  }

  insertUsers(users) {
    if (!users || users.length <= 0) {
    }
    const collection = this.db.collection("users");
    return collection.insertMany(users);
  }

  insertUser(user) {
    if (!user.name || !user.age)
      return console.error("You must specify a name and age.");
    return this.insertUsers([user]);
  }

  findUser(id) {
    return this.findUsers([id]);
  }

  findUsers(ids) {
    const collection = this.db.collection("users");
    return collection
      .find(!!ids ? { _id: { $in: ids.map(id => new ObjectId(id)) } } : {})
      .toArray();
  }
}

module.exports = MongoDb;
