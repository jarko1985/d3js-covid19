import React, { useEffect, useRef } from 'react';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisLeft,
  scaleBand,
} from 'd3';

const LineChart = () => {
  //Dummy Data
  const casesData = [0, 20, 40, 80, 70, 100, 200, 500];

  const svgRef = useRef();
  useEffect(() => {
    //Months Array
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
    ];
    const mySvg = select(svgRef.current);
    // X Axis Settings
    const xScale1 = scaleBand().domain(months).range([0, 500]);
    const xScale = scaleLinear()
      .domain([0, casesData.length - 1])
      .range([0, 500]);
    const xAxis = axisBottom(xScale1);
    mySvg.select('.x-axis').call(xAxis).style('transform', 'translateY(500px)');

    // Y Axis Settings
    const yScale = scaleLinear()
      .domain([0, casesData.length - 1])
      .range([500, 0]);

    const yAxis = axisLeft(yScale);
    mySvg.select('.y-axis').call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y((value) => 500 - value)
      .curve(curveCardinal);
    //Drawing Line
    mySvg
      .selectAll('.line')
      .data([casesData])
      .join('path')
      .attr('class', 'line')
      .attr('d', (value) => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3);
  }, [casesData]);
  return (
    <div className='root'>
      <svg ref={svgRef}>
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
    </div>
  );
};

export default LineChart;
