import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiClipboard, FiRefreshCcw, FiPlay } from 'react-icons/fi';
import sanitizeHtml from 'sanitize-html';

const InternalLinkingTool = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [inputHtml, setInputHtml] = useState('');
  const [excludeUrl, setExcludeUrl] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [error, setError] = useState('');
  const [csvDownloadUrl, setCsvDownloadUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login page if no token is found
    } else {
      fetch('https://backend-internal-linking.onrender.com/api/validate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.valid) {
            localStorage.removeItem('token');
            navigate('/');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/');
        });
    }
  }, [navigate]);

  const handleGenerateKeywords = async () => {
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    setError('');
    
    try {
      const response = await fetch('https://your-flask-backend-url/generate-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: url, max_depth: 2 }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        setCsvDownloadUrl(downloadUrl);
        setError('');
      } else {
        setError('Failed to generate keywords.');
      }
    } catch (err) {
      setError('An error occurred while generating keywords.');
    }
  };

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');

    const sanitizedHtml = sanitizeHtml(pastedData, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
      },
      allowedStyles: {},
    });

    document.execCommand('insertHTML', false, sanitizedHtml);
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

    const sanitizedHtml = sanitizeHtml(inputHtml, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
      },
      allowedStyles: {},
    });

    let processedHtml = sanitizedHtml.replace(/keyword/g, '<a href="http://example.com">keyword</a>');
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
    const html = e.target.innerHTML;
    setInputHtml(html);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">URL Input and Keyword Generation</h2>
          <p className="mb-4 text-gray-700">
            Use the tool to generate keywords automatically or upload your own CSV file with keywords and URLs.
          </p>
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
            {csvDownloadUrl && (
              <a href={csvDownloadUrl} download="keywords_urls.csv" className="mt-4 inline-block p-3 bg-blue-500 text-white rounded">
                Download CSV
              </a>
            )}
          </div>
        </div>

        {/* The rest of your component remains unchanged */}

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
