import React, { useEffect, useState } from 'react';
import './App.css'; 

function TrainDetails() {
  const [trainData, setTrainData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredTrains, setFilteredTrains] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://20.244.56.144/train/trains';
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIyMDA3MzMsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMTMwMDNkZWEtYWU5MC00NjM0LTk2MTEtYjYxM2ZkYmVhMjEwIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlNFMjBVQ1NFMDk5In0.CVVvODo6ZUa6sgO-kr7XlUq4STAl2F2t9MdZTAWJC1s'
    
    
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (Array.isArray(data)){
      const sortedTrainDetails = data.slice().sort((a, b) => {

        
        const aSleeperSeats = a.seatsAvailable.sleeper+a.seatsAvailable.AC;
        const bSleeperSeats = b.seatsAvailable.sleeper+b.seatsAvailable.AC;

        if (bSleeperSeats !== aSleeperSeats) {
          return bSleeperSeats - aSleeperSeats;
        }
         
        
        
        const aSleeperPrice = a.price.sleeper;
        const bSleeperPrice = b.price.sleeper;
        
        if (aSleeperPrice !== bSleeperPrice) {
          return aSleeperPrice - bSleeperPrice;
        }
 
        
        return new Date(b.departureTime) - new Date(a.departureTime);
      });
        setTrainData(sortedTrainDetails);
      } else {
        console.error('Invalid API response structure:', data);
      }
    })
    .catch(error => console.error('Error fetching train details:', error));
  }, []);

  useEffect(() => {
    const filtered = trainData.filter(train =>
      train.trainNumber.includes(searchInput)
    );
    setFilteredTrains(filtered);
  }, [searchInput, trainData]);

  return (
    <div className="train-details-container">
      <h1 className='title'>Mohan Kumar Chennupati</h1>
      <h1 className="title">Train Details</h1>
      <label htmlFor="trainNumber">Enter Train Number:-</label>
      <input
        type="text"
        id="trainNumber"
        placeholder="Search by Train Number"
        value={searchInput}
        onChange={event => setSearchInput(event.target.value)}
        className="search-input"
      />


      <ul className="train-list">
        {filteredTrains.map((train, index) => (
          <li key={index} className="train-item">
            <p><strong>Train Name:</strong> {train.trainName}</p>
            <p><strong>Train Number:</strong> {train.trainNumber}</p>
            <p><strong>Departure Time:</strong> {train.departureTime.Hours}:{train.departureTime.Minutes}</p>
            <p><strong>Seats Available - Sleeper:</strong> {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
            <p><strong>Price - Sleeper:</strong> {train.price.sleeper}, AC: {train.price.AC}</p>
            <p><strong>Delayed By:</strong> {train.delayedBy}</p>
            <hr className="divider" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainDetails;