import dateHistogram from './date-histogram.js';

const main = async () => {
    const container = d3.select('#container');
    const response = await d3.json('data/buckets.json');

    const data = response.buckets.map(d => {
        return {
            date: new Date(d.key),
            count: d.doc_count
        };
    });

    dateHistogram(container, data, 800, 600);
};

main()