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
    return this.getAllUsers([id]);
  }
  getAllUsers(ids) {
    return this.db.findUsers(ids);
  }
}

module.exports = UserService;
