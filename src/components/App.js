import {useState} from 'react';
import '../styles/App.css';
import Dashboard from "./Dashboard";
import Wallpaper from '../assets/wallpaper.jpg';

export default function App() {

  const random = (min, max) => (Math.random() * (max - min + 1)) + min;

  class Measure {
    constructor(index,name, level, min, max, units) {
      this.index = index;
      this.name = name;
      this.level = level;
      this.min = min;
      this.max = max;
      this.units = units;
    }
  }

  const [reload, setReload] = useState(true);

  const [measures, setMeasures] = useState(
    [
      new Measure(0, 'Oxygen', random(0, 100), 0, 100, '%'),
      new Measure(1, 'Nitrogen', random(0, 100), 0, 100, 'mmol/L'),
      new Measure(2, 'Co2', random(0, 800), 0, 800, 'ppm'),
      new Measure(3, 'Depth', random(-5000, 5000), -5000, 5000, 'ft'),
      new Measure(4, 'Temp Inside', random(-100, 500), -100, 500, 'celsius'),
      new Measure(5, 'Speed', random(0, 150), 0, 150, 'knots'),
      new Measure(6, 'Pressure', random(-50, 100), -50, 100, 'atmosphere'),
      new Measure(7, 'Temp Outside', random(-100, 500), -100, 500, 'celsius'),
      new Measure(8, 'Tilt Angle', random(-360, 360), -360, 360, 'degrees')
    ]
  );

  const manipulate = (index, level) => {
    measures[index].level = level;
    setMeasures(measures); // object - doesn't NOT reload DOM
    setReload(!reload); // using this to trigger DOM change
  }

  return (
    <div className="App">
      <div className="wallpaper-container">
        <img
          className="wallpaper"
          src={Wallpaper}
          alt="marine-insides"
        />
      </div>
      <div className="main-container">
        <Dashboard
          title={'Elements'}
          fields={measures.slice(0, 3)}
          manipulate={manipulate}
        />
        <Dashboard
          title={'Inside Factors'}
          fields={measures.slice(3, 6)}
          manipulate={manipulate}
        />
        <Dashboard
          title={'Outside Factors'}
          fields={measures.slice(6, 9)}
          manipulate={manipulate}
        />
      </div>
    </div>
  );
}
