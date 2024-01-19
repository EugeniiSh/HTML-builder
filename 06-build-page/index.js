const fs = require('fs');
const path = require('path');
const http = require("http");

const pathToProject = path.join(__dirname, 'project-dist');
const pathToProjAssets = path.join(pathToProject, 'assets');
const pathToAssets = path.join(__dirname, 'assets');
fs.mkdir(pathToProject, {recursive: true}, () => {});
fs.mkdir(pathToProjAssets, {recursive: true}, () => {});

function getHtml()
{
  const pathToTemp = path.join(__dirname, 'template.html');
  const pathToIndex = path.join(pathToProject, 'index.html');
  const readTemp = fs.createReadStream(pathToTemp, 'utf-8');
 
  let newHtml = '';
  readTemp.on('data', (chunk) => 
  {
    newHtml += chunk;
    fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) =>
    {
      files.forEach((item) =>
      {
        if(item.isFile())
        {
          const pathToItem = path.join(__dirname, 'components', item.name);
          const extItem = path.extname(pathToItem);

          if(extItem === '.html')
          {
            const tegTemplate = `{{${item.name.replace(extItem, '')}}}`;
            const readComponent = fs.createReadStream(pathToItem, 'utf-8');
            readComponent.on('data', (chunk) =>
            {
              newHtml = newHtml.replaceAll(tegTemplate, chunk);
              fs.writeFile(pathToIndex, newHtml, () => {});
            })
          }
        }
      })
    })
  });
}

function getBundleCss()
{
  const pathToFiles = path.join(__dirname, 'styles');
  const pathToBundle = path.join(__dirname, 'project-dist/style.css');
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
}

function getAssets(from, to)
{
  fs.readdir(from,{withFileTypes: true}, (err, files) => 
  {
    files.forEach((item) =>
    {
      if(item.isFile())
      {
        const copyFile = path.join(from, item.name);
        const newFile = path.join(to, item.name);
        fs.copyFile(copyFile, newFile, () => {});
      }
      else
      {
        const pathToFiles = path.join(from, item.name);
        const pathToCopyFiles = path.join(to, item.name);
        fs.mkdir(pathToCopyFiles, {recursive: true}, () => {});
        getAssets(pathToFiles, pathToCopyFiles);
      }

      
    });

    // fs.readdir(/*pathToCopyFiles*/to, (err, copyFiles) =>
    // {

    //   copyFiles.forEach((item) =>
    //   {
    //     if(!Object.values(files).includes(item))
    //     {
    //       const deleteFilePath = path.join(to, item);
    //       fs.unlink(deleteFilePath, () => {});
    //     }
    //   })
    // })
  });
}

getHtml();
getBundleCss();
getAssets(pathToAssets, pathToProjAssets);
