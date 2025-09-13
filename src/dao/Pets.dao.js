// src/dao/Pets.dao.js
import petModel from './models/Pet.js';

export default class PetsDAO {
  get = (filter = {}, { limit = 20, page = 1, sort = null, select = null } = {}) => {
    const query = petModel.find(filter);
    if (select) query.select(select);
    if (sort) query.sort(sort);
    return query.skip((page - 1) * limit).limit(limit).lean();
  };

  getBy = (filter = {}, { select = null } = {}) => {
    const query = petModel.findOne(filter);
    if (select) query.select(select);
    return query.lean();
  };

  getById = (id, { select = null } = {}) => {
    const query = petModel.findById(id);
    if (select) query.select(select);
    return query.lean();
  };

  save = (doc) => {
    return petModel.create(doc);
  };

  update = (id, doc, options = {}) => {
    const hasOp = doc && Object.keys(doc).some(k => k.startsWith('$'));
    const updateDoc = hasOp ? doc : { $set: doc };
    return petModel.findByIdAndUpdate(id, updateDoc, { new: true, ...options }).lean();
  };

  delete = (id) => {
    return petModel.findByIdAndDelete(id).lean();
  };
}
