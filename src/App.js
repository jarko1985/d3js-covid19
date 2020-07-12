import React, { useState } from 'react';
import BarChart from './components/BarChart';
import useInterval from './components/useInterval';
import mapData from './GeojsonData.geo.json';
import './App.css';
import LineChart from './components/LineChart';
import MapChart from './components/MapChart';

//function to generate random Number
const getRandomIndex = (array) => {
  return Math.floor(array.length * Math.random());
};

function App() {
  //Bar Chart
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  //Map Chart
  const [property, setProperty] = useState('confirmed');
  //Random Data for Bar Chart
  const [data, setData] = useState([
    { id: 1, name: 'usa', confirmed: 3000, color: '#FFBA08' },
    { id: 2, name: 'uk', confirmed: 4000, color: '#FAA307' },
    { id: 3, name: 'india', confirmed: 6000, color: '#F48C06' },
    { id: 3, name: 'Brazil', confirmed: 8000, color: '#E85D04' },
    { id: 3, name: 'China', confirmed: 4500, color: '#DC2F02' },
    { id: 3, name: 'France', confirmed: 3300, color: '#D00000' },
    { id: 3, name: 'Italy', confirmed: 3500, color: '#9D0208' },
    { id: 3, name: 'Spain', confirmed: 4500, color: '#6A040F' },
    { id: 3, name: 'Canada', confirmed: 3300, color: '#FFBA08' },
  ]);

  //inerval of 1 sec
  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      setData(
        data.map((val, index) =>
          index === randomIndex
            ? {
                ...val,
                confirmed: val.confirmed + 2000,
              }
            : val
        )
      );
      setIteration(iteration + 1);
    }
  }, 1000);
  return (
    <div className='wrapper'>
      <div className='barChartContainer'>
        <h3>Covid19 Automated Bar-Chart</h3>
        <BarChart data={data} />
        <button
          className='my-btn'
          onClick={() => setStart(!start)}
          style={{ margin: '10px' }}
        >
          {start ? 'Stop Automation' : 'Start Automation!'}
        </button>
      </div>
      <div className='lineChartContainer'>
        <h3>Covid19 No of Cases Line Chart</h3>
        <LineChart data={data} />
      </div>
      <div className='mapChartContainer'>
        <h3>Covid19 Map Chart</h3>
        <MapChart data={mapData} property={property} />
        <div className='select'>
          <select
            value={property}
            onChange={(event) => setProperty(event.target.value)}
          >
            <option value='confirmed'>confirmed cases</option>
            <option value='death'>Death Cases</option>
            <option value='recovered'>recovered cases</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
