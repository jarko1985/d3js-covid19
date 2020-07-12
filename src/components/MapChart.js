import React, { useRef, useEffect, useState } from 'react';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';

const MapChart = ({ data, property }) => {
  const svgRef = useRef();

  //Select hook
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const minProp = min(
      data.features,
      (feature) => feature.properties[property]
    );
    const maxProp = max(
      data.features,
      (feature) => feature.properties[property]
    );
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(['green', 'red']);

    const projection = geoMercator()
      .fitSize([500, 500], selectedCountry || data)
      .precision(100);
    const pathGenerator = geoPath().projection(projection);
    //Drawing Map
    svg
      .selectAll('.country')
      .data(data.features)
      .join('path')
      .on('click', (feature) => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr('class', 'country')
      .transition()
      .attr('fill', (feature) => colorScale(feature.properties[property]))
      .attr('d', (feature) => pathGenerator(feature));
  }, [data, property, selectedCountry]);

  return (
    <div className='root'>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default MapChart;
