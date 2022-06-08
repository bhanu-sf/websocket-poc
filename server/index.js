// Importing the required modules
const WebSocketServer = require('ws');
const textData = require('./data');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");

    // sending message
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
        const obj = JSON.parse(data);
        const msg = new Array(parseInt(`${obj.size}`)).fill(textData).join('');

        setInterval(function () {
            ws.send(JSON.stringify({
                sent: Date.now(),
                data: msg,
            }))
        }, parseInt(`${obj.freq}`) * 1000);

    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");