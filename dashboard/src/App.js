import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null); // Initialize as null since the API returns an object

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://azjqkrca9k.execute-api.us-east-1.amazonaws.com/prod/getSalesMetrics');
        console.log(response.data);
        setData(response.data); // Set the object directly
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Dependency array ensures this runs only once

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Sales Metrics</h1>
          {data ? ( // Check if data is not null
            <ul>
              <li>
                <strong>Total Sales:</strong> {data.total_sales} <br />
                <strong>Total Revenue:</strong> {data.total_revenue}
              </li>
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;