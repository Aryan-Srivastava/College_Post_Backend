const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth_routes');
const userRoute = require('./routes/users_routes');
const postRoute = require('./routes/posts_routes');
const categoryRoute = require('./routes/categories_routes');
const multer = require('multer');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());

// Connect MongoDB
mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...'))

// Upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('File has been uploaded');
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
