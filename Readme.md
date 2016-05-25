Welcome to __Instasent Node.js SDK__. This repository contains Instasent's Node.js SDK and samples for REST API.

## Installation
```
$ npm install instasent
```
## Example
### Send an SMS
You can check 'examples/send-sms.js' file.
```javascript
var instasent = require('instasent')('my-token');

instasent.send_sms.create('My company', '+34666666666', 'test message', function (err, response) {
    if (err) {
        return console.log(err.errors);
    }
    console.log(response);
});
```
## Available functions
```
instasent.send_sms.create(sender, to, text, callback)
instasent.get_sms.read(page, per_page, callback)
instasent.get_sms_by_id.read(message_id, callback)
```
## Documentation
Complete documentation at :
[http://docs.instasent.com/](http://docs.instasent.com/).
# Getting help

If you need help installing or using the library, please contact Instasent Support at support@instasent.com first.
If you've instead found a bug in the library or would like new features added, go ahead and open issues or pull requests against this repo!