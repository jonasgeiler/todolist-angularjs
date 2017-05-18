app.controller('TodoListController', function($scope, $routeParams, $location){
    // Base.js variable
    var base = $scope.$parent;

    // Shortcut to use $location inside HTML
    $scope.location = $location;

    // Set current showing tab to the id passed by url
    $scope.show_tab = $routeParams.id;

    // Add-Todo form model
    $scope.add_todo = {};

    // Set priority to "0" so the first option in the selection ("Select Priority...") is selected by default
    $scope.add_todo.priority = "0";

    // Called when clicking the checkbox next to a todo.
    $scope.checkTodo = function(listID, todoID){
        if (base.lists[listID].todos[todoID].done){ // Check if todo is done
            base.lists[listID].todos[todoID].done = false; // If it was already done, set it back to false ("open")
            console.log("Unchecked " + listID + "," + todoID );
        } else {
            base.lists[listID].todos[todoID].done = true; // If it was open, set it to true ("done")
            console.log("Checked " + listID + "," + todoID);
        }
        base.saveStorage(); // Save storage
    };

    // Called when the Add-Todo form gets submitted
    $scope.addTodo = function(){
        // Default values
        $scope.add_todo.done = false;
        $scope.add_todo.id = base.lists[$scope.show_tab].todos.length;
        $scope.add_todo.date = Date.now();

        $scope.add_todo.priority = parseInt($scope.add_todo.priority); // Convert priority from string (from option value) to integer
        
        // If no notice was set, set notice to an empty string
        if (typeof $scope.add_todo.notice == "undefined")
            $scope.add_todo.notice = "";

        console.log("Added todo:");
        console.log($scope.add_todo);

        base.lists[$scope.show_tab].todos.push($scope.add_todo); // Push the new todo to the todo-list of the current list 

        base.saveStorage(); // Save storage

        $scope.add_todo = {}; // Reset form
        $scope.add_todo.priority = "0"; // Set priority to the first option in the selection again
    };

    // Called when the "Remove ticked todos" button is clicked
    $scope.removeTickedTodos = function (listID) {
        // Filter out checked todos
        base.lists[listID].todos = base.lists[listID].todos.filter(function (val) {
            if (val.done) {
                console.log("Removed todo " + listID + "," + val.id);
                return false;
            }
            return true;
        });

        // Reindex todos
        for (var t = 0; t < base.lists[listID].todos.length; t++) {
            base.lists[listID].todos[t].id = t;
        }

        base.saveStorage(); // Save storage
    };

    // Called when the "New list" button is clicked
    $scope.newList = function(){
        var newlist = {}; // Object for the newlist

        var title = prompt(base.lang.newlistprompt + ": ", "New list"); // Display Prompt with input. "title" is input after submitting
        if (title != null){ // Check if title isn't empty
            // Default values
            newlist.id = base.lists.length;
            newlist.title = title;
            newlist.todos = [];

            base.lists.push(newlist); // Push the new list to the list of lists

            base.saveStorage(); // Save storage

            console.log("Added new list: " + newlist.title);

            $location.path('/list/' + newlist.id); // Show the new list
        }
    };

    // Called when the "Delete list" button is clicked
    $scope.deleteList = function (listID) {
        var confirmed = confirm(base.lang.deleteconfirm); // Get confirmation if the user really wants to delete the current list. "confirmed" is true if the user confirms

        // If the user pressed "Cancel", abort
        if (confirmed == false)
            return;

        base.lists.splice(listID, 1); // Remove list from the list of lists

        console.log("Removed list " + listID);

        // Reindex lists
        for (var l = 0; l < base.lists.length; l++) {
            base.lists[l].id = l;
        }

        base.saveStorage(); // Save storage

        $location.path('/list/0'); // Redirect to the first list
    };
});