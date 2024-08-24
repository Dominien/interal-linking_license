import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Alert, AlertIcon, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  // Initialize productKey state with the value from localStorage, if it exists
  const [productKey, setProductKey] = useState(localStorage.getItem('productKey') || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Save productKey to localStorage
      localStorage.setItem('productKey', productKey);

      // Correct API endpoint with the /api/validate-key path
      const response = await fetch('https://backend-internal-linking.onrender.com/api/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        onLogin();
        navigate('/internal-linking-tool'); // Navigate to the internal linking tool page
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid product key. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bg="gray.100">
      <Box width="full" maxW="md" p={4} bg="white" borderRadius="md" boxShadow="md">
        <Heading as="h2" size="lg" textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
            placeholder="Enter product key"
            required
            mb={4}
          />
          <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Login;
