
const logs = () => {
    const request = {
        "aggs": {
          "2": {
            "date_histogram": {
              "field": "timestamp",
              "fixed_interval": "30m",
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
                    "gte": "2020-10-23T15:23:16.916Z",
                    "lte": "2020-10-24T15:23:16.917Z",
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