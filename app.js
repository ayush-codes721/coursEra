import express from "express";
import { v1Router } from "./routes/v1.routes.js";
import cookieParser from "cookie-parser";
import { upldaod } from "./config/multer.js";
import bodyParser from "body-parser";
import CloudinaryService from "./service/cloudinary.service.js";

const app = express();

//middleware
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//routes
app.use("/api", v1Router);

app.post('/test',upldaod.single('file'),async (req,res)=>{

    console.log(req.file);

    // {
    //     fieldname: 'file',
    //     originalname: 'Screenshot from 2024-12-16 20-00-36.png',
    //     encoding: '7bit',
    //     mimetype: 'image/png',
    //     destination: 'uploads/',
    //     filename: 'file-1739620712180-96966665.png',
    //     path: 'uploads/file-1739620712180-96966665.png',
    //     size: 505557
    //   }
     
//     const cloudinary = new CloudinaryService();
//    const url= await cloudinary.uploadFile(req.file.path)
    return res.json("sdfnl")
    

})

export{app}
