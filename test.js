var u = require('./models/user');

u.findById(26).then(function (user) {

  console.log(user);

});
