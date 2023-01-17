const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.end("This is home page")
    }

    if (req.url === '/about'){
        res.end("This is about page")
    }

    res.end(`
    <h1>Can't find this page</h1>
    `)
})

server.listen(5000)