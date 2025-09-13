// src/dao/Users.dao.js
import userModel from './models/User.js';

export default class UsersDAO {
  get = (filter = {}, { limit = 20, page = 1, sort = null, select = null } = {}) => {
    const query = userModel.find(filter);
    if (select) query.select(select);
    if (sort) query.sort(sort);
    return query
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  };

  getBy = (filter = {}, { select = null } = {}) => {
    const query = userModel.findOne(filter);
    if (select) query.select(select);
    return query.lean();
  };

  save = (doc) => {
    return userModel.create(doc); // respetará unique email
  };

  update = (id, doc) => {
    return userModel.findByIdAndUpdate(id, { $set: doc }, { new: true }).lean();
  };

  delete = (id) => {
    return userModel.findByIdAndDelete(id).lean();
  };
}
