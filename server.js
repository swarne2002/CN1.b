// Importing required modules
const dgram = require('dgram');
const { stringify } = require('querystring');

// Creating a UDP server
const server = dgram.createSocket('udp4');

// Binding the server to a port and host
const PORT = 3333;
const HOST = '127.0.0.1';

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

// Handling incoming messages
server.on('message', (message, remote) => {
    console.log(`Received message from client: ${message.toString()}`);
    const [num1, num2, choice] = message.toString().split(',').map(Number);
    let ans;
    if(choice===1){
        ans = num1+num2
    }
    else if(choice===2){
        ans = num1-num2;
    }
    else if(choice===3){
        ans = num1*num2;
        }
        else{
            ans = num1/num2;
        }
    // Echo message back to the client
    // console.log(ans);
    let message1 = ""+ans+"";
    server.send(message1, remote.port, remote.address, (err) => {
        if (err) {
            console.error(`Error sending message: ${err}`);
        } else {
            console.log('Message sent to client');
        }
    });
});

// Start the server
server.bind(PORT, HOST);
