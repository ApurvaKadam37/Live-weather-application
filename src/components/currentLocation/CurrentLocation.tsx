import React, { useEffect, useState } from "react";
import { apiKeys } from "../../model/apikeys/apiKeys";
import loader from "../../assests/images/WeatherIcons.gif";
import useCurrentLocation from "../customHook/useLocation";
import Clock from "react-live-clock";
// import Forcast from "./forcast";
import { StateModel } from "../../model/state.model";
// import {usePosition} from './usePosition';
import { json } from "stream/consumers";
import WeatherIcons from "../../utility/weather-icons/WeatherIcon";
import Forcast from "../forcast/Forcast";

type WeatherData = {
  lat: number | undefined;
  lon: number | undefined;
  temperatureC: number | undefined;
  temperatureF: number | undefined;
  city: string | undefined;
  country: string | undefined;
  humidity: number | undefined;
  main: string | undefined;
};

const dateBuilder = (d: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const CurrentLocation = () => {
  const [position, setPosition] = useState<WeatherData>({
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    main: undefined,
  });

  const { latitude, longitude } = useCurrentLocation();

  useEffect(() => {
    fetch(
      `${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeys.key}`
    )
      .then((res) => res.json())
      .then((data) =>
        setPosition({
          lat: latitude,
          lon: longitude,
          city: data.name,
          temperatureC: Math.round(data.main.temp),
          temperatureF: Math.round(data.main.temp * 1.8 + 32),
          humidity: data.main.humidity,
          main: data.weather[0].main,
          country: data.sys.country,
        })
      )
      .catch((err) => console.log(err));
  }, [latitude, longitude]);

  console.log("position =", JSON.stringify(position));
  console.log("ctemp =", latitude);
  if (latitude !== 0 && longitude !== 0) {
    return (
      <>
        <div className="container">
          <div className="city">
            <div className="title">
              <h2>{position?.city}</h2>
              <h3>{position?.country}</h3>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {position?.temperatureC}°<span>C</span>
                </p>
                {/* <span className="slash">/</span>
         {position?.temperatureF} &deg;F */}
              </div>
            </div>
          </div>
          <div className="weather-detail">
            {/* <div className="mb-icon">
              {WeatherIcons[position?.main || ""]}{" "}
            </div> */}
            <Forcast icon={position?.main} weather={position?.main} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <img src={loader} style={{ width: "50%" }} />
        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
          Detecting your location
        </h3>
        <h3 style={{ color: "white", marginTop: "10px" }}>
          Your current location wil be displayed on the App <br></br> & used for
          calculating Real time weather.
        </h3>
      </>
    );
  }
};

export default CurrentLocation;
