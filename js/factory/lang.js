app.factory('lang', function ($http) {
    var lang = {};

    lang.load = function (lang) {
        var url = './languages/' + lang + '.json';
        return $http.get(url);
    };

    return lang;
});
