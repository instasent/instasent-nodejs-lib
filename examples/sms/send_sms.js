var instasent = require('instasent')('my-token');

instasent.send_sms.create('My company', '+34666666666', 'test message', function (err, response) {
    if (err) {
        return console.log(err.errors);
    }
    console.log(response);
});