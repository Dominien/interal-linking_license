import React, { useState } from 'react';
import { Box, Button, Input, VStack, Textarea, useToast, Heading } from '@chakra-ui/react';

const InternalLinkingTool = () => {
  const [url, setUrl] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [excludeUrl, setExcludeUrl] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const toast = useToast();

  const handleGenerateKeywords = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Mock implementation for generating keywords
    // Replace this with the actual backend call to generate keywords and CSV file
    const generatedKeywords = ['keyword1', 'keyword2', 'keyword3']; // Example
    setKeywords(generatedKeywords);

    toast({
      title: "Success",
      description: "Keyword list generated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleProcessText = () => {
    if (!csvFile) {
      toast({
        title: "Error",
        description: "Please upload a CSV file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter text to process.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Here, you'd implement the actual logic to process the text using the keywords and URLs from the CSV
    // For now, this is a mock implementation
    const processedText = inputText.replace(/keyword/g, '<a href="http://example.com">keyword</a>');
    setOutputText(processedText);

    toast({
      title: "Success",
      description: "Text processed with hyperlinks.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8} bg="gray.100" minHeight="100vh">
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Internal Linking Tool</Heading>

        {/* Upper Part: URL Input and Keyword Generation */}
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleGenerateKeywords}>
            Generate Keywords
          </Button>
        </VStack>

        {/* Lower Part: CSV Upload and Text Processing */}
        <VStack spacing={4} align="stretch">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
          />
          <Input
            placeholder="Exclude URL"
            value={excludeUrl}
            onChange={(e) => setExcludeUrl(e.target.value)}
          />
          <Textarea
            placeholder="Enter text to process"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleProcessText}>
            Process Text
          </Button>
          {outputText && (
            <Box mt={4} p={4} bg="white" borderRadius="md" boxShadow="md">
              <div dangerouslySetInnerHTML={{ __html: outputText }} />
            </Box>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default InternalLinkingTool;
