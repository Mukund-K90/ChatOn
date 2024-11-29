const { CONFIG } = require('../config/config');
const cloudinary = require('cloudinary');

// Configuration
cloudinary.config({
    cloud_name: CONFIG.cloudName,
    api_key: CONFIG.cloudinaryApiKey,
    api_secret: CONFIG.cloudinaryApiSecret
});

exports.fileUpload = async (file, type, filename) => {
    const result =
        cloudinary.v2.uploader
            .upload(file,
                {
                    resource_type: type,
                    public_id: filename,
                })
            .catch((error) => {
                console.log(error);
            });
    return result;
}

exports.getFileUrl = (fileName) => {
    const publicId = `profile/${fileName}`;
    const fileUrl = cloudinary.url(publicId)
    console.log(fileUrl);
    return fileUrl;
};

