// All imports
import express from "express";
import path from "path";
import multer from "multer";

// Config
const router = express.Router();
// Configure path
const __dirname = path.resolve();
// Initialize multer diskstorage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./src/public/media");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})
// Image filter setup
const fileFilter = function (req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
        callback(null, true);
    } else {
        callback(new Error("Only images are allowed"), false);
    }
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// Route to serve image to frontend (specific)
router.get("/get/image/:imageName", (req, res) => {
    try {
        const imageName = path.join(__dirname + `/src/public/media/${req.params.imageName}`);
        if (!imageName) {
            return res.status(400).json({ message: `No image found with name: ${req.params.imageName}` });
        }
        res.sendFile(imageName);
    } catch (error) {
        res.status(500).json({ error: "An error occured in fetching the image" });
        console.log(error);
    }

})

// Route to upload image
router.post("/upload/image", upload.single("image"), (req, res, next) => {
    try {
        const uploadedMedia = req.file;
        if (!uploadedMedia) {
            return res.status(400).json({ error: "No file was uplaoded" });
        }
        // console.log('Fieldname:', uploadedMedia.fieldname);
        // console.log('Originalname:', uploadedMedia.originalname);
        // console.log('MIME Type:', uploadedMedia.mimetype);
        // console.log('Size:', uploadedMedia.size);
        // console.log('Destination:', uploadedMedia.destination);
        // console.log('Filename:', uploadedMedia.filename);
        // console.log('Path:', uploadedMedia.path);
        res.json({ message: "File uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occured during file upload" });
        console.log(error);
    }
})

export default router;