package com.mycompany.mavenproject2;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.Session;
import javax.websocket.WebSocketClose;
import javax.websocket.WebSocketEndpoint;
import javax.websocket.WebSocketError;
import javax.websocket.WebSocketMessage;
import javax.websocket.WebSocketOpen;

@WebSocketEndpoint("/websocket")
public class ChatEndpoint {

    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @WebSocketClose
    public void onClose(Session peer) {
        System.out.println("Usuario se fué");
        if (peers != null) {
            Iterator it = peers.iterator();
            while (it.hasNext()) {
                System.out.println(it.next());
            }
        }
        peers.remove(peer);
    }

    @WebSocketMessage
    public void message(String message, Session session) throws IOException, EncodeException {
        System.out.println("Broadcasting the message " + message);
        for (Session peer : peers) {
            peer.getRemote().sendObject(message);
        }
    }

    @WebSocketOpen
    public void onOpen(Session peer) {
        System.out.println("New user got connected");
        peers.add(peer);
    }

    @WebSocketError
    public void onError() {
    }
}
