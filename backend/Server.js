import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectCloudinary from "./config/cloudinary";
// import carouselRoutes from './routes/carousel.js'; // Add .js extension
// import searchRoutes from './routes/search.js'; // Add .js extension

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI + '/E-Fancy', {
  // You might want to add these options for better error handling
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Optional: handle connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});
connectCloudinary()

// Middleware
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads')); // Serve static images from uploads folder

// Routes
// app.use('/api/carousel-images', carouselRoutes);
// app.use('/api/search', searchRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});