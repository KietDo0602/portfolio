import React, {useState, useEffect, forwardRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



function TableFooter(props, ref) {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
      // console.clear()
      let lat = 43.452969;
      let long = -80.495064;
      let weatherKey = "664a91cb6cfa99fe9ef2629aead79856";
      const fetchWeather = async () => {
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherKey}`)
        setWeather(data.data)
      }
      fetchWeather();
    }, []);
    return (
      <div className="footer" ref={ref}>
        <div className="row">
          <a href="mailto:career@kietdo.io"><FontAwesomeIcon className="socialIcon" icon={faEnvelope}/></a>
          <a href="https://www.linkedin.com/in/kietdo/"><FontAwesomeIcon className="socialIcon" icon={faLinkedin}/></a>
          <a href="https://github.com/kietdo0602"><FontAwesomeIcon className="socialIcon" icon={faGithub}/></a>
        </div>

        <div className="row">
          <ul>
            {weather ? <li>{`${Math.floor(weather.main.temp - 273.15)}°C ${weather.weather[0].main}, Waterloo, Ontario`}</li> : null}
            <li><a href="mailto:career@kietdo.io">Contact Me</a></li>
            <li><a href="/">My Projects</a></li>
          </ul>
        </div>

        <div className="row">
          Kiet Do Copyright © 2022 - All rights reserved
        </div>
    </div>
    )
}

export default forwardRef(TableFooter);
