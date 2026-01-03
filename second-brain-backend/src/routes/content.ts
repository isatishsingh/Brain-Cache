import { Request, Response, Router } from "express";
import { content } from "../models/content.js";
import { linkModel } from "../models/link.js";
import { tagsModel } from "../models/tag.js";
import { contentType } from "../types/content.js";
import { authChecker } from "../middleware/authChecker.js";
import { randomBytes } from "crypto";

const ContentRouter = Router();

ContentRouter.post("/api/v1/newContent", authChecker, async (req, res) =>{
    try {
        
        const {link, type, title, tags}: contentType = req.body;
        

        const userId: string | undefined = req.userId;

        if (!link || !type || !title) {
            return res.status(411).json({ error: "Missing required fields" });
        }
        
        if(!userId){
            return res.status(401).json({
                message : "Unauthorized User Access"
            });
        }
        
        let processedTags: any = [];

        if(tags){
            if(typeof tags === "string"){
                processedTags = tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
            }else if(Array.isArray(tags)){
                processedTags = tags.map((tag : string) => tag.trim()).filter(Boolean);
            }
        }

        console.log("Processed Tags: ",processedTags);

        const tagIds = await Promise.all(processedTags.map(async (tagName : string) =>{
            const tag = await tagsModel.findOneAndUpdate(
                {title: tagName},
                {title: tagName},
                {upsert: true, new:true},
            );
            return tag._id;
        }));

        console.log("Tag id :",tagIds);

        await content.create({
            link,
            type,
            title,
            tags: tagIds,
            userId
        });
        
        return res.status(201).json({
            message : "New Content Added Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }

});

ContentRouter.get("/api/v1/getAllContent", authChecker, async (req, res) =>{
    try {
        const userId: string | undefined = req.userId;
        if(!userId){
            return res.status(401).json({
                message : "Unauthorized User Access",
            });
        }

        const userContents = await content.find({userId}).populate("tags","title")
        .populate("userId","firstName lastName email");

        return res.status(200).json(userContents);
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error: error,
        });
    }
})

ContentRouter.delete("/api/v1/content", authChecker, async (req, res) =>{
    try {
        const contentId : string | undefined = req.body.contentId;
        const userId: string | undefined = req.userId;

        if(!contentId){
            return res.status(400).json({
                message : "Enter the valid contentId to delete that specific content",
            });
        }

        if(!userId){
            return res.status(401).json({
                message : "Unauthorized User Access",
            });
        }

        const deletedContent = await content.deleteOne({_id:contentId, userId});

        if(deletedContent.deletedCount === 0){
            return res.status(303).json({
                message : "No Content found to delete with this contentId by you userId",
            });
        }

        return res.status(200).json({
            message : "Content deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            error: error
        });
    }
});

ContentRouter.post("/api/v1/brain/share", authChecker, async (req, res) =>{
    try {
        const contentId : string | undefined = req.body.contentId;
        const share : boolean | undefined = req.body.share;
        const userId: string | undefined = req.userId;

        if(!contentId || typeof share !== "boolean"){
            return res.status(400).json({
                message : "Please provide valid contentId and share(boolean) value",
            });
        }

        if(!userId){
            return res.status(401).json({
                message : "Unauthorized User Access",
            });
        }

        if(share){
            const shareLink = await linkModel.findOne({userId, contentId});

            if(shareLink){
                return res.status(200).json({
                    hash: shareLink.hash,
                })
            }
            
            const newHash = randomBytes(10).toString("hex").slice(0,10);

            await linkModel.create({hash:newHash, contentId, userId});

            return res.status(200).json({
                hash : newHash
            });
        }else{
            const deleteLink = await linkModel.deleteOne({userId, contentId});

            if(deleteLink.deletedCount === 0){
                return res.status(303).json({
                    message : `No such Shareable link found of contentId ${contentId} from you account`,
                })
            }

            return res.status(200).json({
                message: `Access removed for the contentId ${contentId} by your account`,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server error",
            error: error
        })
    }
})

ContentRouter.get("/api/v1/brain/share/:hash", async (req:Request, res: Response) =>{
    try {
        const { hash } = req.query;
        console.log("requested hash id ",hash);

        if(!hash){
            return res.status(400).json({
                message : "Please enter valid shared hash link"
            })
        }
        const link = await linkModel.findOne({hash});
        
        console.log("link is ",link);
        if(!link){
            return res.status(400).json({
                error : "Invalid or expired link"
            });
        }

        const fetchedContent = await content.findOne({_id: link.contentId})
        .populate("userId","firstName lastName email")
        .populate("tags","title");

        console.log("fetched Content",fetchedContent);
        if(!fetchedContent){
            return res.status(400).json({
                message: "content not found",
            })
        }

        return res.status(200).json({fetchedContent});
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server error"
        })
    }
})

export {ContentRouter};
