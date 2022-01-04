import React from 'react';
import CapitalizeFirstLetter from '../service/CapitalizeFirstLetter';
import './styles/ControlBox.css';
import {ReactComponent as Increase} from '../assets/plus.svg';
import {ReactComponent as Decrease} from '../assets/minus.svg';

export default function ControlBox({index,name, level, min, max, units, trigger}) {

  const payload = async (action) => {
      const xhr = new XMLHttpRequest();
      try {
        xhr.open('GET',`http://127.0.0.1:9090/plc/write?plc_address=127.0.0.1:502&register_number=${index}&current_value=${action()}`,true);
        xhr.send();
      } catch(e) {
        console.log('There was an error handling payload... ' + e);
      }
  }

  const increase = () => level + 1;

  const decrease = () => level - 1;

  const filling = {
    maxHeight: level + '%'
  }

  return (
    <div id="container">
      <div id="header">
        <span>{CapitalizeFirstLetter(name)}</span>
        <span>{level}{' ' + CapitalizeFirstLetter(units)}</span>
      </div>
      <div id="content">
        <div id="figure">
          <div id="figure-bar" style={filling}>

          </div>
        </div>
        <div id="controls">
          <p className="controller first">
            <Increase className="increase" width={'2.5rem'} height={'2.5rem'} fill={'rgba(0,255,0,0.4)'} onClick={() => {
              payload(increase)
              trigger();
            }} />
          </p>
          <p className="controller second">
            <Decrease className="decrease" width={'2.5rem'} height={'2.5rem'} fill={'rgba(150,150,150,0.4)'} onClick={() => {
              payload(decrease);
              trigger();
            }}/>
          </p>
        </div>
      </div>
    </div>
  );
}
