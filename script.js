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
    text = "";
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
            entityFact.text = resp.fact;
            return entityFact;
        });
    }
    getListFacts(limit) {
        let url = `${this.baseUrl}/facts?limit=${limit}`;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            const resp = new RespClassListFacts(json);
            const facts = [];
            for (let i = 0; i < resp.data.length; i++) {
                const factEntity = new Fact();
                factEntity.text = resp.data[i].fact;
                facts.push(factEntity);
            }
            return facts;
        });
    }
}
let api = new ApiAdapted();
window.onload = function () {
    let buttonGetFact = document.getElementById("get-fact");
    if (buttonGetFact) {
        buttonGetFact.onclick = onclickButtonFact;
    }
    let buttonGetList = document.getElementById("get-list-facts");
    if (buttonGetList) {
        buttonGetList.onclick = onclickButtonList;
    }
};
function onclickButtonFact() {
    api.getRandomFact().then(function (fact) {
        renderFact(fact);
    });
}
function onclickButtonList() {
    api.getListFacts(1000).then(function (facts) {
        let map = new Map();
        for (let i = 0; i < 10; i++) {
            let index = Math.floor(Math.random() * 10);
            while (map.has(index)) {
                index = Math.floor(Math.random() * 10);
            }
            map.set(index, true);
        }
        let randomFacts = [];
        for (let key of map.keys()) {
            if (facts[key]) {
                randomFacts.push(facts[key]);
            }
        }
        renderList(randomFacts);
    });
}
function renderFact(fact) {
    let factContainer = document.querySelector(".fact-text");
    if (factContainer) {
        factContainer.textContent = fact.text;
    }
}
function renderList(facts) {
    const ul = document.querySelector(".facts-list");
    if (ul) {
        ul.textContent = "";
    }
    for (let i = 0; i < facts.length; i++) {
        let li = document.createElement("li");
        li.className = "fact-item";
        li.textContent = facts[i]?.text ?? "";
        ul?.appendChild(li);
    }
}
//# sourceMappingURL=script.js.map