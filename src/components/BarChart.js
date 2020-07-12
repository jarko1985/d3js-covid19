import React, { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear, max } from 'd3';

function BarChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    // sorting  Data
    data.sort((a, b) => b.confirmed - a.confirmed);

    //Y Axis Settings
    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index))
      .range([0, 500]);

    //X Axis Settings
    const xScale = scaleLinear()
      .domain([0, max(data, (val) => val.confirmed)])
      .range([0, 500]);

    //Drawing Canvas
    svg
      .selectAll('.bar')
      .data(data, (val, index) => val.confirmed)
      .join((enter) =>
        enter.append('rect').attr('y', (val, index) => yScale(index))
      )
      .attr('fill', (val) => val.color)
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .transition()
      .attr('width', (entry) => xScale(entry.confirmed))
      .attr('y', (val, index) => yScale(index));

    // drawing Labels
    svg
      .selectAll('.label')
      .data(data, (val, index) => val.name)
      .join((enter) =>
        enter
          .append('text')
          .attr(
            'y',
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text((entry) => `${entry.name} (${entry.confirmed} Cases)`)
      .attr('class', 'label')
      .attr('x', 10)

      .transition()
      .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data]);

  return (
    <div className='root'>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default BarChart;
