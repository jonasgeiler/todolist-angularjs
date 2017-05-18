app.filter('doneFilter', function () {
    return function (state, lang_open, lang_done) {
        if (state == true) {
            return lang_open;
        } else {
            return lang_done;
        }
    };
});