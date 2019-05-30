const express = require('express');
const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage')


// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('You can upload only image files!');
    }
}



const uploadRouter = express.Router();

uploadRouter.post('/image',(req, res) => {
        upload(req,res,(error) =>{
            if(error){
                res.status(400).json({
                    success:false,
                    error:error

                })
            }else{
                if (req.file == undefined) {
                    res.status(400).json({
                        success:false,
                        message: "No File Selected!"
                    });
                } else {
                    res.json(req.file);
                }

                

            }
        });
    });


module.exports = uploadRouter;
