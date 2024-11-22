import { MongoClient } from 'mongodb';

export default async function dbConnection(connectionString) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(connectionString);
        console.log("connecting to database");
        await mongoClient.connect();
        console.log("connected to Mongo database");

        return mongoClient;
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit();
    }
}