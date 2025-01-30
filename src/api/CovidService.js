
import { useEffect, useState } from "react";
import React from "react";
import axios from 'axios';
import DateFilter from "./DateFilter";

const CovidService = () => {
  const [countries, setCountries] = useState([]); // State to store country list
  const [selectedCountry, setSelectedCountry] = useState("United States"); // State for selected country
  const [responseCases, setResponseCases] = useState({});
  


  // Default end date (YYYY-MM-DD)

  // Fetch country data when the component mounts
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []); // Empty dependency array means this runs once after mount

  // Fetch COVID data based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const fetchCovidData = async () => {
        try {
          const url = `https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=1500`;
          const response = await axios.get(url);
          console.log("COVID Data for", selectedCountry, response.data);
          setResponseCases(response.data.timeline);

        } catch (error) {
          console.error("Error fetching COVID data:", error);
        }
      };

      fetchCovidData();
    }
  }, [selectedCountry]); // Runs whenever selectedCountry change




  


  // Handle country selection
  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };


  return (
    <>
      <div className="main-containt">
      <div className="app-head">
        <h1>COVID-19 and population dashboard</h1>
      </div>
     
        <div className="input-containt">
          <select value={selectedCountry} onChange={handleChange} className="input-bar">
            <option value="">--Select a Country--</option>
            {countries.map((country) => (
              <option key={country.cca3} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        
        
        <div className="date-filter">
          <DateFilter data={responseCases}></DateFilter>
        </div>
      </div>
      
    </>
  );
};

export default CovidService;



