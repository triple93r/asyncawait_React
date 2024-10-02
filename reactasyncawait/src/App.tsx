import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from ipinfo.io API using async/await
    const fetchData = async () => {
      try {
        const response = await fetch('https://ipinfo.io/161.185.160.93/geo'); // API request

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Check the response in the console
        setData(data);     // Set the fetched data
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading in both success and error cases
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>IP Info</h1>
      <p><strong>IP:</strong> {data?.ip}</p>
      <p><strong>City:</strong> {data?.city}</p>
      <p><strong>Region:</strong> {data?.region}</p>
      <p><strong>Country:</strong> {data?.country}</p>
    </div>
  );
};

export default App;
