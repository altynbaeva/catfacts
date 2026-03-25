class ApiAdapted {
    private baseUrl = "https://catfact.ninja";
    
    public getRandomFact(maxLength: number) {
        let url = `${this.baseUrl}/fact?max_length=${maxLength}`;
        return fetch(url).then(function(resp: Response) {
            if(!resp.ok) {
                throw new Error(`Ошибка ${resp.status}`);
            }
            return resp.json();
        });
    }

    public getListFacts(maxLength: number, limit: number) {
        let url = `${this.baseUrl}/facts?max_length=${maxLength}&limit=${limit}`;
        return fetch(url).then(function(resp: Response) {
            return resp.json();
        });
    }
}

let a = new ApiAdapted();
a.getRandomFact(50).then(function(res) {
    console.log(res);
});
a.getListFacts(60, 5).then(function(res) {
    console.log(res.data);
});