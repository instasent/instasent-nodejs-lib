var instasent = require('instasent')('my-token');

instasent.get_account_balance.read(function (err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
});
