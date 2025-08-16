// --- folder-structure-viewer/client/src/pages/Home.tsx ---
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// Importing the icons for the expanded/collapsed arrows
import { VscFolder, VscFolderOpened } from 'react-icons/vsc';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

// Get the API URL from environment variables.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Define the type for a folder object.
interface Folder {
  _id: string;
  name: string;
  parentId: string | null;
}

/**
 * The main Home component that displays the folder structure.
 */
export const Home: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // New state to manage which folders are expanded.
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // useEffect hook to fetch folders from the backend on component mount.
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/folders`);
        if (!response.ok) {
          throw new Error('Failed to fetch folders');
        }
        const data: Folder[] = await response.json();
        setFolders(data);

        // If no root folder exists, create one automatically.
        const rootFolder = data.find(f => f.parentId === null);
        if (!rootFolder) {
          const newRoot = await createRootFolder();
          setFolders([newRoot, ...data]);
        }
      } catch (err) {
        setError('Could not connect to the server. Please ensure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  /**
   * Helper function to create the initial root folder.
   */
  const createRootFolder = async () => {
    try {
      const response = await fetch(`${API_URL}/api/folders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Root Folder', parentId: null }),
      });
      if (!response.ok) {
        throw new Error('Failed to create root folder');
      }
      return await response.json();
    } catch (err) {
      console.error('Error creating root folder:', err);
      return null;
    }
  };

  /**
   * Toggles the expanded state of a folder.
   * @param folderId The ID of the folder to toggle.
   */
  const handleToggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  /**
   * Handles folder creation.
   * @param parentId The ID of the parent folder.
   */
  const handleCreateFolder = async (parentId: string | null) => {
    const folderName = prompt('Enter folder name:');
    if (!folderName) return;

    try {
      const response = await fetch(`${API_URL}/api/folders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: folderName, parentId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to create folder: ${errorData.message}`);
        return;
      }
      const newFolder: Folder = await response.json();
      setFolders([...folders, newFolder]);
      // Automatically expand the parent folder to show the new folder
      if (parentId) {
        handleToggleFolder(parentId);
      }
    } catch (err) {
      alert('Error creating folder.');
      console.error(err);
    }
  };

  /**
   * Handles folder deletion.
   * @param folderId The ID of the folder to delete.
   */
  const handleDeleteFolder = async (folderId: string) => {
    if (!window.confirm('Are you sure you want to delete this folder and all of its contents?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/folders/${folderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to delete folder: ${errorData.message}`);
        return;
      }
      setFolders(folders.filter(f => f._id !== folderId));
      setExpandedFolders(prev => {
        const newSet = new Set(prev);
        newSet.delete(folderId);
        return newSet;
      });
    } catch (err) {
      alert('Error deleting folder.');
      console.error(err);
    }
  };

  /**
   * Recursive function to build the folder tree structure.
   * @param parentId The ID of the current parent folder.
   * @returns A list of JSX elements representing the folder tree.
   */
  const renderFolderTree = (parentId: string | null) => {
    const children = folders.filter(folder => folder.parentId === parentId);

    return (
      <FolderList>
        {children.map(folder => {
          // Check if this folder has any children
          const hasChildren = folders.some(f => f.parentId === folder._id);
          const isExpanded = expandedFolders.has(folder._id);
          
          return (
            <FolderItem key={folder._id} onClick={() => handleToggleFolder(folder._id)}>
              <FolderHeader>
                {/* Conditionally render the arrow icon */}
                {hasChildren && (
                  <ArrowIconWrapper isExpanded={isExpanded}>
                    {isExpanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
                  </ArrowIconWrapper>
                )}
                {/* Conditionally render the folder icon */}
                <FolderIconWrapper>
                  {isExpanded ? <VscFolderOpened /> : <VscFolder />}
                </FolderIconWrapper>
                <FolderName>{folder.name}</FolderName>
                <ButtonContainer>
                  <AddButton onClick={(e) => { e.stopPropagation(); handleCreateFolder(folder._id); }}>
                    + Add
                  </AddButton>
                  {/* Prevent deleting the root folder */}
                  {folder.parentId !== null && (
                    <DeleteButton onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder._id); }}>
                      - Delete
                    </DeleteButton>
                  )}
                </ButtonContainer>
              </FolderHeader>
              {/* Recursively render children only if the folder is expanded */}
              {isExpanded && renderFolderTree(folder._id)}
            </FolderItem>
          );
        })}
      </FolderList>
    );
  };

  // Display loading, error, or the folder tree.
  if (loading) {
    return <Container>Loading folders...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  return (
    <Container>
      <Header>Folder Structure Viewer</Header>
      <FolderTreeContainer>
        {renderFolderTree(null)}
      </FolderTreeContainer>
    </Container>
  );
};


// Styled components for the UI.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background-color: #f0f2f5;
  color: #333;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #1a237e;
  margin-bottom: 2rem;
`;

const FolderTreeContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
`;

const FolderList = styled.ul`
  list-style-type: none;
  padding-left: 1.5rem;
`;

const FolderItem = styled.li`
  cursor: pointer;
  margin-bottom: 0.5rem;
  border-left: 2px solid #bdbdbd;
  padding-left: 1rem;
`;

const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-radius: 4px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e8eaf6;
  }
`;

const FolderIconWrapper = styled.span`
  margin-right: 0.5rem;
  color: #424242;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

// New styled component for the arrow icon
const ArrowIconWrapper = styled.span<{ isExpanded: boolean }>`
  margin-right: 0.5rem;
  color: #424242;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  transform: rotate(0deg);
  transition: transform 0.2s;
  ${({ isExpanded }) => isExpanded && `
    transform: rotate(0deg);
  `}
`;

const FolderName = styled.span`
  flex-grow: 1;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const AddButton = styled(ActionButton)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #43a047;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #f44336;
  color: white;
  &:hover {
    background-color: #e53935;
  }
`;
