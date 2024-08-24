import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const InternalLinkingTool = () => {
  const [url, setUrl] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [excludeUrl, setExcludeUrl] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const handleGenerateKeywords = () => {
    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    // Mock implementation for generating keywords
    const generatedKeywords = ['keyword1', 'keyword2', 'keyword3']; // Example
    console.log("Generated Keywords:", generatedKeywords);

    setError('');
  };

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleProcessText = () => {
    if (!csvFile) {
      setError('Please upload a CSV file.');
      return;
    }

    if (!inputText) {
      setError('Please enter text to process.');
      return;
    }

    // Mock implementation for processing text
    const processedText = inputText.replace(/keyword/g, '<a href="http://example.com">keyword</a>');
    setOutputText(processedText);
    setError('');
  };

  const clearText = () => {
    setInputText('');
    setOutputText('');
    setExcludeUrl('');
    setError('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
      .then(() => alert('HTML text copied to clipboard with formatting.'))
      .catch(() => setError('Failed to copy text to clipboard.'));
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
            placeholder="Input Text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex space-x-2 mb-2">
            <Button colorScheme="blue" onClick={handleProcessText}>
              Process
            </Button>
            <Button colorScheme="gray" onClick={clearText}>
              Clear
            </Button>
            <Button colorScheme="green" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
          <Textarea
            placeholder="Output Text with Hyperlinks"
            value={outputText}
            readOnly
          />
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default InternalLinkingTool;
