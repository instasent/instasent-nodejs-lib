var instasent = require('instasent')('my-token');

instasent.do_lookup.create( '+34666666666', function (err, response) {
    if (err) {
        return console.log(err);
    }
    console.log(response);
});
