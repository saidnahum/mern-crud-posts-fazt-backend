import { Router } from 'express';
import { getPosts, createPost, updatePost, deletePost, getPost } from '../controllers/posts.controllers.js';

const router = Router();

router.get('/posts', getPosts);

router.post('/posts', createPost);

router.put('/posts', updatePost);

router.delete('/posts', deletePost);

router.get('/posts/:id', getPost);


export default router;