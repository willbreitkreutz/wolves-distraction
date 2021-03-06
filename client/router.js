var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var HowlsPage = require('./pages/howls');
var querystring = require('querystring');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'howls': 'howls',
        'login': 'login',
        'logout': 'logout',
        'auth/callback': 'authCallback'
    },

    home: function () {
        this.trigger('page', new HomePage());
    },

    howls: function () {
        this.trigger('page', new HowlsPage());
    },

    login: function () {
        var baseUrl = 'http://wolves.technology/authorize?redirect_uri=';
        window.location = baseUrl + encodeURIComponent(window.location.origin + '/auth/callback')
    },

    authCallback: function () {
        var parsed = querystring.parse(window.location.hash.slice(1));
        me.token = parsed.access_token;
        this.redirectTo('/howls');
    },

    logout: function () {
        me.token = '';
        this.redirectTo('/');
    }
});
