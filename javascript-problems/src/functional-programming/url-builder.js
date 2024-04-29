function urlBuilder(protocol) {
    return function (subdomain) {
        return function (domain) {
            return function (...paths) {
                return function (params = {}) {
                    const queryParams = Object.keys(params).reduce((query, curr, index) => query + `${index === 0 ? '' : '&'}${curr}=${params[curr]}`, '');
                    let url = `${protocol}://${subdomain}.${domain}`;
                    if (paths.length) {
                        url += `/${paths.join('/')}`;
                    }
                    if (queryParams) {
                        url += `?${queryParams}`
                    }
                    return url;
                }
            }
        }
    }
}

const http = urlBuilder('http');
const https = urlBuilder('https');

const www = https('www');
const google = www('google.com');

const path1 = google('some', 'path');
const finalUrlWithParams = path1({
    a: 10,
    b: "hello",
})

console.log(finalUrlWithParams);