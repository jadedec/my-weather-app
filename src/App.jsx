import { useEffect, useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  // const [lat, setLat] = useState([]);
  // const [lon, setLon] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // const getLocation = async () => {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     setLat(position.coords.latitude);
  //     setLon(position.coords.longitude);
  //   });
  //   await fetchData();
  // }

  const handleOnSearchChange = (searchData) => {
    const [lat,lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      //units=metrics
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err)=>console.log(err));
  };

  // const fetchData = () => {
  //   const currentWeatherFetch = fetch(
  //     //units=metrics
  //     `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  //   );
  //   const forecastFetch = fetch(
  //     `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  //   );

  //   Promise.all([currentWeatherFetch, forecastFetch])
  //     .then(async (response) => {
  //       const weatherResponse = await response[0].json();
  //       const forecastResponse = await response[1].json();

  //       setCurrentWeather({weatherResponse });
  //       setForecast({forecastResponse });

        
  //     })
  //     .catch((err)=>console.log(err));
  // }

  // useEffect(() => {
  //   getLocation();
  // }, );
  
  console.log(currentWeather);
  console.log(forecast);
  
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {/* make sure it exits */}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}

    </div>
  );
}

export default App;
