/**
 * Instasent API methods
 *
 * @module instasent
 */

var http = require("http");

/**
 * @param {String} accessKey
 * @param {Integer} timeout
 * @return {Object}
 */
module.exports = function (accessKey, timeout) {
    var config = {
        accessKey: accessKey,
        timeout: timeout || 5000
    };

    /**
     * httpRequest does the API call
     * and process the response
     *
     * @param {String} method
     * @param {String} path
     * @param {Object} params
     * @param {Function} callback
     * @return {Void}
     */
    function httpRequest(method, path, params, callback) {

        var options = {};
        var complete = false;
        var body = null;
        var request;

        if (typeof params === 'function') {
            callback = params;
            params = null;
        }

        function doCallback(err, res) {
            if (!complete) {
                complete = true;
                callback(err, res || null);
            }
        }

        options = {
            host: 'https://api.instasent.com',
            path: path,
            method: method,
            port: null,
            headers: {
                'Authorization': 'Bearer '+config.accessKey,
                'Content-Type': 'application/json',
                "accept": "application/json",
                'User-Agent': 'node.js/' + process.versions.node
            }
        };

        if (options.method === 'POST' || options.method === 'PUT') {
            body = JSON.stringify(params);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
        } else {
            // options.path += params ? '?' + querystring.stringify(params) : '';
        }

        request = http.request(options);

        request.on('socket', function (socket) {
            socket.setTimeout(parseInt(config.timeout, 10));
            socket.on('timeout', function () {
                request.abort();
            });
        });

        request.on('error', function (e) {
            var error = new Error('request failed');

            if (error.message === 'ECONNRESET') {
                error = new Error('request timeout');
            }

            error.error = e;
            doCallback(error);
        });

        request.on('response', function (response) {
            var data = [];
            var size = 0;
            var error = null;

            response.on('data', function (ch) {
                data.push(ch);
                size += ch.length;
            });

            response.on('close', function () {
                doCallback(new Error('request closed'));
            });

            response.on('end', function () {
                data = Buffer.concat(data, size)
                    .toString()
                    .trim();

                if (method === 'DELETE' && response.statusCode === 204) {
                    doCallback(null, true);
                    return;
                }

                try {
                    data = JSON.parse(data);
                    // console.log(data.errors);
                    if (data.errors) {
                        error = new Error(data.errors);
                        error.statusCode = response.statusCode;
                        error.errors = data.errors;
                        data = null;
                    }
                } catch (e) {
                    error = new Error('response failed');
                    error.statusCode = response.statusCode;
                    error.error = e;
                    data = null;
                }

                doCallback(error, data);
            });
        });

        request.end(body);
    }

    return {
        get_sms: {
            /**
             * Get account sms's
             *
             * @param {Function} callback
             * @return {void}
             */
            read: function (page, per_page, callback) {
                page = typeof page !== 'undefined' ? page : 1;
                per_page = typeof per_page !== 'undefined' ? per_page : 10;
                url = '/sms/?page='+page+'&per_page='+per_page+'/';
                httpRequest('GET', url, callback);
            }
        },
        get_sms_by_id: {
            /**
             * Get account sms's
             *
             * @param {Function} callback
             * @return {void}
             */
            read: function (id, callback) {
                httpRequest('GET', '/sms/'+id , callback);
            }
        },
        send_sms: {
            /**
             * Get account sms's
             *
             * @param {Function} callback
             * @return {void}
             */
            create: function (from, to, text, callback) {

                params = {
                    'from': from,
                    'to': to,
                    'text': text
                }

                httpRequest('POST', '/sms/' , params,  callback);
            }
        },
        request_verify: {
            /**
             * Request verify
             *
             * @param {Function} callback
             * @return {void}
             */
            create: function (from, to, text, token_length, timeout, client_id, callback) {

                sms = {
                    'from': from,
                    'to': to,
                    'text': text
                }

                if (!(parseInt(token_length) > 2 && parseInt(token_length.length) < 11 )) {
                    token_length = 4;
                }

                if (!(parseInt(timeout)>58)) {
                    timeout = 59;
                }

                if (typeof client_id != 'undefined') {
                    sms.client_id = client_id;
                }

                params = {
                    'sms': sms,
                    'tokenLength': token_length,
                    'timeout': timeout
                }

                httpRequest('POST', '/verify/' , params,  callback);
            }
        },
        check_verify: {
            /**
             * Check verify
             *
             * @param {Function} callback
             * @return {void}
             */
            create: function (id, token, callback) {
                url = '/verify/' + id + '?token=' + token + '/';
                httpRequest('GET', url , {},  callback);
            }
        },
        get_verify_by_id: {
            /**
             * Get verify by id
             *
             * @param {Function} callback
             * @return {void}
             */
            read: function (id, callback) {
                httpRequest('GET', '/verify/' + id , {},  callback);
            }
        },
        get_verify: {
            /**
             * Get account verifies
             *
             * @param {Function} callback
             * @return {void}
             */
            read: function (page, per_page, callback) {
                page = typeof page !== 'undefined' ? page : 1;
                per_page = typeof per_page !== 'undefined' ? per_page : 10;
                url = '/verify/?page='+page+'&per_page='+per_page+'/';
                httpRequest('GET', url, callback);
            }
        },
        do_lookup: {
            /**
             * Get account verifies
             *
             * @param {Function} callback
             * @return {void}
             */
            create: function (to, callback) {
                httpRequest('POST', '/lookup/' , { 'to' :  to},  callback);
            }
        },
        get_lookup_by_id: {
            /**
             * Get account verifies
             *
             * @param {Function} callback
             * @return {void}
             */
            read: function (id, callback) {
                httpRequest('GET', '/lookup/' + id , { },  callback);
            }
        },
        get_lookups: {
            /**
             * Get account verifies
             *
             * @param {Function} callback
             * @return {void}
             */
            read: function (page, per_page, callback) {
                page = typeof page !== 'undefined' ? page : 1;
                per_page = typeof per_page !== 'undefined' ? per_page : 10;
                url = '/lookup/?page='+page+'&per_page='+per_page+'/';
                httpRequest('GET', url, {}, callback);
            }
        },
        get_account_balance: {
            /**
             * Get account verifies
             *
             * @param {Function} callback
             * @return {void}
             */
            read: function (callback) {
                httpRequest('GET', '/organization/account/', {}, callback);
            }
        }
    };

}
