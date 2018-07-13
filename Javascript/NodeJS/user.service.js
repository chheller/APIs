class UserService {
  constructor(db) {
    this.db = db;
  }

  addUser(user) {
    return this.db.insertUser(user);
  }
  getUser(id) {
    return this.db.findUser(id);
  }
  getAllUsers(ids) {
    return this.db.findUsers(ids);
  }
}

module.exports = UserService;
