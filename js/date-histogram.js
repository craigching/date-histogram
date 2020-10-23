
const dateHistogram = (el, data, width, height) => {

    console.log(data);

    const yAccessor = d => d.count;
    const xAccessor = d => d.date;

    let dimensions = {
        width: width, height: height, margin: {
            top: 30,
            right: 10,
            bottom: 50,
            left: 50,
        }
    };

    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right;

    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom;

    const wrapper = d3.select(container)
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height);

    const bounds = wrapper.append('g')
        .style('transform', `translate(${dimensions.margin.left
            }px, ${dimensions.margin.top
            }px)`);

    const xScale = d3.scaleBand()
        // .domain(d3.extent(data, xAccessor))
        .domain(data.map(d => d.date))
        .range([0, dimensions.boundedWidth])
        .padding(0.05);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([dimensions.boundedHeight, 0]);

    const xAxisGroup = bounds.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${dimensions.boundedHeight})`);

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
        .attr('height', d => dimensions.boundedHeight - yScale(yAccessor(d)))
        .attr('width', xScale.bandwidth)
        .attr('fill', 'lightseagreen');
};

export default dateHistogram;