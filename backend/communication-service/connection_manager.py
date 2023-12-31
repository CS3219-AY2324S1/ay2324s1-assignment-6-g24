from fastapi import WebSocket, WebSocketDisconnect
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        # self.connection_mapping: dict[str, WebSocket] = {}
        self.connection_mapping: dict[str, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        self.active_connections.append(websocket)

        # Check if the room_id already exists in connection_mapping
        if room_id in self.connection_mapping:
            # If there's already one WebSocket, add this one to the list
            self.connection_mapping[room_id].append(websocket)
        else:
            # Set this WebSocket as the first item in a new list for this room_id
            self.connection_mapping[room_id] = [websocket]
        print(self.connection_mapping)

    def disconnect(self, websocket: WebSocket, room_id: str):
        self.active_connections.remove(websocket)
        if room_id in self.connection_mapping:
            del self.connection_mapping[room_id]

    async def send_personal_message(self, message: str, roomId: str):
        # Retrieve the array of WebSockets for the given roomId
        receiverSockets = self.connection_mapping.get(roomId, [])
        # Send the message to each WebSocket in the array
        for receiverSocket in receiverSockets:
            if receiverSocket:
                await receiverSocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()