const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth_routes");
const userRoute = require("./routes/users_routes");
const postRoute = require("./routes/posts_routes");
const categoryRoute = require("./routes/categories_routes");
const multer = require("multer");
const path = require("path");

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// Connect MongoDB
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error(err));

// Upload image
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("File has been uploaded");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// Start server
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
