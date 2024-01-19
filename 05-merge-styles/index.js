const fs = require('fs');
const path = require('path');

const pathToFiles = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist/bundle.css');
const writeStream = fs.createWriteStream(pathToBundle);

fs.readdir(pathToFiles, (err, files) =>
{
  files.forEach((item) =>
  {
    const pathToItem = path.join(pathToFiles, item);
    const extItem = path.extname(pathToItem);
    if(extItem === '.css')
    {
      const readStream = fs.createReadStream(pathToItem, 'utf-8');
      readStream.on('data', (chunk) =>
      {
        writeStream.write(chunk);
      });
    }
  });
});
