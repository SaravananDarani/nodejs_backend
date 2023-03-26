/**
 * @file
 * 
 * Connection Object and Static variables.
 * 
 */

module.exports = function () {
    var publicObject = {
        webAdmin: {
            Config: { // This object will be copied to the admin web interface for client end configuration
                PATHS: { //PERM_UPLOAD
                    TEMP_UPLOAD: "public/uploads/temp/",
                    RESIZE_UPLOAD: "public/uploads/resize-image/",
                    RESIZE_UPLOAD_M: "public/uploads/m-resize-image/",
                    ORIGNAL_UPLOAD: "public/uploads/originals/",
                    LOGO_UPLOAD: "public/uploads/logo/",
                    FILES_UPLOAD: "public/uploads/files/",
                    QUOTATION_FILES: "public/uploads/files/pdf_files/quotation/"
                }
            }
        }
    }
    return publicObject;
}