bioData = {
    name: "Om",
    age: 19
}

console.log(bioData)

const jsonData = JSON.stringify(bioData) // Convert object to json data
console.log(jsonData)

const objData = JSON.parse(jsonData) // Convert json data to object
console.log(objData)