var socketio = require('socket.io')
	, io
	, guestNumber = 1
	, nickNames = {}
	, namesUsed = []
	, currentRoom = {};

export.listen = function(server){
	io = socketio.listen(server);
	io.set('log level', 1);

	io.sockets.on('connection',function(socket){
		guestNumber = assignGuestName(socket,guestNumber,nickNames,namesUsed);
		joinRoom(socket, 'Lobby');

		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttemps(socket, nickNames,namesUsed);
		handleRoomJoining(socket);
		socket.on('rooms',function(){
			socket.emit('rooms', io.sockets.manager.rooms);
		});
		handleClientDisconnection(socket, nickNames, namesUsed);
	});
}

function assginGuestName(socket, guestNumber, nickNames, namesUsed){
	var name = 'Coquito' + guestNumber;
	nickNames[socket.id] = name ;
	socket.emit('nameResult', {
		success: true,
		name: name
	});

	namesUsed.push(name);
	return guestNumber + 1;
}