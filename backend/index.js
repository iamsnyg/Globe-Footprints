import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import {User} from './src/models/users.models.js';
import {authanticateToken} from './src/utils/utility.js'
import {TravelStory} from './src/models/travelStory.models.js'
import {upload} from './src/utils/multer.js'
import fs from 'fs';
import path from 'path';
import connectDB from './src/dB/index.js';

dotenv.config({
    path: "./.env"
});


connectDB()
.then(()=>{
    console.log(`Database connected successfully port ${process.env.PORT || 8000}`);
}
).catch((error)=>{
    console.log(`Error: ${error}`);
});


const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));

// Api creation
app.post("/create-account", async (req, res)=>{
    const {username, password, fullName, email} = req.body;

    if(!username || !password || !fullName || !email){
        return res.status(400).json({message: "All fields are required"});
    }

    const isUserExist= await User.findOne(
        {
            $or: [{username}, {email}]
        }   
    )

    if(isUserExist){
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashedPassword,
        fullName,
        email
    });

    await user.save();

    const AccessToken = jwt.sign(
        {
            userId: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d"
        }
    )
    

    return res.status(201).json({
        error: false,
        user: {
            username: user.username,
            fullName: user.fullName,
            email: user.email
        },
        AccessToken,
        message: "User created successfully"
    })


})

