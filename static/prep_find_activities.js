const data = require("./data_april_13_lookup.json")
const seen = {} 
for ( let k in data ) {
    const v = data[k]
    const letter_activity = v.split("_")
    const letter = letter_activity[0]
    const activity = letter_activity[1]
    if ( seen.hasOwnProperty(activity )) {
        seen[activity]++
    } else {
        seen[activity] = 1 
    }
}
/*
let temp = 0 
for ( let k in seen ) {
    if ( k.includes("golf")) {
        temp +=seen[k]
        delete seen[k]
    }
}
for ( let k in seen ) {
    if ( k.includes("tennis")) {
        temp +=seen[k]
        delete seen[k]
    }
}

let noise = 0 
for ( let k in seen ) {
    let v = seen[k]
    if ( k === "" || v < 5 ) {
        noise += v
        delete seen[k]
    }
}


for ( let k in seen ) {
    if ( k.includes(" ")) {
        const newKey = k.split(" ").join("_");
        const v = seen[k]
        delete seen[k]
        seen[newKey] = v
    }
}



seen["golf_tennis"] = temp
seen["noise"] = noise

*/

let  i = 0 ; 
for ( let k in seen ) {
    i++
    const v = seen[k]
    console.log( i +  "     "+ v + "    " + k )
}


