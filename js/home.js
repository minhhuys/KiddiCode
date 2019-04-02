var Home = {

    data: [],
    dataCategory: [],


    init() {
        let searchParams = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 100,
            body: {
                query: {
                    bool: {
                        "must": [
                            {
                                query_string: {
                                    default_field: "merchantId",
                                    query: Configuration.merchantId
                                }
                            },
                            {
                                "match": { "type": 32 }
                            },
                            // {
                            //     match: { "languageId": $.cookie('vpass_languageId') }
                            // },
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (error, data) {
            $.each(data.hits.hits, function (index, value) {
                console.log(value._source);
            })
        })
    }

}