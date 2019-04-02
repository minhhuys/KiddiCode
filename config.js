Configuration.apiUrl = 'https://api.foodtalk.vn';
Configuration.merchantId = 'e134eadd-140c-4192-b70d-59e775926de2';
Configuration.imageRoot = 'https://static.foodizzi.com';
Configuration.hostElasticSearch = 'es.foodizzi.com';
Configuration.userElasticSearch = 'amara';
Configuration.passwordElasticSearch = 'dSPKMcdQkG5X97b';
Configuration.protocolElasticSearch = 'https';
Configuration.portElasticSearch = '443';


Configuration.email = 'nguyen.minhhuyy96@gmail.com';
Configuration.language_vi = '838aef56-78bb-11e6-b5a6-00155d582814';
Configuration.language_en = 'e3509252-c42d-4ae5-9779-d4805a687a8e';

var client = elasticsearch.Client({
    host:
        [
            {
                host: Configuration.hostElasticSearch,
                auth: Configuration.userElasticSearch + ':' + Configuration.passwordElasticSearch,
                protocol: Configuration.protocolElasticSearch,
                port: Configuration.portElasticSearch
            }
        ]
});