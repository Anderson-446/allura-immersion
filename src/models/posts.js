import "dotenv/config";
import { ObjectId } from "mongodb";
import dbConnection from "../config/dbconfig.js";

const conn = await dbConnection(process.env.STRING_CONNECTION);

export async function getPosts() {
    const db = conn.db("instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

export async function createPost(newPost) {
    const db = conn.db("instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

export async function updatePost(id, updatedPost) {
    const db = conn.db("instabytes");
    const collection = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return collection.updateOne(
        {
            _id: new ObjectId(objectId),
        },
        {
            $set: updatedPost,
        }
    );
}

export async function deletePost(id) {
    const db = conn.db("instabytes");
    const collection = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return collection.deleteOne({
        _id: new ObjectId(objectId),
    });
}