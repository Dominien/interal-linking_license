import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import sanitizeHtml from 'sanitize-html';
import { FiUpload, FiClipboard, FiRefreshCcw, FiPlay } from 'react-icons/fi';

const InternalLinkingTool = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [url, setUrl] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [inputHtml, setInputHtml] = useState('');
  const [excludeUrl, setExcludeUrl] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [error, setError] = useState('');

  // Check for product key in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

  const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'];

  const sanitizeOptions = {
    allowedTags: allowedTags,
    allowedAttributes: {
      'a': ['href', 'name', 'target'],
    },
    allowedStyles: {},
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');
    const sanitizedHtml = sanitizeHtml(pastedData, sanitizeOptions);
    document.execCommand('insertHTML', false, sanitizedHtml);
  };

  const handleGenerateKeywords = () => {
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    const generatedKeywords = ['keyword1', 'keyword2', 'keyword3'];
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
    if (!inputHtml) {
      setError('Please enter text to process.');
      return;
    }
    const sanitizedHtml = sanitizeHtml(inputHtml, sanitizeOptions);
    let processedHtml = sanitizedHtml;
    processedHtml = processedHtml.replace(/keyword/g, '<a href="http://example.com">keyword</a>');
    setOutputHtml(processedHtml);
    setError('');
  };

  const clearText = () => {
    setInputHtml('');
    setOutputHtml('');
    setExcludeUrl('');
    setError('');
  };

  const copyToClipboard = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = outputHtml;
    document.body.appendChild(tempElement);
    const range = document.createRange();
    range.selectNodeContents(tempElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand('copy');
      alert('HTML text copied to clipboard with formatting.');
    } catch (err) {
      setError('Failed to copy text to clipboard.');
    }
    document.body.removeChild(tempElement);
  };

  const handleTextChange = (e) => {
    const html = e.currentTarget.innerHTML;
    setInputHtml(html);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* URL Input and Keyword Generation */}
        <div className="mb-6 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">URL Input and Keyword Generation</h2>
          <p className="mb-4 text-gray-700">Use the tool to generate keywords automatically or upload your own CSV file with keywords and URLs.</p>
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
            <div
              contentEditable="true"
              onInput={handleTextChange}
              onPaste={handlePaste}
              className="w-full p-3 border border-gray-300 rounded mb-4 bg-white"
              style={{ minHeight: '150px' }}
              dangerouslySetInnerHTML={{ __html: inputHtml }}
            />
            <div className="flex space-x-4 mb-4">
              <button onClick={handleProcessText} className="w-1/3 p-3 bg-black text-white rounded flex items-center justify-center">
                <FiPlay className="mr-2" />
                Process
              </button>
              <button onClick={clearText} className="w-1/3 p-3 bg-black text-white rounded flex items-center justify-center">
                <FiRefreshCcw className="mr-2" />
                Clear
              </button>
              <button onClick={copyToClipboard} className="w-1/3 p-3 bg-black text-white rounded flex items-center justify-center">
                <FiClipboard className="mr-2" />
                Copy
              </button>
            </div>
            <label className="block mb-2 text-gray-700">Output Text with Hyperlinks:</label>
            <div
              contentEditable="true"
              className="w-full p-3 border border-gray-300 rounded mb-4 bg-white"
              dangerouslySetInnerHTML={{ __html: outputHtml }}
              style={{ minHeight: '150px' }}
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
    </div>
  );
};

export default InternalLinkingTool;
