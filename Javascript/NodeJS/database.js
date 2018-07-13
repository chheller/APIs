const client = require("mongodb").MongoClient;

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
      })
      .catch(err => console.error(err));
  }
  dbClose() {
    return this.db.close();
  }

  insertUser(user) {
    if (!user.name || !user.age)
      return console.error("You must specify a name and age.");
    const collection = this.db.collection("users");
    return collection.insertMany([user]);
  }

  findUser(id) {
    const collection = this.db.collection("users");
    return collection.find({ id }).toArray();
  }

  findUsers(ids) {
    const collection = this.db.collection("users");
    ids = !!ids ? ids : {};
    return collection.find(ids).toArray();
  }
}

module.exports = MongoDb;
