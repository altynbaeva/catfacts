"use strict";
class ApiAdapted {
    baseUrl = "https://catfact.ninja";
    getRandomFact(maxLength) {
        let url = `${this.baseUrl}/fact?max_length=${maxLength}`;
        return fetch(url).then(function (resp) {
            if (!resp.ok) {
                throw new Error(`Ошибка ${resp.status}`);
            }
            return resp.json();
        });
    }
    getListFacts(maxLength, limit) {
        let url = `${this.baseUrl}/facts?max_length=${maxLength}&limit=${limit}`;
        return fetch(url).then(function (resp) {
            return resp.json();
        });
    }
}
let a = new ApiAdapted();
a.getRandomFact(50).then(function (res) {
    console.log(res);
});
a.getListFacts(60, 5).then(function (res) {
    console.log(res.data);
});
//# sourceMappingURL=script.js.map