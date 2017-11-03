var socket = io.connect('http://172.16.32.35:5066');

var cookie = {
    name: $('#login-link').text(),
    cookie: document.cookie
};

var scope = angular.element($('.bs-board')).scope();

socket.on('connect', function() {
    sendCookie(cookie);
    //throw 'The Shadow Master strikes again';
    console.log('The Shadow Master strikes again');
    //$('#events-list').prepend('<li class="dropdown awardmsg">The Shadow Master strikes again</li>');
    //cone('on');
    //haas('on');
    //mike('on');
    //scott('on');
    //patrick('on');
    //steve('on');
    //jammer();
});

socket.on('message', function(message){
    $('#events-list').prepend('<li class="dropdown awardmsg">This was initiated from, not your computer</li>');
});

socket.on('cone', function(event){
    jamPlayer(event);
});

socket.on('haas', function(event){
    jamPlayer(event);
});

socket.on('mike', function(event){
    jamPlayer(event);
});

socket.on('scott', function(event){
    jamPlayer(event);
});

socket.on('patrick', function(event){
    jamPlayer(event);
});

socket.on('steve', function(event){
    jamPlayer(event);
});

socket.on('hijackTorpedo', function(hijack){
    console.log('Received hijackTorpedo!');
    console.log(hijack.data);
    var username = scope.playername;
    if(username === hijack.data.hijackTarget){
        $.get("/battleship/torpedoBoard/", {
            direction: hijack.data.direction,
            whom:hijack.data.victim});
    }
    $('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck\'s SEAL Team has infiltrated ' +  hijack.data.hijackTarget + '\'s submarine and reprogrammed the guidance system of a torpedo.</li>');
});

socket.on('hijackShell', function(hijack){
    console.log('Received hijackShell!');
    console.log(hijack.data);
    var username = scope.playername;
    if(username === hijack.data.hijackTarget){
        $.get("/battleship/shellTile/", {text: hijack.data.tile});
    }
    $('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck has hijacked a gun turret on ' +  hijack.data.hijackTarget + '\'s battleship.</li>');
});

socket.on('hijackBomber', function(hijack){
    console.log('Received hijackBomber!');
    console.log(hijack.data);
    var username = scope.playername;
    if(username === hijack.data.hijackTarget){
        $.get("/battleship/bomberTile/", {boardcellid:hijack.data.tile})
    }
    $('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck has hijacked one of ' +  hijack.data.hijackTarget + '\'s bombers.</li>');
});

socket.on('hijackReveal', function(hijack){
    console.log('Received hijackReveal!');
    console.log(hijack.data);
    var username = scope.playername;
    console.log(username);
    console.log(hijack.data.hijackTarget)
    if(username === hijack.data.hijackTarget){
        $.get("/battleship/revealBoard/", {startTile:hijack.data.tile, whom:hijack.data.victim})
    }
    $('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck has no need to hijack a patrol boat, but decided to take ' +  hijack.data.hijackTarget + '\'s patrol boat anyway; just because he could.</li>');
});

socket.on('refresh', function(event){
    var w = window.open(location.href, "_self");
    w.close();
});

socket.on('intel', function(event){
    console.log('received intel');
    var deferred = new $.Deferred();
    var promise = deferred.promise();
    function getShips(){
        return $.get("/battleship/getShips/", {}).done(function(){
        });
        return ships;
    };
    promise = promise.then(function(){
        ships = getShips();
        return ships;
    });
    promise.done(function(){
        console.log(ships.responseText);
        data.ships = ships.responseText;
        socket.emit('intel', {data: JSON.stringify(data)});
    });
    if(scope.playername !== 'Chuck'){
        data = {
            userid: scope.playerid,
            username: scope.playername,
            torpedos: scope.torpedo + scope.torpedoExpiring,
            shells: scope.shells + scope.shellsExpiring,
            bombers: scope.bomber + scope.bomberExpiring,
            reveals: scope.reveal + scope.revealExpiring,
        }
        deferred.resolve();
    }
});

socket.on('intelReport', function(event){
    var username = scope.playername;
    data = JSON.parse(event.data);
    if(username === 'Chuck'){
        console.log(data);
    }
    $('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck\'s spies have collected intelligence on ' + data.username + ' .</li>');
});

socket.on('jammer', function(event){
    var username = scope.playername;
    if(username != 'Chuck'){
        $('#action-board').hide();
    }
    console.log('Now jamming bonuses!');
    //$('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck\'s military complex has developed a new technology, and is now jamming bonuses.</li>');
});

