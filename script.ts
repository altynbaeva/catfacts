class RespClassFact {
    public fact: string

    constructor(obj: any) {
        this.fact = obj.fact;
    }
}

class RespClassListFacts {
    public data: any[]

    constructor(obj: any) {
        this.data = obj.data
    }
}

class Fact {
    public text: string = ""
}
 
class ApiAdapted {
    private baseUrl = "https://catfact.ninja";
    
    public getRandomFact(): Promise<Fact> {
        let url = `${this.baseUrl}/fact`;
        return fetch(url).then(function(response: Response) {
            if(!response.ok) {
                throw new Error(`Ошибка ${response.status}`);
            }
            return response.json();
        }).then(function(json: any) {
            const resp = new RespClassFact(json);
            const entityFact = new Fact();
            entityFact.text = resp.fact;
            return entityFact;
        });
    }

    public getListFacts(limit: number): Promise<Fact[]> {
        let url = `${this.baseUrl}/facts?limit=${limit}`;
        return fetch(url).then(function(response: Response) {
            return response.json();
        }).then(function(json: any) {
            const resp = new RespClassListFacts(json);
            const facts: Fact[] = [];
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
        buttonGetFact.onclick = onclickButtonFact
    }

    let buttonGetList = document.getElementById("get-list-facts");
    if (buttonGetList) {
        buttonGetList.onclick = onclickButtonList
    }
}

function onclickButtonFact() {
    api.getRandomFact().then(function(fact: Fact) {
        renderFact(fact);
    });
}

function onclickButtonList() {
    api.getListFacts(1000).then(function(facts: Fact[]) {
        let map = new Map<number, boolean>();
        for (let i = 0; i < 10; i++) {
            let index = Math.floor(Math.random() * 10);

            while(map.has(index)) {
                index = Math.floor(Math.random() * 10);
            }
            map.set(index, true);
        }
        let randomFacts: Fact[] = [];
        for (let key of map.keys()) {
            if (facts[key]) {
            randomFacts.push(facts[key]);
            }
        }
        renderList(randomFacts);
    });
}

function renderFact(fact: Fact) {
    let factContainer = document.querySelector(".fact-text");
    if (factContainer) {
        factContainer.textContent = fact.text;
    }
}

function renderList(facts: Fact[]) {
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