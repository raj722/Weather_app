import { useEffect, useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");//holds users search input
  const [weatherData, setWeatherData] = useState(null);//stores fetched weather data
  const [city, setCity] = useState("Nepal");//default city
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);//holds error messages

  const API_KEY = "8e2f448ffaa1cb72c42b03eb03a2eac7";//API key

  //state to check whether data is being loaded
  const [loading, setLoading] = useState(false);

  //function to fetch data of weather for given city name
  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      //making API URL for current data
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;

      const response = await fetch(url);
      const data = await response.json();//handling API calls
      setWeatherData(data);

      //forecast data for the city
      const foreCastresponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`
      );

      const forecastdata = await foreCastresponse.json();

      console.log(forecastdata);

      setCity(cityName);//update city name

      const dailyForecast = forecastdata.list.filter(
        (item, index) => index % 8 === 0
      );
      setForecast(dailyForecast);//update forecast state
    } catch (error) {
      setError("Sorry, we couldn’t retrieve the weather data at this time");
      console.log(error);
    } finally {
      setLoading(false);//stop loading state after complete
    }
  };

  //useEffect hook uses to fetch data when the component is loaded
  useEffect(() => {
    fetchWeatherData(city);
  }, []);//array means runs once on loaded

  //function to handle search from submit
  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(searchInput);
  }

  //shows loading... indicator when data is loading(fetched)
  if (loading) return <div className="wrapper">Loading...</div>;

  return (
    <div className="wrapper ">
      {/*search form for city name */}
      <form onSubmit={handleSearch} className="search">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}//update state 
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      {/*display error msg */}
      {error && <p className="error">{error}</p>}

      {/*display weather data */}
      {weatherData && weatherData.main && weatherData.weather && (
        <>
          <div className="header">
            <h1 className="city">{weatherData.name}</h1>
            <p className="temperature">{weatherData.main.temp}°F</p>
            <p className="condition">{weatherData.weather[0].main}</p>
          </div>
          <div className="weather-details">
            <div>
              <p>Humidity</p>
              <p style={{ fontWeight: "bold" }}>
                {Math.round(weatherData.main.humidity)}%
              </p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p style={{ fontWeight: "bold" }}>
                {Math.round(weatherData.wind.speed)} mph
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
