import React, { useState } from 'react';
import { FiUpload, FiClipboard, FiRefreshCcw, FiPlay } from 'react-icons/fi';

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
    <div className="p-6 max-w-4xl mx-auto bg-gray-100">
      {/* URL Input and Keyword Generation */}
      <div className="mb-6 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">URL Input and Keyword Generation</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleGenerateKeywords}
            className="w-full p-3 bg-black text-white rounded flex items-center justify-center"
          >
            <FiPlay className="mr-2" />
            Generate Keywords
          </button>
        </div>
      </div>

      {/* Keyword URL Linker */}
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Keyword URL Linker</h2>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Upload CSV File:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <label className="block mb-2 text-gray-700">Exclude URL:</label>
          <input
            type="text"
            placeholder="Enter URL to Exclude"
            value={excludeUrl}
            onChange={(e) => setExcludeUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <label className="block mb-2 text-gray-700">Input Text:</label>
          <textarea
            placeholder="Paste your content here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
            rows="6"
          />
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleProcessText}
              className="w-1/3 p-3 bg-black text-white rounded flex items-center justify-center"
            >
              <FiPlay className="mr-2" />
              Process
            </button>
            <button
              onClick={clearText}
              className="w-1/3 p-3 bg-black text-white rounded flex items-center justify-center"
            >
              <FiRefreshCcw className="mr-2" />
              Clear
            </button>
            <button
              onClick={copyToClipboard}
              className="w-1/3 p-3 bg-black text-white rounded flex items-center justify-center"
            >
              <FiClipboard className="mr-2" />
              Copy
            </button>
          </div>
          <label className="block mb-2 text-gray-700">Output Text with Hyperlinks:</label>
          <textarea
            placeholder="Your processed content will appear here"
            value={outputText}
            readOnly
            className="w-full p-3 border border-gray-300 rounded mb-4"
            rows="6"
          />
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 5.636l-12.728 12.728m12.728 0L5.636 5.636"
                  />
                </svg>
                <span className="ml-2 text-red-600 font-semibold">Error</span>
              </div>
              <div className="mt-2 text-red-700">
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternalLinkingTool;
