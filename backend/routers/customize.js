const express = require('express');
const router = express.Router();
const customizeController = require('../controllers/customize');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/customize');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({storage: storage});

router.get('/get-slide-image', customizeController.getImages);
router.post('/delete-slide-image', customizeController.deleteSildeImage);
router.post('/upload-slide-image', upload.single('image'), customizeController.uploadSlideImage);
router.post('/dashboard-data', customizeController.getAllData);

module.exports = router;