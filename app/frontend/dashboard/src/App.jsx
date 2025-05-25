import { useState, useEffect } from 'react';
import '@cloudscape-design/global-styles/index.css';
import { AppLayout, Header, SpaceBetween, Container, TextContent } from '@cloudscape-design/components';

function App() {
  const [backendStatus, setBackendStatus] = useState('Loading...');
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [timestamp, setTimestamp] = useState('N/A');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Using a relative path because both frontend and backend will be on the same Docker network
        // If accessing directly from host browser, use http://localhost:5000/health
        const response = await fetch('/api/health'); // We will set up Nginx to proxy /api to Flask
        const data = await response.json();
        setBackendStatus(data.status);
        setDbStatus(data.database_status);
        setTimestamp(data.timestamp);
      } catch (error) {
        setBackendStatus('Error');
        setDbStatus(`Failed to connect: ${error.message}`);
        setTimestamp(new Date().toISOString());
      }
    };

    // Fetch immediately and then every 5 seconds
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppLayout
      content={
        <Container
          header={
            <Header variant="h2">
              Elbrus Reach Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            <TextContent>
              <h3>Backend Status: <span style={{ color: backendStatus === 'OK' ? 'green' : 'red' }}>{backendStatus}</span></h3>
              <p>Database Connection: <strong>{dbStatus}</strong></p>
              <p>Last Updated: {timestamp}</p>
            </TextContent>
          </SpaceBetween>
        </Container>
      }
      navigationHide
      toolsHide
    />
  );
}

export default App;