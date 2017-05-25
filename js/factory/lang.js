app.factory('lang', function ($http) {
    var lang = {};

    lang.load = function (lang) {
        var loadedlang = {};
        var url = 'https://skayo.github.io/AngularJS-TodoList/languages/' + lang + '.json';
        return $http.get(url);
    };

    return lang;
});
