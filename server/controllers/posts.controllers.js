import Post from '../models/Post.js';
import { uploadImage, deleteImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

// Obtener todos los posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Crear un post
export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;

        let image;

        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);

            // Para borrar el archivo temporal
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }

        }

        const newPost = new Post({ title, description, image });
        await newPost.save();
        return res.json(newPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar un post
export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.send(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Borrar un post
export const removePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);

        if (post && post.image.public_id) {
            await deleteImage(post.image.public_id);
        }

        if (!post) return res.sendStatus(404);
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

// Obtener un post en específico
export const getPost = async (req, res) => {
    try {
        const postFound = await Post.findById(req.params.id);
        if (!postFound) return res.sendStatus(404);
        return res.json(postFound);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};