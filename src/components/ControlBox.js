import React from 'react';
import '../styles/ControlBox.css';
import {ReactComponent as Increase} from '../assets/plus.svg';
import {ReactComponent as Decrease} from '../assets/minus.svg';

export default function ControlBox({index, name, level, min, max, units, trigger}) {

  const HMI_SERVER_ADDRESS = process.env.REACT_APP_HMI_SERVER;
  const PLC_ADDRESS = process.env.REACT_APP_PLC_SERVER;

  const payload = async (action) => {
    const xhr = new XMLHttpRequest();
    const url = `http://${HMI_SERVER_ADDRESS}/plc/write?plc_address=${PLC_ADDRESS}&register_number=${index}&current_value=${action()}`;
    console.log(url);
    try {
      xhr.open('GET', url, true);
      xhr.send();
    } catch (e) {
      console.log('There was an error handling payload... ' + e);
    }
  }

  const increase = () => level + 1;
  const decrease = () => level - 1;

  return (
    <div className="control-box-container">
      <div className="sections">
        <div className="left-section">
          <span className="field">
            {(name)}
            <span className="units">
              ({units})
            </span>
          </span>
          <div className="figure">
            <div className="figure-bar" style={{maxHeight: ((level - min) * 100) / (max - min) + '%'}}>
            </div>
            <div className="mask">
              <span className="level">
                {level.toFixed(3)}
              </span>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div id="increase">
            <Increase className="increase"
                      width={'2.5rem'}
                      height={'2.5rem'}
                      fill={'rgba(145,18,42,0.5)'}
                      onClick={() => {
                        payload(increase)
                        trigger();
                      }}
            />
          </div>
          <div id="decrease">
            <Decrease className="decrease"
                      width={'2.5rem'}
                      height={'2.5rem'}
                      fill={'rgba(40,124,6,0.5)'}
                      onClick={() => {
                        payload(decrease);
                        trigger();
                      }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}