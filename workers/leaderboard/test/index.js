const url = "ws://127.0.0.1:8787";

const websocket = new WebSocket(url);

websocket.addEventListener('message', event => {
    console.log('Message received from server');
    console.log(event.data);
});

websocket.onopen = (event) => main(event);
websocket.onclose = websocket.close;

function main(event) {
    console.log(event);
    websocket.send(JSON.stringify({
        auth: "8afdae4b-0d35-475a-8b88-7020469c75f0",
        user: "8afdae4b-0d35-475a-8b88-7020469c75f0",
        board: "8afdae4b-0d35-475a-8b88-7020469c75f0",
        operation: "AddScore",
        args: []
    }));
};