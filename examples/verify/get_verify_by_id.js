var instasent = require('instasent')('my-token');

instasent.get_verify_by_id.read('id', function (err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
});
