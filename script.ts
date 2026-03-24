class ApiAdapted {
    private baseUrl = "https://catfact.ninja";
    
    public getRandomFact(maxLength: number) {
        let url = `${this.baseUrl}/fact?max_length=${maxLength}`;
        return fetch(url)
    }
}