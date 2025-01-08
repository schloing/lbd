const url = "ws://127.0.0.1:8989";

const websocket = new WebSocket(url);

let ready = false;

const messages = document.getElementById("websocketMessages");

const button = document.getElementById("sendMessage");

const connectionInit = JSON.stringify({
    type: "ConnectionInit",
    message: {
        auth: "8afdae4b-0d35-475a-8b88-7020469c75f0",
        user: "8afdae4b-0d35-475a-8b88-7020469c75f0",
        board: "8afdae4b-0d35-475a-8b88-7020469c75f0",
    }
});

const randomName = Math.floor(Math.random() * 10);

button.addEventListener('click', (event) => {
    if (ready)
        websocket.send(JSON.stringify({
            type: "BoardInstruction",
            message: {
                operation: "AddScore",
                args: [Date.now()],
                from: randomName,
            }
        }));
});

websocket.addEventListener('message', event => {
    const p = document.createElement("li");
    p.innerText = event.data;
    messages.appendChild(p);
});

websocket.onopen = (event) => websocket.send(connectionInit); ready = true;
websocket.onclose = websocket.close;