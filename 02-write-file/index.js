const fs = require('fs');
const path = require('path');
const readline = require('readline');

const {stdout, stdin, exit} = require('process');
const input = readline.createInterface(stdin);
const writeStream = fs.createWriteStream(path.join(__dirname, "destination.txt"));

function endWrite()
{
  stdout.write('OK! Enought.');
  exit();
}

stdout.write('Hellow! Great things await us... \n');
input.on('line', (data) =>
{
  if(data === 'exit')
  {
    endWrite();
  }

  writeStream.write(data);
});

process.on("SIGINT", endWrite);