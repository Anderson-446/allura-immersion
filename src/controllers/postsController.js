import fs from "fs";
import { getPosts, createPost, updatePost, deletePost } from "../models/posts.js";
import { generateDescriptionWithGemini } from "../services/geminiService.js";
//import { readFileSync } from "fs";

export async function findAll(req, res) {
    const posts = await getPosts();
    res.status(200).json(posts); 
}

export async function create(req, res ) {
    const newPost = req.body;

    try {
        const createdPost = await createPost(newPost);
        res.status(201).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error creating post" });
    }
}

export async function uploadImage(req, res) {
    const newImage = {
        description: "",
        image_url: req.file.originalname,
        alt: ""
    };

    try {
        const uploadedImage = await createPost(newImage);
        const updatedImage = `uploads/${uploadedImage.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(201).json(uploadedImage);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error uploading image" });
    }
}

export async function update(req, res ) {
    const postId = req.params.id;
    const urlImage = `http://localhost:3000/${postId}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${postId}.png`);
        const description = await generateDescriptionWithGemini(imgBuffer);

        const post = {
            ...req.body,
            description,
            image_url: urlImage,
        };

        const updatedPost = await updatePost(postId, post);
        res.status(201).json(updatedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error creating post" });
    }
}

export async function deletePt(req, res) {
    const postId = req.params.id;
    try {
        const deletedPost = await deletePost(postId);
        res.status(200).json(deletedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error deleting post" });
    }
}