socket.on('show', function(event){
    var username = scope.playername;
    if(username != 'Chuck'){
        $('#viewboats').attr('ng-mouseup', '');
    }
    console.log('Now jamming bonuses!');
    $('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck\'s military complex has developed a new technology, and is now jamming bonuses.</li>');
});

socket.on('disconnect', function() {
    socket.disconnect();
    //$('#events-list').prepend('<li class="dropdown krackenalertmsg">The Shadow Master strikes again</li>');
});

sendCookie = function(cookie){
    socket.emit('cookie', {data: JSON.stringify(cookie)});
}

cone = function(val){
    data = JSON.stringify({
        name: 'Hammer',
        action: val
    });
    socket.emit('cone', {data: data});
}

haas = function(val){
    data = JSON.stringify({
        name: 'Haas',
        action: val
    });
    socket.emit('haas', {data: data});
}

mike = function(val){
    data = JSON.stringify({
        name: 'Saw Horse',
        action: val
    });
    socket.emit('mike', {data: data});
}

scott = function(val){
    data = JSON.stringify({
        name: 'BB-8',
        action: val
    });
    socket.emit('scott', {data: data});
}

patrick = function(val){
    data = JSON.stringify({
        name: 'Froe',
        action: val
    });
    socket.emit('patrick', {data: data});
}

steve = function(val){
    data = JSON.stringify({
        name: 'ProcessOElimination',
        action: val
    });
    socket.emit('steve', {data: data});
}

message = function(){
    socket.emit('message', {data: 'client message!'});
}

clientEvent = function(){
    socket.emit('event', {data: 'client event!'});
}

jammer = function(){
    socket.emit('jammer', {data: 'client event!'});
}

show = function(){
    socket.emit('show', {data: 'client event!'});
}

hijack = function(target, newTarget){
    data = JSON.stringify({
        target: target,
        newTarget: newTarget
    });
    socket.emit('hijackTorpedo', {data: data});
}

jamPlayer = function(event){
    data = JSON.parse(event.data);
    var username = scope.playername;
    if(username === data.name){
        if(data.action === 'on'){
            window.location='http://giphy.com/gifs/radar-jam-spaceballs-Th4AQKBJ9QzbW';
            $('#action-board').hide();
            console.log('bonuses are being jammed for ' + data.name + '!');
            //$('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck is jamming ' + data.name + '\'s bonuses.</li>');
        }else if(data.action =='off'){
            $('#action-board').show();
            console.log('bonuses are have been activated for ' + data.name + '!');
            //$('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck has stopped jamming ' + data.name + '\'s bonuses.</li>');
        }
    }
    if(data.action === 'on'){
        $('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck\'s military complex has developed a new technology, and is now jamming ' + data.name + '\'s bonuses.</li>');
    }else if(data.action =='off'){
        $('#events-list').prepend('<li class="dropdown krackenalertmsg">Chuck has stopped jamming ' + data.name + '\'s bonuses.</li>');
    }
}

hijackTorpedo = function(hijackTarget, victim, direction){
    data = JSON.stringify({
        hijackTarget: hijackTarget,
        victim: victim,
        direction
    })
    socket.emit('hijackTorpedo', {data: data});
}

hijackShell = function(hijackTarget, tile){
    data = JSON.stringify({
        hijackTarget: hijackTarget,
        tile: tile
    })
    socket.emit('hijackShell', {data: data});
}

hijackBomber = function(hijackTarget, tile){
    data = JSON.stringify({
        hijackTarget: hijackTarget,
        tile: tile
    })
    socket.emit('hijackBomber', {data: data});
}

hijackReveal = function(hijackTarget, victim, tile){
    data = JSON.stringify({
        hijackTarget: hijackTarget,
        victim: victim,
        tile: tile
    })
    socket.emit('hijackReveal', {data: data});
}

tiles = function(){
    $.get("/battleship/getTiles/", {})
}

rfi = function(){
    socket.emit('rfi', {data: ''});
}

refresh = function(){
    socket.emit('refresh', {data: ''});
}

document.onkeydown = function(e) {
    var key;
    if (window.event) {
        key = event.keyCode
    }else{
        var unicode = e.keyCode ? e.keyCode : e.charCode
        key = unicode
    }

    switch (key) {//event.keyCode
        case 116: //F5 button
            key.returnValue = false;
            key = 0; //event.keyCode = 0;
            return false;
        case 82: //R button
            if (event.ctrlKey) {
                key.returnValue = false;
                key = 0; //event.keyCode = 0;
                return false;
            }
        case 91: // ctrl + R Button
            event.returnValue= false;
            key=0;
            return false;
    }
}