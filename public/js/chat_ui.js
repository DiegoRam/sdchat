function divEscapedContentElement(message){
	console.log('dibujando nuevo texto ' + message );
	return $('<div></div>').text(message);
}

function divSystemContentElement(message){
	return $('<div></div>').html('<i>' + message + '</i>');
}

function proccessUserInput(chatApp,socket){
	console.log('entro al proceso');
	var message = $('#send-message').val();
	var systemMessage;

	if(message.charAt(0) == '/'){
		systemMessage = chatApp.processCommand(message);
		if(systemMessage){
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		chatApp.sendMessage($('#room').text(), message);
		console.log('despues de enviar mensaje: ' + message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}
	$('#send-message').val('');
}