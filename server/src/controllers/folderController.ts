// Business logic for handling folder-related operations.
import type { Request, Response } from 'express';
import { Folder } from '../models/folderModel.js';

/**
 * @route   GET /api/folders
 * @desc    Get all folders from the database.
 * @access  Public
 */
export const getFolders = async (req: Request, res: Response): Promise<void> => {
  try {
    const folders = await Folder.find({});
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving folders.', error });
  }
};

/**
 * @route   POST /api/folders
 * @desc    Create a new folder.
 * @access  Public
 */
export const createFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, parentId } = req.body;
    // Validate that a folder name is provided.
    if (!name) {
      res.status(400).json({ message: 'Folder name is required.' });
      return;
    }
    // Create a new folder document. parentId is optional.
    const newFolder = new Folder({ name, parentId: parentId || null });
    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder.', error });
  }
};

/**
 * @route   DELETE /api/folders/:id
 * @desc    Delete a folder by its ID.
 * @access  Public
 */
export const deleteFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const folderToDelete = await Folder.findById(id);

    // Check if the folder exists.
    if (!folderToDelete) {
      res.status(404).json({ message: 'Folder not found.' });
      return;
    }

    // Find the root folder to prevent its deletion.
    const rootFolder = await Folder.findOne({ parentId: null });
    // Use the Mongoose virtual getter 'id' for a cleaner comparison
    if (rootFolder && folderToDelete.id === rootFolder.id) {
      res.status(403).json({ message: 'The root folder cannot be deleted.' });
      return;
    }

    // Check if the folder has any children.
    const hasChildren = await Folder.exists({ parentId: id });
    if (hasChildren) {
      res.status(400).json({ message: 'Cannot delete a folder that contains other folders.' });
      return;
    }

    // Delete the folder.
    await Folder.findByIdAndDelete(id);
    res.status(200).json({ message: 'Folder deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting folder.', error });
  }
};
