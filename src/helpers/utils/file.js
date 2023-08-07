const mimeTypes = require('../../definitions/mimeTypes');
const path = require('path');
const shortid = require('shortid-36')

const generateFileName = ({
  fileName,
  mimeType,
}) => {
  const tempFileName = fileName.split('?')[0];
  const mimeTypeFile = mimeTypes[mimeType] || mimeTypes['image/png'];
  const originalName = path.basename(tempFileName);
  const extFile = path.extname(tempFileName) || `.${mimeTypeFile.extension}`;
  const oldName = `${originalName}`.replace(`${extFile}`, '');
  const newName = `${oldName}_${shortid.generate()}${extFile}`.split(' ').join('-');

  return {
    oldName: tempFileName || newName,
    newName,
    extFile,
    mimeType: mimeTypes[mimeType] ? mimeType : 'image/png',
  };
};


module.exports = {
  generateFileName
}