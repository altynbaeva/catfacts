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
    public myFact: string = ""
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
            entityFact.myFact = resp.fact;
            return entityFact;
        });
    }

    public getListFacts(): Promise<Fact[]> {
        let url = `${this.baseUrl}/facts`;
        return fetch(url).then(function(response: Response) {
            return response.json();
        }).then(function(json: any) {
            const resp = new RespClassListFacts(json);
            const facts: Fact[] = [];
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
a.getRandomFact().then(function(response) {
    console.log(response);
});
a.getListFacts().then(function(response) {
    console.log(response);
});

