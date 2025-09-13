// src/dao/Users.dao.js
import userModel from './models/User.js';

export default class UsersDAO {
  get = (filter = {}, { limit = 20, page = 1, sort = null, select = null } = {}) => {
    const query = userModel.find(filter);
    if (select) query.select(select);
    if (sort) query.sort(sort);
    return query.skip((page - 1) * limit).limit(limit).lean();
  };

  getBy = (filter = {}, { select = null } = {}) => {
    const query = userModel.findOne(filter);
    if (select) query.select(select);
    return query.lean();
  };

  // Necesario para services/controller
  getById = (id, { select = null } = {}) => {
    const query = userModel.findById(id);
    if (select) query.select(select);
    return query.lean();
  };

  save = (doc) => {
    return userModel.create(doc); // respeta unique email
  };

  // Update flexible: acepta operadores ($addToSet, $set, ...)
  update = (id, doc, options = {}) => {
    const hasOp = doc && Object.keys(doc).some(k => k.startsWith('$'));
    const updateDoc = hasOp ? doc : { $set: doc };
    return userModel.findByIdAndUpdate(id, updateDoc, { new: true, ...options }).lean();
  };

  delete = (id) => {
    return userModel.findByIdAndDelete(id).lean();
  };
}
