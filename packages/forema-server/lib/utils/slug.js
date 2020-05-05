export default (payload) => {
  const uuid = require('uuid').v4();
  return payload.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_' + uuid;
};
