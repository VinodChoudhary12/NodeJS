import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // in parametr only multer have file ,jiske andr file hoti hai
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //in this file stored with origanl user name
    //but this is not recomended bcoz if user upload 5 files names as
  },
});
const upload = multer({ storage: storage });

// Export the upload function

export { upload };
