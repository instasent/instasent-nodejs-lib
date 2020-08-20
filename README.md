Welcome to __Instasent Node.js SDK__. This repository contains Node.js SDK for Instasent's REST API.

# Notice!

> **Verify** product is currently deprecated and will be removed in the next release. The same functionality can be easily implemented by sending an SMS. If you need help migrating please contact usage

## Installation

The easiest way to install the SDK is via npm:

```
$ npm install instasent
```

# Usage

Check the [examples directory](https://github.com/instasent/instasent-nodejs-lib/tree/master/examples) to see working examples of this SDK usage

### Sending an SMS

```js
var instasent = require('instasent')('my-token');

instasent.send_sms.create('Company', '+34666666666', 'test message', function (err, response) {
    if (err) {
        console.log(err.errors);
        return;
    }
    console.log(response);
});
```

If you want to send an Unicode SMS (i.e with 😀 emoji) you only need to replace `send_sms` call to `send_sms_unicode`

```js
instasent.send_sms_unicode.create('Company', '+34666666666', 'Unicode test: ña éáíóú 😀', function (err, response) {
    if (err) {
        console.log(err.errors);
        return;
    }
    console.log(response);
});
```

## Available actions

```
SMS
instasent.send_sms.create(sender, to, text, callback)
instasent.send_sms_unicode.create(sender, to, text, callback)
instasent.get_sms.read(page, per_page, callback)
instasent.get_sms_by_id.read(message_id, callback)

LOOKUP
instasent.do_lookup.create(to)
instasent.get_lookup_by_id.read(id)
instasent.get_lookups.read(page, per_page)

ACCOUNT
instasent.get_account_balance.read()
```

# Full documentation

Full documentation of the API can be found at http://docs.instasent.com/

# Getting help

If you need help installing or using the SDK, please contact Instasent Support at support@instasent.com

If you've instead found a bug in the library or have a feature request, go ahead and open an issue or pull request!
