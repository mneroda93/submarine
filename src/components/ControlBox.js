import React from 'react';
import '../styles/ControlBox.css';
import {ReactComponent as Increase} from '../assets/plus.svg';
import {ReactComponent as Decrease} from '../assets/minus.svg';

export default function ControlBox(
  {
    index,
    name,
    level,
    min,
    max,
    units,
    manipulate
  }
) {

  const filledHeight = level < min ? '0%' : ((level - min) * 100) / (max - min) + '%';

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
            <div className="figure-bar" style={{maxHeight: filledHeight}}>
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
                        manipulate(index, level + (Math.abs(max) + Math.abs(min)) * 0.1);
                      }}
            />
          </div>
          <div id="decrease">
            <Decrease className="decrease"
                      width={'2.5rem'}
                      height={'2.5rem'}
                      fill={'rgba(40,124,6,0.5)'}
                      onClick={() => {
                        manipulate(index, level - (Math.abs(max) + Math.abs(min)) * 0.1);
                      }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
