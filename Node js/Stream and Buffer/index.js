const server = require('http')
const fs = require('fs')

const rstream = fs.createReadStream("input.txt")

rstream.on("data", (chunkdata) => {
    res.write(chunkdata)
})

rstream.on("end", () => {
    res.end()
})

server.listen(8000)