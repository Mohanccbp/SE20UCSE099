const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; 


const url = 'http://20.244.56.144/train/trains';
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxOTM2MDEsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMTMwMDNkZWEtYWU5MC00NjM0LTk2MTEtYjYxM2ZkYmVhMjEwIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlNFMjBVQ1NFMDk5In0.mDG9GWnBPFffqCJEqcHhPTJNuAl5G0i_KdJ-fH24GFM'
axios.get(url, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
.then(response => {
  
  const TrainDetails=response.data
  
  TrainDetails.forEach(train => {
    console.log(`Train Name: ${train.trainName}`);
    console.log(`Train Number: ${train.trainNumber}`);
    console.log(`Departure Time: ${train.departureTime.Hours}:${train.departureTime.Minutes}`);
    console.log(`Seats Available - Sleeper: ${train.seatsAvailable.sleeper}, AC: ${train.seatsAvailable.AC}`);
    console.log(`Price - Sleeper: ${train.price.sleeper}, AC: ${train.price.AC}`);
    console.log(`Delayed By: ${train.delayedBy}`);
    console.log('--------------------------------');
  });
})
.catch(error => {
  
  console.error('Error fetching train details:', error);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});