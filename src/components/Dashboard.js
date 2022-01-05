import React from 'react';
import ControlBox from "./ControlBox";
import '../styles/Dashboard.css';

export default function Dashboard({title, fields, trigger}) {
  return (
    <div className="dashboard-container">
      <span className="dashboard-heading">
        {(title)}
      </span>
      <div className="dashboard-content">
        {
          fields.map((field) => (
            <ControlBox
              key={field.index}
              index={field.index}
              name={field.name}
              level={field.level}
              min={field.min}
              max={field.max}
              units={field.units}
              trigger={trigger}
            />
          ))
        }
      </div>
    </div>
  );
}
