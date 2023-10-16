import React from 'react';
import cloudy from "../../assests/images/cloudy.gif";
import clear_day from "../../assests/images/clear_day.gif";
import default_weather from "../../assests/images/default.gif"
import rain from "../../assests/images/rain.gif"
import snow from "../../assests/images/snow.gif"
import { clear } from 'console';

type WeatherIcon = React.ReactNode;

const WeatherIcons: { [key: string]: WeatherIcon } = {
  Clear: <img src={clear_day} />,
  Smoke: <img src={clear_day} />,
  Rain: <img src={rain}/>,
  Snow: <img src={snow}  />,
  Clouds: <img src={cloudy}/>,
 default_wea: <img src={default_weather} />,
//   Add more weather conditions and corresponding icons as needed
};

export default WeatherIcons;
