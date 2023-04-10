// To convert the binary chunk form of he file saved in mongodb to stream to get the file
import grid from "gridfs-stream";
import mongoose from 'mongoose'

// const URL = "http://localhost:2000";

let gfs, gridFsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "fs"
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
})


/**
 * @method uploadFile
 * @description To upload file in mongodb
 */
export const uploadFile = async ( req, res ) => {
    const URL = process.env.BASE_URL;
    try {
        // If file is not there
        if(!req.file){
            return res.status(404).json("File Not Found!");
        }
        
        // If file found, it will be upoaded in mongodb, so return the url to access the file
        console.log(req.file.filename);
        //Creating an url for the file to be found or downloaded later
        console.log(URL, 'url');
        const imageurl = `${URL}/file/${req.file.filename}`;

        return res.status(200).json(imageurl);
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * @method getFile
 * @description To get the image that has been uploaded in db
 */
export const getFile = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });

        // File is fetched in streams so we need to convert it using gridfs-stream to a string so we can read it
        const readstream = gridFsBucket.openDownloadStream(file._id);
        readstream.pipe(res);
    } catch (error) {
        res.status(500).json(error.message);
    }
}