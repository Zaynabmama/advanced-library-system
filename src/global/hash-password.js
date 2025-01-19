const bcrypt = require('bcrypt');

const adminpass = 'admin';

bcrypt.hash(adminpass, 10, (err, hash) => {
  if (err) throw err;
  console.log(hash);
});
