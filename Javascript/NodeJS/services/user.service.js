/**
 * Service for adding and getting users
 * @class UserService
 */
class UserService {
  constructor(db) {
    this.db = db;
  }

  addUser(user) {
    return this.db.insertUser(user);
  }
  getUser(id) {
    return this.getUsers([id]);
  }
  getUsers(ids) {
    return this.db.findUsers(ids);
  }
  getAllUsers() {
    return this.db.findUsers();
  }
}

module.exports = UserService;
