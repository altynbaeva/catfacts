class ApiAdapted {
    private baseUrl = "https://catfact.ninja";
    
    public getRandomFact() {
        let url = `${this.baseUrl}/fact`;
        return fetch(url).then(function(resp: Response) {
            if(!resp.ok) {
                throw new Error(`Ошибка ${resp.status}`);
            }
            return resp.json();
        });
    }

    public getListFacts() {
        let url = `${this.baseUrl}/facts`;
        return fetch(url).then(function(resp: Response) {
            return resp.json();
        });
    }
}

let a = new ApiAdapted();
a.getRandomFact().then(function(res) {
    console.log(res);
});
a.getListFacts().then(function(res) {
    console.log(res.data);
});