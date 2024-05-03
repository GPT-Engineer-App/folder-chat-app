import React, { useState } from "react";
import { Container, VStack, Button, Input, Text, Box, Heading, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaFolderPlus, FaUpload, FaTrash } from "react-icons/fa";

const Index = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const toast = useToast();

  const handleAddFolder = () => {
    if (newFolderName) {
      setFolders([...folders, { name: newFolderName, files: [] }]);
      setNewFolderName("");
      toast({
        title: "Folder created.",
        description: "You have successfully created a new folder.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder);
  };

  const handleAddFile = () => {
    if (newFileName && selectedFolder) {
      const updatedFolders = folders.map((folder) => {
        if (folder.name === selectedFolder.name) {
          return { ...folder, files: [...folder.files, newFileName] };
        }
        return folder;
      });
      setFolders(updatedFolders);
      setNewFileName("");
      toast({
        title: "File added.",
        description: "You have successfully added a new file to the folder.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteFolder = (folderName) => {
    setFolders(folders.filter((folder) => folder.name !== folderName));
    if (selectedFolder && selectedFolder.name === folderName) {
      setSelectedFolder(null);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Heading>File Management System</Heading>
        <Box>
          <Input placeholder="New folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
          <IconButton icon={<FaFolderPlus />} onClick={handleAddFolder} ml={2} aria-label="Add folder" />
        </Box>
        <List spacing={3}>
          {folders.map((folder) => (
            <ListItem key={folder.name} d="flex" alignItems="center">
              <Button onClick={() => handleSelectFolder(folder)}>{folder.name}</Button>
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteFolder(folder.name)} ml={2} aria-label="Delete folder" />
            </ListItem>
          ))}
        </List>
        {selectedFolder && (
          <VStack>
            <Text>Selected Folder: {selectedFolder.name}</Text>
            <Box>
              <Input placeholder="New file name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
              <IconButton icon={<FaUpload />} onClick={handleAddFile} ml={2} aria-label="Upload file" />
            </Box>
            <List spacing={3}>
              {selectedFolder.files.map((file) => (
                <ListItem key={file}>{file}</ListItem>
              ))}
            </List>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
