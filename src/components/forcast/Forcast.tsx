import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { apiKeys } from "../../model/apikeys/apiKeys";
import WeatherIcons from "../../utility/weather-icons/WeatherIcon";

type WeatherDetail = {
  temperatureC: number | undefined;
  temperatureF: number | undefined;
  city: string | undefined;
  country: string | undefined;
  humidity: number | undefined;
  main: string | undefined;
  wind: number | undefined;
  visibility: number | undefined;
};

function Forcast(props: any) {
  const [query, setQuery] = useState("");
  const error = "Not Found";
  const [weather, setWeather] = useState<WeatherDetail>({
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    main: undefined,
    wind: undefined,
    visibility: undefined,
  });

  const search = (city: any) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        console.log("res= ", response);
        setWeather({
          city: response.data.name,
          temperatureC: Math.round(response.data.main.temp),
          temperatureF: Math.round(response.data.main.temp * 1.8 + 32),
          humidity: response.data.main.humidity,
          main: response.data.weather[0].main,
          country: response.data.sys.country,
          wind: response.data.wind.speed,
          visibility: response.data.visibility,
        });
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setQuery("");
      });
  };
  function checkTime(i: any) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }
  // console.log("weather =",weather.city)
  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  if (weather.main !== undefined) {
    console.log("weather =", weather?.city);
    return (
        <>
        <div className="mb-icon">
     {WeatherIcons[weather?.main]} {/* Display the corresponding weather icon */}
     </div>
      <div className="forecast">
        <div className="today-weather">
          <h3>{props.weather}</h3>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search any city"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <div className="img-box">
              {" "}
              <img
                src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                onClick={search}
              />
            </div>
          </div>
          <ul>
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.city}, {weather?.country}
                </p>
                {/* <div className="forecast-icon">
                  {WeatherIcons[weather?.main || ""]}{" "}
                </div> */}
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {weather?.temperatureC}°c ({weather?.main})
                </span>
              </li>
              <li>
                Humidity <span className="temp">{weather?.humidity}%</span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">{weather?.visibility} mi</span>
              </li>
              <li>
                Wind Speed <span className="temp">{weather?.wind} Km/h</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
      </>
    );
  } else {
    return <h3>{error}</h3>;
  }
}
export default Forcast;
