export default function (axios) {
    const self = {};
    const headers = {
        'Content-Type': 'application/json'
    };

    self.request = params => {

        let request = {
            method: params.method,
            url: params.route,
            data: params.body,
            headers,
        }

        return axios(request);
    };

    self.get = (params) => self.request(Object.assign({ method: 'GET' }, params))

    return self;
}
