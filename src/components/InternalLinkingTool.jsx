import React, { useState } from 'react';
import { FiClipboard, FiRefreshCcw, FiPlay } from 'react-icons/fi';
import sanitizeHtml from 'sanitize-html';
import Navbar from '../Navbar';  // Import Navbar
import Footer from '../Footer';  // Import Footer

const InternalLinkingTool = () => {
  const [inputHtml, setInputHtml] = useState('');
  const [excludeUrl, setExcludeUrl] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleTextChange = (e) => {
    const html = e.target.innerHTML;

    // Sanitize the HTML to remove classes and styles
    const sanitizedHtml = sanitizeHtml(html, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
    });

    setInputHtml(sanitizedHtml);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');

    // Sanitize the pasted HTML to remove classes and styles
    const sanitizedHtml = sanitizeHtml(pastedData, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
    });

    document.execCommand('insertHTML', false, sanitizedHtml);
  };

  const handleProcessText = async () => {
    if (!inputHtml) {
      setError('Please enter text to process.');
      return;
    }

    setLoading(true); // Set loading to true when process starts

    try {
      const response = await fetch('https://backend-internal-linkin-python.onrender.com/process-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_text: inputHtml,
          exclude_url: excludeUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutputHtml(data.hyperlinked_text);
        setError('');
      } else {
        setError('Failed to process text.');
      }
    } catch (err) {
      setError('An error occurred while processing the text.');
    } finally {
      setLoading(false); // Set loading to false when process is complete
    }
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />  {/* Add Navbar here */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Jan Bahmann Internal Linking Tool</h2>
          <div className="mb-4">
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
            >
              {inputHtml && (
                <div dangerouslySetInnerHTML={{ __html: inputHtml }} />
              )}
            </div>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={handleProcessText}
                className="w-1/3 p-3 bg-black text-white rounded flex items-center justify-center"
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : (
                  <FiPlay className="mr-2" />
                )}
                {loading ? 'Processing...' : 'Process'}
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
              style={{ minHeight: '150px' }}
              dangerouslySetInnerHTML={{ __html: outputHtml }}
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
                <div className="mt-2 text-red-700">{error}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />  {/* Add Footer here */}
    </div>
  );
};

export default InternalLinkingTool;
