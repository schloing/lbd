const url = "ws://127.0.0.1:8787";

const websocket = new WebSocket(url);

let ready = false;

const messages = document.getElementById("websocketMessages");

const button = document.getElementById("sendMessage");

const shit = JSON.stringify({
    auth: "8afdae4b-0d35-475a-8b88-7020469c75f0",
    user: "8afdae4b-0d35-475a-8b88-7020469c75f0",
    board: "8afdae4b-0d35-475a-8b88-7020469c75f0",
    operation: "AddScore",
    args: []
});

button.addEventListener('click', (event) => {
    if (ready)
        websocket.send(shit);
});

websocket.addEventListener('message', event => {
    // const data = JSON.parse(event.data);
    const p = document.createElement("li");
    p.innerText = event.data;
    messages.appendChild(p);
});

websocket.onopen = (event) => ready = true;
websocket.onclose = websocket.close;