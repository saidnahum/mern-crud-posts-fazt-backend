import express from 'express';
import fileUpload from 'express-fileupload';
import postsRoutes from './routes/posts.routes.js';
import cors from 'cors';

const app = express();

// middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));
app.use(cors());

// routes
app.use(postsRoutes);

export default app;