// Importing required modules
const dgram = require('dgram');
const readline = require('readline');
const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let num1, num2, choice;

rl.question('Enter the first number: ', (inputNum1) => {
  num1 = parseFloat(inputNum1);
  rl.question('Enter the second number: ', (inputNum2) => {
    num2 = parseFloat(inputNum2);
    rl.question('Enter the third number: ', (inputNum3) => {
     choice = parseFloat(inputNum3);

      console.log(`You entered: ${num1}, ${num2}, and ${choice}`);

      const message = Buffer.from(`${num1},${num2},${choice}`);

// Specifying server address and port
      const PORT = 3333;
      const HOST = '127.0.0.1';

// Sending message to the server
      client.send(message, PORT, HOST, (err) => {
      if (err) {
        console.error(`Error sending message: ${err}`);
      } else {
        console.log('Message sent to server');
      }
});

// Listening for messages from the server
    client.on('message', (msg, info) => {
    console.log(`Received message from server: ${msg.toString()} from ${info.address}:${info.port}`);
    });

      rl.close();
    });
  });
});

// Creating a UDP client

// Sending a message to the server


// Close the client after 5 seconds
setTimeout(() => {
    client.close();
}, 5000);
