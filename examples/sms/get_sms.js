var instasent = require('instasent')('my-token');

instasent.get_sms.read(1, 10, function (err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
});
