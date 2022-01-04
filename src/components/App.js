import {useState,useEffect} from 'react';
import '../App.css';
import Dashboard from "./Dashboard";
import Wallpaper from '../background.jpg';
import _ from 'lodash';

function App() {

  const [reload, setReload] = useState(false);

  const trigger = () => {
    console.log('triggered a change(button)');
    setReload(!reload);
  }

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

  const [rawMeasures, setRawMeasures] = useState([0,0,0,0,0,0,0,0,0]);
  const [measures, setMeasures] = useState(new Measures(0,0,0,0,0,0,0,0,0));

  const getLevels = async () => {
    try {
      console.log('Getting levels..');
      fetch('http://127.0.0.1:9090/plc/read?plc_address=127.0.0.1:502&start_address=0&read_length=10')
      .then((response) => response.json())
      .then((data) => {
        const extracted = data.bytes.filter((e,i) => i % 2 !== 0 && i < 18);
        if(Array.isArray(extracted) && Array.isArray(rawMeasures) && extracted.length === rawMeasures.length) {
          if(!(extracted.every((val, index) => val === rawMeasures[index]))) { // new values
            console.log('new values!');
            setRawMeasures(extracted);
            setMeasures(new Measures(extracted[0],extracted[1],extracted[2],extracted[3],extracted[4],extracted[5],extracted[6],extracted[7],extracted[8]));
          } else {
            console.log('nothing new...')
          }
        }
      })
    } catch(e) {
      console.log("There's an error: " + e)
    }
  }

  useEffect(() => {
    getLevels();
  },[reload]);

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

  return (
    <>
      <img src={Wallpaper} className="wallpaper" alt="submarine"/>
      <div className="App">
        <Dashboard title={'elements'}
                   fields={[new Measure(0,'Oxygen', measures.oxygen, 0, 100, '%'), new Measure(1,'nitrogen', measures.nitrogen, 0, 50, 'mmol/L'), new Measure(2,'co2', measures.co2, 0, 800, 'ppm')]}
                   trigger={trigger}/>
        <Dashboard title={'inside Factors'}
                   fields={[new Measure(3,'depth', measures.depth, -5000, 5000, 'ft'), new Measure(4,'Temp Inside', measures.tempInside, -100, 500, 'Celsius'), new Measure(5,'speed', measures.speed, 0, 150, 'knots')]} 
                   trigger={trigger}/>
        <Dashboard title={'outside Factors'}
                   fields={[new Measure(6,'pressure', measures.pressure, -50, 100, 'Atmosphere'), new Measure(7,'Temp Outside', measures.tempOutside, -100, 500, 'Celsius'), new Measure(8,'Tilt Angle', measures.tiltAngle, -360, 360, 'Degrees')]} 
                   trigger={trigger}/>
      </div>
    </>

  );
}

export default App;
