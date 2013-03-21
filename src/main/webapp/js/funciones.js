$(function() {
    
    var wsURI = "ws://" + document.location.host + document.location.pathname + "websocket";
    var websocket = new WebSocket(wsURI);

    var flag = 0;

    var username;
    var texto;
    
    $("input#join").on("click", function() {
        username = $("#nombre").val();
        websocket.send(username + " joined!");
        $(this).prop("disabled", true);
        $("input#chat").prop("disabled", false);
        $("input#nombre").val("");
        $("input#nombre").focus();
    });

    $("input#chat").on("click", function() {
        texto = $("#nombre").val();
        if (texto.length > 0) {
            websocket.send(username + " : " + texto);
            $("input#nombre").val("");
            $("input#nombre").focus();
        }
        else {
            alert("Escribe algo!");
            $("input#nombre").focus();
        }
    });

    $("input#nombre").keypress(function(e) {
        if ($("input#chat").is(":disabled")) {
            if (e.which == 13) {
                $("input#join").click();
            }
        } else {
            if (e.which == 13) {
                $("input#chat").click();
            }
        }
    });

    function onOpen() {
        print("conectado a " + wsURI + "\n");
    }
    function onMessage(evt) {
        if ((evt.data.indexOf("joined!") !== -1)) {
            console.log(evt.data);
            $("#userField").append(evt.data.substring(0,evt.data.indexOf(" joined!")) + "\n");
            print("Recibido: " + evt.data + "\n");
            flag = 1;
        } else {
            if (flag !== 0) {
                $("#chatlogField").append(evt.data + "\n");
                print("Recibido: " + evt.data + "\n");
            }
        }
    }
    function onError(evt) {
        print('<span style="color:red">ERROR</span>' + evt.data);
    }
    function print(message) {
        $("#output").append(message + "<br>");
    }

    websocket.onopen = function(evt) {
        onOpen(evt);
    };
    websocket.onmessage = function(evt) {
        onMessage(evt);
    };
    websocket.onerror = function(evt) {
        onError(evt);
    };
});




