/**
 * Arquivo de configuração do multer
 */

const multer = require("multer")
const path = require("path")


module.exports = ({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),

    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName)
    }
  })
})