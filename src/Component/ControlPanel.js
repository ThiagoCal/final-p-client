import * as React from 'react';

import CITIES from '../data/cities.json';

function ControlPanel(props) {
  return (
    <div className="text-sm">
      <h3>Select the city</h3>
      <p>Smooth animate of the viewport.</p>
      <hr />

      {CITIES.map((city, index) => (
        <div key={`btn-${index}`} className="input">
          <input
            type="radio"
            name="city"
            id={`city-${index}`}
            defaultChecked={city.city === 'Tel Aviv'}
            onClick={() => props.onSelectCity(city)}
          />
          <label htmlFor={`city-${index}`}>{city.city}</label>
        </div>
      ))}
    </div>
  );
}

export default ControlPanel