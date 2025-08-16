// Express router for folder-related API endpoints.
import { Router } from 'express';
import { getFolders, createFolder, deleteFolder } from '../controllers/folderController.js'; // Corrected: Added .js extension

const router = Router();

// Define routes and their corresponding controller functions.
router.get('/', getFolders);
router.post('/', createFolder);
router.delete('/:id', deleteFolder);

export default router;
