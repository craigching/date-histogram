
const dateHistogram = (props) => {

    const {
        container,
        data,
        width: svgWidth,
        height: svgHeight
    } = props;

    console.log(data);

    const margin = {top: 30, right: 10, bottom: 50, left: 50};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const yAccessor = d => d.count;
    const xAccessor = d => d.date;

    const wrapper = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const bounds = wrapper.append('g')
        .style('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, width])
        .padding(0.05);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([height, 0]);

    const xAxisGroup = bounds.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`);

    const yAxisGroup = bounds.append('g')
        .attr('class', 'y axis');

    const xAxisCall = d3.axisBottom(xScale);
    xAxisGroup.call(xAxisCall);

    const yAxisCall = d3.axisLeft(yScale)
        .tickFormat(d => d);
    yAxisGroup.call(yAxisCall);

    bounds.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('y', d => yScale(yAccessor(d)))
        .attr('x', d => xScale(xAccessor(d)))
        .attr('height', d => height - yScale(yAccessor(d)))
        .attr('width', xScale.bandwidth)
        .attr('fill', 'lightseagreen');
};

export default dateHistogram;