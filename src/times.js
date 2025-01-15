import React, { useEffect, useState } from "react";
import axios from "axios";

const Times = () => {
  const [parks, setParks] = useState([]); // Store park data
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(""); // Store any errors

  useEffect(() => {
    const fetchParks = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://queue-times.com/parks/2/queue_times.json"
        );

        setParks(response.data); // Update park data
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchParks();
  }, []);

  if (loading) return <p>Loading...</p>; // Show while loading
  if (error) return <p>{error}</p>; // Show errors

  return (
    <div>
      <h1>Park Wait Times</h1>
      <ul>
        {parks.map((park) => (
          <li key={park.id}>
            <strong>{park.name}</strong> - {park.region}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Times;
