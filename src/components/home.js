import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import baseData from '../data/baseData.json'
import Day from "./day"

export default function Home() {
  const [data, setData] = React.useState(baseData);  

  return (
    <div className="root">
      {data.map((day, i) => {
        return (
          <Day key={"day-"+i} dayId={i} dayLabel={day.dayLabel} recipes={{breakfast:day.breakfast, lunch:day.lunch, diner:day.diner}}/>
        );
      })}
      <br/>
      <br/>
      <br/>
    </div>
  );
}
