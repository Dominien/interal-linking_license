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
    <Box className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <Box className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        <Heading className="text-2xl font-bold mb-6 text-center">Internal Linking Tool</Heading>

        {/* URL Input and Keyword Generation */}
        <VStack spacing={4} className="mb-6">
          <Input
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            size="lg"
            className="w-full"
          />
          <Button colorScheme="blue" onClick={handleGenerateKeywords} className="w-full">
            Generate Keywords
          </Button>
        </VStack>

        {/* CSV Upload and Text Processing */}
        <VStack spacing={4}>
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            size="lg"
            className="w-full"
          />
          <Input
            placeholder="Exclude URL"
            value={excludeUrl}
            onChange={(e) => setExcludeUrl(e.target.value)}
            size="lg"
            className="w-full"
          />
          <Textarea
            placeholder="Input Text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            size="lg"
            className="w-full"
            resize="vertical"
          />
          <div className="flex space-x-2 w-full">
            <Button colorScheme="blue" onClick={handleProcessText} className="w-1/3">
              Process
            </Button>
            <Button variant="outline" onClick={clearText} className="w-1/3">
              Clear
            </Button>
            <Button colorScheme="green" onClick={copyToClipboard} className="w-1/3">
              Copy
            </Button>
          </div>
          <Textarea
            placeholder="Output Text with Hyperlinks"
            value={outputText}
            readOnly
            size="lg"
            className="w-full mt-4"
            resize="vertical"
            height="150px"
          />
          {error && (
            <Alert status="error" className="mt-4">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default InternalLinkingTool;
