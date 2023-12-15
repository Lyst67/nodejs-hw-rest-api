const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");

const resize = async (filename) => {
  const image = await Jimp.read(filename);
  await image.resize(250, 250);
  await image.writeAsync(`tmp/avatar.png`);
};

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    resize(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
