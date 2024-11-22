import express from "express";
import routes from "./src/routes/postsRouter.js";

const app = express();
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.status(200).json(posts);
});