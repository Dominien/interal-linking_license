import React, { useState, useEffect } from 'react';
import { FiUpload, FiClipboard, FiRefreshCcw, FiPlay, FiBold, FiList, FiDelete } from 'react-icons/fi';

const InternalLinkingTool = () => {
  const [url, setUrl] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [inputHtml, setInputHtml] = useState('');
  const [excludeUrl, setExcludeUrl] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [error, setError] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'];

  const sanitizeHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;

    const sanitizeNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return;
      }
      if (!allowedTags.includes(node.nodeName.toLowerCase())) {
        node.remove();
        return;
      }
      // Remove classes from elements
      node.removeAttribute('class');
      node.childNodes.forEach(sanitizeNode);
    };

    div.childNodes.forEach(sanitizeNode);
    return div.innerHTML;
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

    const sanitizedHtml = sanitizeHtml(inputHtml);
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

  const handleToolbarAction = (action) => {
    if (!selectedElement) return;

    switch (action) {
      case 'bold':
        document.execCommand('bold');
        break;
      case 'h1':
        document.execCommand('formatBlock', false, 'h1');
        break;
      case 'h2':
        document.execCommand('formatBlock', false, 'h2');
        break;
      case 'h3':
        document.execCommand('formatBlock', false, 'h3');
        break;
      case 'ul':
        document.execCommand('insertUnorderedList');
        break;
      case 'ol':
        document.execCommand('insertOrderedList');
        break;
      case 'remove':
        if (selectedElement) {
          selectedElement.remove();
        }
        setSelectedElement(null);
        setShowToolbar(false);
        break;
      default:
        break;
    }
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.startContainer.parentElement;
      if (parentElement && allowedTags.includes(parentElement.tagName.toLowerCase())) {
        setSelectedElement(parentElement);
        setShowToolbar(true);
      } else {
        setShowToolbar(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <div>
      <div>
        {/* URL Input and Keyword Generation */}
        <div>
          <h2>URL Input and Keyword Generation</h2>
          <p>Use the tool to generate keywords automatically or upload your own CSV file with keywords and URLs.</p>
          <div>
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={handleGenerateKeywords}
            >
              <FiPlay />
              Generate Keywords
            </button>
          </div>
        </div>

        {/* Keyword URL Linker */}
        <div>
          <h2>Keyword URL Linker</h2>
          <div>
            <label>Upload CSV File:</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
            />
            <label>Exclude URL:</label>
            <input
              type="text"
              placeholder="Enter URL to Exclude"
              value={excludeUrl}
              onChange={(e) => setExcludeUrl(e.target.value)}
            />
            <label>Input Text:</label>
            <div
              contentEditable="true"
              onInput={handleTextChange}
              dangerouslySetInnerHTML={{ __html: inputHtml }}
            />
            {showToolbar && (
              <div>
                <button onClick={() => handleToolbarAction('bold')}>
                  <FiBold />
                </button>
                <button onClick={() => handleToolbarAction('h1')}>H1</button>
                <button onClick={() => handleToolbarAction('h2')}>H2</button>
                <button onClick={() => handleToolbarAction('h3')}>H3</button>
                <button onClick={() => handleToolbarAction('ul')}>
                  <FiList />
                </button>
                <button onClick={() => handleToolbarAction('ol')}>
                  <FiList />
                </button>
                <button onClick={() => handleToolbarAction('remove')}>
                  <FiDelete />
                </button>
              </div>
            )}
            <div>
              <button onClick={handleProcessText}>
                <FiPlay />
                Process
              </button>
              <button onClick={clearText}>
                <FiRefreshCcw />
                Clear
              </button>
              <button onClick={copyToClipboard}>
                <FiClipboard />
                Copy
              </button>
            </div>
            <label>Output Text with Hyperlinks:</label>
            <div
              contentEditable="true"
              dangerouslySetInnerHTML={{ __html: outputHtml }}
            />
            {error && (
              <div>
                <div>
                  <svg
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
                  <span>Error</span>
                </div>
                <div>
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
