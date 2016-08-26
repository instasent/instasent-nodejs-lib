var instasent = require('instasent')('my-token');

instasent.check_verify.create('id', 'token', function (err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
});
