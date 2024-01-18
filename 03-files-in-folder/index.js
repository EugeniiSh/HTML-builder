const fs = require('fs');
const path = require('path');

const pathToSecret = path.join(__dirname, 'secret-folder');

fs.readdir(pathToSecret, {withFileTypes: true}, (err, secretFiles) => 
{
  secretFiles.forEach((item) =>
  {
    if(item.isFile())
    {
      const pathToItem = path.join(pathToSecret, item.name);
      const ext = path.extname(pathToItem).slice(1);
      const itemArr = item.name.split('.');
      const name = itemArr.length === 1 ? itemArr.join('') : itemArr.slice(0, -1).join('.');
     
      fs.stat(pathToItem, (err, stats) =>
      {
        console.log(`${name} - ${ext} - ${stats.size}`);
      })
    }
  })
});