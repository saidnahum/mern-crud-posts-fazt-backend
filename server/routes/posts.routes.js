import { Router } from 'express';
import { getPosts, createPost, updatePost, removePost, getPost } from '../controllers/posts.controllers.js';

const router = Router();

router.get('/posts', getPosts);

router.post('/posts', createPost);

router.put('/posts/:id', updatePost);

router.delete('/posts/:id', removePost);

router.get('/posts/:id', getPost);


export default router;