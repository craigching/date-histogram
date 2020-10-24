import dateHistogram from './date-histogram.js';

const main = async () => {
    const container = d3.select('#container');
    const response = await d3.json('data/buckets.json');

    console.log('main: container', container);

    const data = response.buckets.map(d => {
        return {
            date: new Date(d.key),
            count: d.doc_count
        };
    });

    const props = {
        container: container.nodes()[0],
        data: data,
        width: 800,
        height: 600
    }

    dateHistogram(props);
};

main()