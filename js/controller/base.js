app.controller('BaseController', function($scope, lang, storageProvider){
    // Shortcuts
    $scope.settings = storageProvider.storage.settings;
    $scope.lists = storageProvider.storage.lists;

    // Load languages
    $scope.lang = {};
    lang.load($scope.settings.language) // Returns the return of '$http.get()' object to use 'then()' in this controller
        .then(
            function success(response) {
                $scope.lang = response.data;
                console.log('Loaded language ' + $scope.settings.language);
            },

            function error(response) {
                console.error('Cannot load language \'' + $scope.settings.language + '\'. Response:', response);
            }
        );

    // Simplyfied save storage (for easier use in app)
    $scope.saveStorage = function(){
        storageProvider.save(storageProvider.storage);
    };
});