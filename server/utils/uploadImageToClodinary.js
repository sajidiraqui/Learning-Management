//import cloudinary
const cloudinary=require("cloudinary").v2;

exports.uploadImageToCloudinary=async(file, folder,quality,height)=>{

    console.log("file",file);
    console.log("folder",folder);
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    if(height){
        options.height=height;
    }
    options.resource_type = "auto";
    console.log(file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath,options);
    // await cloudinary.uploader.upload (file.tempFilePath ,options, function(error, result) {
    //     if (error) {
    //       console.error('Upload Error:', error);
    //     } else {
    //       console.log('Upload Result:', result);
    //       return result;
    //     }
    // })    
}


// exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
//     const options = {folder};
//     if(height) {
//         options.height = height;
//     }
//     if(quality) {
//         options.quality = quality;
//     }
//     options.resource_type = "auto";

//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }