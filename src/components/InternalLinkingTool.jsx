import React, { useState } from 'react';
import { FiClipboard, FiRefreshCcw, FiPlay } from 'react-icons/fi';

const InternalLinkingTool = () => {
  const [inputHtml, setInputHtml] = useState('');
  const [excludeUrl, setExcludeUrl] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    const html = e.target.innerHTML;
    setInputHtml(html);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, pastedData);
  };

  const handleProcessText = async () => {
    if (!inputHtml) {
      setError('Please enter text to process.');
      return;
    }

    try {
      const response = await fetch('http://your-backend-url/process-text', {
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
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
    </div>
  );
};

export default InternalLinkingTool;