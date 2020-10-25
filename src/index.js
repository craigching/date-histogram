import dateHistogram from './components/date-histogram/date-histogram.js';
import logs from './services/elastic.js';

const main = async () => {
    const container = d3.select('#container');

    // const response = await d3.json('../data/buckets.json');
    // const data = response.buckets;

    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L%Z');
    const afterStr = '2020-10-23T00:00:00.000-05:00';
    const beforeStr = '2020-10-24T00:00:00.000-05:00';
    const after = parseTime(afterStr);
    const before = parseTime(beforeStr);
    const response = await logs(after, before);
    const data = response.data.aggregations['2'].buckets;

    console.log('data', data);

    const xAccessor = d => new Date(d.key);
    const yAccessor = d => d.doc_count;

    const props = {
        container: container.nodes()[0],
        width: 1200,
        height: 200,
        data: data,
        xAccessor: xAccessor,
        yAccessor: yAccessor
    }

    dateHistogram(props);
};

main()