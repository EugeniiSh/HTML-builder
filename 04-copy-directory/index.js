const fs = require('fs');
const path = require('path');

const pathToFiles = path.join(__dirname, 'files');
const pathToCopyFiles = path.join(__dirname, 'files-copy');
fs.mkdir(pathToCopyFiles, {recursive: true}, () => {})

fs.readdir(pathToFiles, (err, files) => 
{
  files.forEach((item) =>
  {
    const copyFile = path.join(pathToFiles, item);
    const newFile = path.join(pathToCopyFiles, item);
    fs.copyFile(copyFile, newFile, () => {});
  });

  fs.readdir(pathToCopyFiles, (err, copyFiles) =>
  {
    copyFiles.forEach((item) =>
    {
      if(!files.includes(item))
      {
        const deleteFilePath = path.join(pathToCopyFiles, item);
        fs.unlink(deleteFilePath, () => {});
      }
    })
  })
});