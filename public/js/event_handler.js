var socket = io.connect();
$(document).ready(function(){
	var chatApp =  new Chat(socket);
	socket.on('nameResult',function(result){
		var message;
		if(result.success){
			message = 'You are now know as ' + result.name + '.';
		} else {
			message =  result.message;
		}
		$('#messages').append(divSystemContentElement(message));

	});
	socket.on('joinResult',function(result){
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed'));
	});
	socket.on('message',function(message){
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});
	socket.on('rooms',function(rooms){
		$('#room-list').empty();

		for(var room in rooms){
			room = room.substring(1,room.length);
			if(room!=''){
				$('#room-list').append(divEscapedContentElement(room));
			}
		}
		$('#room-list div').click(function(){
			chatApp.proccessCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});
	setInterval(function(){
		socket.emit('rooms')
	},1000);

	$('#send-message').focus();
	$('#send-button').click(function(){
		proccessUserInput(chatApp,socket);
		return false;
	});
});