"use strict";
class RespClassFact {
    fact;
    constructor(obj) {
        this.fact = obj.fact;
    }
}
class RespClassListFacts {
    data;
    constructor(obj) {
        this.data = obj.data;
    }
}
class Fact {
    myFact = "";
}
class ApiAdapted {
    baseUrl = "https://catfact.ninja";
    getRandomFact() {
        let url = `${this.baseUrl}/fact`;
        return fetch(url).then(function (response) {
            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}`);
            }
            return response.json();
        }).then(function (json) {
            const resp = new RespClassFact(json);
            const entityFact = new Fact();
            entityFact.myFact = resp.fact;
            return entityFact;
        });
    }
    getListFacts() {
        let url = `${this.baseUrl}/facts`;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            const resp = new RespClassListFacts(json);
            const facts = [];
            for (let i = 0; i < resp.data.length; i++) {
                const factEntity = new Fact();
                factEntity.myFact = resp.data[i].fact;
                facts.push(factEntity);
            }
            return facts;
        });
    }
}
let a = new ApiAdapted();
a.getRandomFact().then(function (response) {
    console.log(response);
});
a.getListFacts().then(function (response) {
    console.log(response);
});
//# sourceMappingURL=script.js.map