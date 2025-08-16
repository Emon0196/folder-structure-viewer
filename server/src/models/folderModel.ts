// Mongoose model for the Folder documents.
import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface for the Folder document.
// This defines the structure and types of a folder.
export interface IFolder extends Document {
  name: string;
  parentId: mongoose.Types.ObjectId | null;
}

// Define the Mongoose schema for the Folder collection.
const FolderSchema: Schema = new Schema({
  // The name of the folder, which is a required string.
  name: { type: String, required: true },
  // The ID of the parent folder. It's an ObjectId type.
  // The 'ref' property creates a reference to another document in the 'Folder' collection.
  // It is set to 'null' by default for the root folder.
  parentId: { type: mongoose.Types.ObjectId, default: null, ref: 'Folder' },
});

// Create and export the Mongoose model.
// This model provides a high-level API for interacting with the database.
export const Folder = mongoose.model<IFolder>('Folder', FolderSchema);