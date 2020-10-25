
const dateHistogram = (props) => {

    const {
        container,
        width: svgWidth,
        height: svgHeight,
        data,
        xAccessor = d => d.date,
        yAccessor = d => d.count,
        barColor = 'lightseagreen'
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

    const xBarScale = d3.scaleBand()
        .domain(data.map(xAccessor))
        .range([0, width])
        .padding(0.05);

    const xTicksScale = d3.scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([height, 0]);

    const xAxisGroup = bounds.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xTicksScale)
                .ticks(d3.timeMinute.every(60))
                .tickPadding(0.05));

    const yAxisGroup = bounds.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yScale)
            .tickFormat(d => d));

    bounds.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('y', d => yScale(yAccessor(d)))
        .attr('x', d => xTicksScale(xAccessor(d)))
        .attr('height', d => height - yScale(yAccessor(d)))
        .attr('width', xBarScale.bandwidth())
        .attr('fill', barColor);
};

export default dateHistogram;