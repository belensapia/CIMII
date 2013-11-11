fiuba.controller("ChatController", function($scope){
	$scope.current_user = {name: "Alfredo", id: 1, status: "connected", image:"img/default-avatar.gif"};

	$scope.users = [
  		{name: "Pep", id: 2, status: "connected", image:"img/user1.jpg"},
        {name: "Jose", id: 3, status: "connected", image:"img/user2.jpg"},
        {name: "Maria", id: 4, status: "disconnected", image:"img/user3.jpg"},
        {name: "Alejandra", id: 5, status: "disconnected", image:"img/user4.jpg"}];

    $scope.chat_list_open = true;
    $scope.selected_user = false;
    $scope.message = {};

	var messages = {};
	messages[$scope.users[0].id] = [
		{user: $scope.users[0], text: "Hola como estas? Soy Pep."},
		{user: $scope.current_user, text: "Todo bien, aca andamos :)"}];


    $scope.find_user_by_id = function(id){
    	for(user in $scope.users)
    		if($scope.users[user].id == id)
    			return $scope.users[user];
    };

    $scope.append_message = function(){
    	messages[$scope.selected_user.id]
    			.push({user: $scope.current_user, text: $scope.message.text  });

    	$scope.message.text = "";
    }

    $scope.messages_with = function(){
    	return messages[$scope.selected_user.id];
    }

    $scope.open_chat = function(id){
    	$scope.selected_user = $scope.find_user_by_id(id);
    };

    $scope.close_chat = function(){
    	$scope.selected_user = false;
    };

    $scope.close_chat_list = function(){
    	$scope.chat_list_open = !$scope.chat_list_open;
    }
});
