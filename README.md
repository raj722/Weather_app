## Documentation
This project is a weather application built using React.js with Vite as the build tool. The app fetches real-time weather data using the OpenWeather API. Users can search for any city's weather and view its current weather conditions and forecast details.

## Features
1. Search weather by city name.
2. Display current weather details:
   <br/>
   a. Temperature <br/>
   b. Weather conditions<br/>
   c. Humidity<br/>
   d. Wind speed<br/>
4. Handles loading states and errors gracefully.

## Technology satck
    React
    Vite
    OpenWeather API
    CSS
## File Strusrure
    .
    ├── public          # Static files
    ├── src
    │   ├── App.jsx     # Main React component
    │   ├── index.css   # Styling
    │   ├── main.jsx    # Entry point
    │   └── components  # Additional components (if any)
    ├── .gitignore      # Git ignore file
    ├── package.json    # Project dependencies and scripts
    └── vite.config.js  # Vite configuration
    
## API Implementation
1. API_KEY is used to make requests to the OpenWeather API endpoints

        const API_KEY = "8e2f448ffaa1cb72c42b03eb03a2eac7";//API key
2. Fetch Weather Data
        
        const fetchWeatherData = async (cityName) => {
          try {
            setLoading(true);
            setError(null);
        
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
            const response = await fetch(currentWeatherUrl);
            const data = await response.json();
            setWeatherData(data);
        
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
        
            const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0);
            setForecast(dailyForecast);
          } catch (error) {
            setError("Sorry, we couldn’t retrieve the weather data at this time");
          } finally {
            setLoading(false);
          }
        };

## Fectching Data
Sending a GET request to the https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

## Output
![weather](https://github.com/user-attachments/assets/40e41e85-069c-45af-8471-48b2ac4ee84f)

## Conclusions
This weather application demonstrates how to integrate a API into a React application while ensuring a smooth user experience through effective state management, loading indicators, and error handling. The use of Vite enhances the development process with its fast build capabilities. 
