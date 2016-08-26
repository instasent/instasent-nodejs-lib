var instasent = require('instasent')('my-token');

instasent.request_verify.create('My-company', '+34666666666', 'Your code is %token% ', '', '', '', function (err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
});