//Login User
app.post("/login", async (req, res)=>{
    const {username, password, email} = req.body;

    if(!email && !username){
        return res.status(400).json({message: "All abc fields are required"});
    }

    const user=await User.findOne({ 
        $or: [{email}, {username}]
    })



    if(!user){
        return res.status(400).json({message: "User does not exist"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

 

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const AccessToken = jwt.sign(
        {
            userId: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d"
        }
    )


    return res.json({
        error: false,
        user: {
            
            username: user.username,
            
        },
        AccessToken,
        message: "User created successfully",
        
    })
})


//Get User
app.get("/get-user", authanticateToken, async (req, res)=>{

    const {userId} = req.user;
    const isUserExist= await User.findOne({_id: userId});

    

    if(!isUserExist){
        return res.status(401).json({message: "User not found"});
    }

    return res.status(200).json({
        user: isUserExist,
        message: "User found successfully"
    })
}
)


//Create Travel Story
app.post("/add-travel-story", authanticateToken, async (req, res)=>{
    const {title, story, visitedLocation, imageUrl, visitedDate} = req.body;
    const {userId} = req.user;

    
    if(!title || !story || !visitedLocation || !imageUrl || !visitedDate){
        return res.status(400).json({message: "All fields are required 1234567"});
    }

    const parsedVisitedDate=new Date(parseInt(visitedDate));

    try {
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate
        
        })
        await travelStory.save();
        res.status(201).json({story: travelStory, message: "Travel story created successfully"});
    } catch (error) {
        res.status(400).json({message: "Travel story creation failed"});
    }

})

//Get all travel stories
app.get("/get-all-travel-stories", authanticateToken, async (req, res)=>{
    const {userId}=req.user;
    
    

    try {
        const travelStories=await TravelStory.find({userId: userId}).sort({
            isFavorite: -1,
        });
        
        
        res.status(200).json({stories: travelStories, message: "Travel stories fetched successfully"});
    } catch (error) {
        res.status(500).json({message: "Travel story fetch failed"});
        
    }
})

//image upload handler
app.post("/upload-image", upload.single("image"), async(req, res)=>{
    try {
        if(!req.file){
            return res.status(400).json({message: "Image is required"});
        }

       
        // prediction error ***
        const imageUrl=`http://localhost:8080/uploads/${req.file.filename}`;

        res.status(201).json({imageUrl, message: "Image uploaded successfully"});
    } catch (error) {
        res.status(500).json({message: "Image upload failed"});
    }
})

//Delete image handler
app.delete("/delete-image", async(req, res)=>{
    const {imageUrl}= req.query;

    

    if(!imageUrl){
        return res.status(400).json({message: "Image url is required"});
    }

   try {
     const fileName=path.basename(imageUrl);
     
     const filePath=path.join(__dirname, "uploads", fileName);
   
 
     if(fs.existsSync(filePath)){
         fs.unlinkSync(filePath);
 
         res.status(200).json({message: "Image deleted successfully"});
     }else{
         res.status(400).json({message: "Image not found"});
     }
   } catch (error) {
       res.status(500).json({message: error.message});
    
   }


 
})

//static  file serving

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use("/assets", express.static(path.join(__dirname, "./src/assets")));


//edit travel story
app.post("/edit-story/:id", authanticateToken, async (req, res)=>{
    const {id}=req.params;
    const {title, story, visitedLocation, imageUrl, visitedDate}=req.body;
    const {userId}=req.user;

    if(!title || !story || !visitedLocation || !visitedDate){
        return res.status(400).json({message: "All fields are required"});
    }

    const parsedVisitedDate=new Date(parseInt(visitedDate));

    try {
        
        const travelStory = await TravelStory.findOne({_id: id, userId: userId});
        if(!travelStory){
            return res.status(404).json({message: "Travel story not found"});
        }

        const placeholderImageUrl="http://localhost:8080/assets/image.png";

        travelStory.title=title;
        travelStory.story=story;
        travelStory.visitedLocation=visitedLocation;
        travelStory.imageUrl=imageUrl || placeholderImageUrl;
        travelStory.visitedDate=parsedVisitedDate;

        await travelStory.save();

        res.status(200).json({story: travelStory, message: "Travel story updated successfully"});

    } catch (error) {
        res.status(500).json({message: "Travel story update failed"});
    }
})

//delete travel story
app.delete("/delete-story/:id", authanticateToken, async (req, res)=>{
    const {id}=req.params;
    const {userId}=req.user;

    try {
        
        const travelStory=await TravelStory.findOne({_id: id, userId: userId});

        if(!travelStory){
            return res.status(404).json({message: "Travel story not found"});
        }

        await travelStory.deleteOne({_id: id, userId: userId});

        const imageUrl=travelStory.imageUrl;
        const fileName=path.basename(imageUrl);
        const filePath=path.join(__dirname, "uploads", fileName);

        fs.unlinkSync(filePath, (err)=>{
            if(err){
                console.error("Failed to delete image file", err);
            }
        });

        res.status(200).json({message: "Travel story deleted successfully"});
    } catch (error) {
        res.status(400).json({message: "Travel story delete failed"});
    }
})

//favorite travel story
app.put("/update-is-favorite/:id", authanticateToken, async (req, res)=>{
    const {id}=req.params;
    const {userId}=req.user;
    const {isFavorite}=req.body;

    try {
        const travelStory=await TravelStory.findOne({_id: id, userId: userId});

        if(!travelStory){
            return res.status(404).json({message: "Travel story not found"});
        }

        travelStory.isFavorite=isFavorite;
        await travelStory.save();

        res.status(200).json({story: travelStory, message: "Travel story updated successfully"});
        
    } catch (error) {
        
    }
})

//search travel story
app.get("/search", authanticateToken, async (req, res)=>{
    const {userId}=req.user
    const {query}=req.query

    if(!query){
        return res.status(400).json({message: "Query is required"});
    }

    try {
        
        const searchResults=await TravelStory.find({
            userId: userId,
            $or: [

                {title: {$regex: query, $options: "i"}},
                {story: {$regex: query, $options: "i"}},
                {visitedLocation: {$regex: query, $options: "i"}}
            ],
        }).sort({
            isFavorite: -1,
        });

        res.status(200).json({stories: searchResults, message: "Search results fetched successfully"});
    } catch (error) {
        res.status(500).json({message: "Search results fetch failed"});
    }
})

//filter travel story by date range
app.get("/travel-stories/filter", authanticateToken, async (req, res)=>{

    const {startDate, endDate}=req.query;
    const {userId}=req.user;

    console.log("userId", userId);

    try {
        const start=new Date(parseInt(startDate));
        const end=new Date(parseInt(endDate));

        console.log("start", start);
        console.log("end", end);

        console.log("------------------------------")


        const filterStories=await TravelStory.find({
            userId: userId,
            visitedDate: {
                $gte: start,
                $lte: end,
            },
        }).sort({
            isFavorite: -1,
        });

        console.log("filterStories", filterStories);
        stories: filterStories,
        res.status(200).json({stories: filterStories, message: "Travel stories fetched successfully"});
    } catch (error) {
        res.status(500).json({message: "Travel stories fetch failed"});
    }
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
}); 



export default app;