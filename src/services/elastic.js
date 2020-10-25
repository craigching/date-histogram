
const logs = (after, before, interval) => {
    const formatTime = d3.timeFormat('%Y-%m-%dT%H:%M:%S.%L%Z');
    const afterStr = formatTime(after);
    const beforeStr = formatTime(before);
    const request = {
        "aggs": {
          "2": {
            "date_histogram": {
              "field": "timestamp",
              "fixed_interval": interval,
              "time_zone": "America/Chicago",
              "min_doc_count": 0
            }
          }
        },
        "query": {
          "bool": {
            "must": [],
            "filter": [
              {
                "match_all": {}
              },
              {
                "range": {
                  "timestamp": {
                    "gte": afterStr,
                    "lte": beforeStr,
                    "format": "strict_date_optional_time"
                  }
                }
              }
            ],
            "should": [],
            "must_not": []
          }
        }
      };
    return axios.post('/elastic/kibana_sample_data_logs/_search?size=0', request);
}

export default logs;