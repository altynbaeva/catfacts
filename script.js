"use strict";
class ApiAdapted {
    baseUrl = "https://catfact.ninja";
    getRandomFact() {
        let url = `${this.baseUrl}/fact`;
        return fetch(url).then(function (resp) {
            if (!resp.ok) {
                throw new Error(`Ошибка ${resp.status}`);
            }
            return resp.json();
        });
    }
    getListFacts() {
        let url = `${this.baseUrl}/facts`;
        return fetch(url).then(function (resp) {
            return resp.json();
        });
    }
}
let a = new ApiAdapted();
a.getRandomFact().then(function (res) {
    console.log(res);
});
a.getListFacts().then(function (res) {
    console.log(res.data);
});
//# sourceMappingURL=script.js.map