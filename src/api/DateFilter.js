import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';

const DateFilter = ({ data }) => {
    const [startDate, setStartDate] = useState("2021-01-01"); 
    const [endDate, setEndDate] = useState("2021-01-5");

    // Handle start date change
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value); // Update the start date
    };

    // Handle end date change
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value); // Update the end date
    };

    // Safe check if the data is loaded
    if (!data || !data.cases || !data.deaths || !data.recovered) {
        return <div>Loading data...</div>; // Show a loading message until the data is available
    }

    // Convert API dates in YYYY-MM-DD
    const stringToDate = (dateString) => {
        const [month, day, year] = dateString.split('/');
        const fullYear = `20${year}`; // Add "20" to the 2-digit year to make it a 4-digit year
        const date = new Date(`${fullYear}-${month}-${day}`); // Convert to a date object in YYYY-MM-DD format

        // Reset the time to midnight to ensure we're comparing only the date
        date.setHours(0, 0, 0, 0);
        return date;
    };

    // Convert the user's input date in "YYYY-MM-DD" format to Date object
    const inputToDate = (inputDateString) => {
        const date = new Date(inputDateString); // Converts input to Date object
        date.setHours(0, 0, 0, 0); // Reset the time to midnight
        return date;
    };

    // Sum function for sumation of total cases/deaths/recovery
    const sumCovidDataInRange = (startDate, endDate, data) => {
        let sum = 0;

        // Convert the user input start and end dates to Date objects
        const start = inputToDate(startDate);
        const end = inputToDate(endDate);

        // Loop through each date in the data
        for (const date in data) {
            const currentDate = stringToDate(date); // Convert the API date to a Date object

            // Check if current date is within the range
            if (currentDate >= start && currentDate <= end) {
                sum = sum + Math.abs(sum - data[date]);

            }
        }

        return sum;
    };
    

    const cases = sumCovidDataInRange(startDate, endDate, data.cases);
    const deaths = sumCovidDataInRange(startDate, endDate, data.deaths);
    const recoverd = sumCovidDataInRange(startDate, endDate, data.recovered);

    // Create arrays for the cases, deaths, and recovered for the given date range
    
    const casesArray = Object.keys(data.cases)
        .filter(date => new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate))
        .map(date => data.cases[date]);
   
        const deathsArray = Object.keys(data.deaths)
        .filter(date => new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate))
        .map(date => data.deaths[date]);
    
        const recoveredArray = Object.keys(data.recovered)
        .filter(date => new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate))
        .map(date => data.recovered[date]);

        //convert to million
        function convertToMillions(number) {
            return (number / 1000000).toFixed(2);  // Dividing by 1 million and rounding to 2 decimal places
          }

          let total_cases = convertToMillions(cases);
          let total_deaths = convertToMillions(deaths);
          let total_recoverd = convertToMillions(recoverd);

    return (
        <div>

            <div className='date-range'>
                <h2>Filter by date range</h2>
                   <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                

                
                    
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                
            </div>

            <div className='main-pop'>
                {/* <h2>COVID Data Sum from {startDate} to {endDate}</h2> */}
                <div className='population'>
                    <div className='cases'><p>Cases</p></div>
                    <div className='numbers'><p>{total_cases}M</p></div>
                </div>
                <div className='population'>
                    <div className='recovered'><p>Recoveries</p></div>
                    <div className='numbers'><p>{total_recoverd}M</p></div>
                </div>
                <div className='population'>
                    <div className='deaths'><p>Deaths</p></div>
                    <div className='numbers'><p>{total_deaths}M</p></div>
                </div>
                
            </div>

            <div className='charts'>
            <div className='line-chart'><LineChart 
                cases={casesArray} 
                deaths={deathsArray} 
                recovered={recoveredArray} 
                startdate={startDate} 
                endate={endDate}
            /></div>
            <div className='pie-chart'><PieChart cases={cases} deaths={deaths} recovered={recoverd} /></div>
          

            </div>
        </div>
    );
};

export default DateFilter;
