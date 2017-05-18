app.factory('storageProvider', function () {
    var storageProvider = {};

    // Default storage wich is set on the first page load
    storageProvider.default_storage = {
        settings: {
            title: 'TodoListr',
            language: 'en',
            dateformat: 'HH:mm dd.MM.yyyy',
            timezone: '+0000'
        },
        lists: [
            {
                id: 0,
                title: "Default",
                todos: [
                    {
                        id: 0,
                        name: 'Enjoy!',
                        priority: 2,
                        notice: 'Thanks for using!',
                        done: false,
                        date: 1494939867372
                    }
                ]
            }
        ]
    };

    // The loaded storage
    storageProvider.storage = {};

    if (localStorage.length == 0) { // If localstorage is emtpy (First page load)
        storageProvider.default_storage.lists[0].todos[0].date = Date.now(); // Set date of default todo as now

        localStorage.setItem('storage', JSON.stringify(storageProvider.default_storage)); // Save storage to localstorage
        
        storageProvider.storage = storageProvider.default_storage; // Set the loaded storage to the default storage
        
        console.log("Created new storage");
    } else { // If localstorage is not empty and the user has a saved storage
        storageProvider.storage = JSON.parse(localStorage.getItem('storage')); // Load the saved storage
    }

    console.log("Loaded storage");

    // Save function to save to the localstorage
    storageProvider.save = function (newstorage) {
        localStorage.setItem('storage', JSON.stringify(newstorage)); // Save storage to localstorage

        storageProvider.storage = newstorage; // Set the loaded storage to the new storage
         
        console.log("Saved storage");
    };

    return storageProvider;
});