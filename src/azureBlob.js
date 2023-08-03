const { BlobServiceClient } = require("@azure/storage-blob");

const blobSasUrl = "https://azplatformsa.blob.core.windows.net/?sv=2022-11-02&ss=b&srt=sco&sp=rwdlactfx&se=2023-08-03T14:06:25Z&st=2023-08-03T06:06:25Z&spr=https&sig=%2FE6akdjidpnUbdZB4oUUMSppgqA7qkpXc3juKCTBfKg%3D";

console.log("Creating blob service client....");
const blobServiceClient = new BlobServiceClient(blobSasUrl);
console.log("Blob service client created!");

const containerClient = blobServiceClient.getContainerClient('formupload');

const uploadFiles = async (file) => {
    try {
        console.log("Uploading files...");
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        blockBlobClient.uploadBrowserData(file);
        console.log("Done.");
    }
    catch (error) {
            console.log(error.message);
    }
}

export {uploadFiles};
