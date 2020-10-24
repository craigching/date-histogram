
const dateHistogram = (props) => {

    const {
        container,
        data,
        width: svgWidth,
        height: svgHeight
    } = props;

    const margin = { top: 30, right: 10, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const bounds = d3.select(container)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const yAccessor = d => d.count;
    const xAccessor = d => d.date;

    const xScale = d3.scaleBand()
        .domain(data.map(xAccessor))
        .range([0, width])
        .padding(0.05);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([height, 0]);

    const xAxisGroup = bounds.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    const yAxisGroup = bounds.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yScale)
            .tickFormat(d => d));

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