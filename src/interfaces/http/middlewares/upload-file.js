const multer = require('multer');

const fs = require('fs');

const mimeTypes = require('../../../definitions/mimeTypes');
const { generateFileName } = require('../../../helpers/utils/file');

const fileFilters = (req, file, cb) => {
  const allowedFileType = mimeTypes[file.mimetype];
  if (allowedFileType) {
    cb(null, true);
  }

  if (!allowedFileType) {
    cb('Format file upload anda, tidak sesuai. Hanya Dokumen dan Gambar yang diperbolehkan untuk diupload.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempUploadDirectory = `${process.cwd()}/.temp_uploads`;
    if (!fs.existsSync(tempUploadDirectory)) {
      fs.mkdirSync(tempUploadDirectory);
    }

    cb(null, tempUploadDirectory);
  },
  filename: (req, file, cb) => {
    const { newName, extFile } = generateFileName({
      fileName: file.originalname,
      mimeType: file.mimetype,
    });

    // eslint-disable-next-line no-param-reassign
    file.extFile = extFile;

    cb(null, newName);
  },
});

const uploadFile = multer({ storage, fileFilter: fileFilters });

module.exports = uploadFile;
