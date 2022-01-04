import React from 'react';
import ControlBox from "./ControlBox";
import CapitalizeFirstLetter from '../service/CapitalizeFirstLetter';

export default function Dashboard({title, fields, trigger}) { // fields -> array of 3 Measure class{name, level}

  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  }

  return (
    <div style={styles}>
      <div style={{
        fontSize: '2vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>{CapitalizeFirstLetter(title)}</div>
      <div style={{display: 'flex', flexDirection: 'column', flex: 9}}>
        {
          fields.map((field) => <ControlBox index={field.index} name={field.name} level={field.level} min={field.min} max={field.max}
                                            units={field.units} trigger={trigger}/>)
        }
      </div>
    </div>
  );
}
