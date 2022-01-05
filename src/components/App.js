import {useState, useEffect} from 'react';
import '../styles/App.css';
import Dashboard from "./Dashboard";
import Wallpaper from '../assets/wallpaper.jpg';

export default function App() {

  class Measures {
    constructor(oxygen, nitrogen, co2, depth, tempInside, speed, pressure, tempOutside, tiltAngle) {
      this.oxygen = oxygen;
      this.nitrogen = nitrogen;
      this.co2 = co2;
      this.depth = depth;
      this.tempInside = tempInside;
      this.speed = speed;
      this.pressure = pressure;
      this.tempOutside = tempOutside;
      this.tiltAngle = tiltAngle;
    }
  }

  class Measure {
    constructor(index, name, level, min, max, units) {
      this.index = index;
      this.name = name;
      this.level = level;
      this.min = min;
      this.max = max;
      this.units = units;
    }
  }

  const [reload, setReload] = useState(false);

  const trigger = () => {
    console.log('triggered a reload..');
    setReload(!reload);
  }

  const [rawMeasures, setRawMeasures] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // 0, 0, 0, 0, 0, 0, 0, 0, 0
  const [measures, setMeasures] = useState(new Measures(15, 25, 100, 1000, 200, 100, 25, 0, 10));

  const getLevels = async () => {
    console.log('Getting levels..');
    fetch('http://127.0.0.1:9090/plc/read?plc_address=127.0.0.1:502&start_address=0&read_length=10')
      .then((response) => response.json())
      .then((data) => {
        const extracted = data.bytes.filter((e, i) => i % 2 !== 0 && i < 18);
        if (Array.isArray(extracted) && Array.isArray(rawMeasures) && extracted.length === rawMeasures.length) {
          if (!(extracted.every((val, index) => val === rawMeasures[index]))) { // new values
            console.log('new values!');
            setRawMeasures(extracted);
            setMeasures(
              new Measures(
                extracted[0],
                extracted[1],
                extracted[2],
                extracted[3],
                extracted[4],
                extracted[5],
                extracted[6],
                extracted[7],
                extracted[8]
              ));
          } else {
            console.log('No new values...')
          }
        }
      })
      .catch((e) => {
        console.log('There was an error loading levels: "' + e + '"');
      })
  }

  useEffect(() => {
    getLevels();
  }, [reload]);

  return (
    <div className="App">
      <div className="wallpaper-container">
        <img className="wallpaper" src={Wallpaper} alt="marine-insides"/>
      </div>
      <div className="main-container">
        <Dashboard title={'Elements'}
                   trigger={trigger}
                   fields=
                     {
                       [
                         new Measure(0, 'Oxygen', measures.oxygen, 0, 100, '%'),
                         new Measure(1, 'Nitrogen', measures.nitrogen, 0, 50, 'mmol/L'),
                         new Measure(2, 'Co2', measures.co2, 0, 800, 'ppm')
                       ]
                     }
        />
        <Dashboard title={'Inside Factors'}
                   trigger={trigger}
                   fields=
                     {
                       [
                         new Measure(3, 'Depth', measures.depth, -5000, 5000, 'ft'),
                         new Measure(4, 'Temp Inside', measures.tempInside, -100, 500, 'celsius'),
                         new Measure(5, 'Speed', measures.speed, 0, 150, 'knots')
                       ]
                     }
        />
        <Dashboard title={'Outside Factors'}
                   trigger={trigger}
                   fields=
                     {
                       [
                         new Measure(6, 'Pressure', measures.pressure, -50, 100, 'atmosphere'),
                         new Measure(7, 'Temp Outside', measures.tempOutside, -100, 500, 'celsius'),
                         new Measure(8, 'Tilt Angle', measures.tiltAngle, -360, 360, 'degrees')
                       ]
                     }
        />
      </div>
    </div>
  );
}
