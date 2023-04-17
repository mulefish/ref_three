
const lookup = require("./data_april_13_lookup.json")
const dento = require("./data_april_13.json")


function getChildrensNames(aryOfObj) {
    let result = []
        aryOfObj.forEach((kid, i )=> {  
            if ( kid.hasOwnProperty("name"))  {
                result.push(kid['name'])
            }
        })
    
    return result 
} 
let junction =  0
function traverse(node, loop, total) {
    if (node.name) {

        const letter_activity = lookup[node.name].split("_")

        const letter = letter_activity[0]
        const activity = letter_activity[1]

       // console.log("NODE: " + junction + " : " +  "    " + letter);
         // console.log("NODE: " + junction + " : " + node.name);
    }
    if (node.distance) {
        total += node.distance
         console.log("WREN: " + node.distance )
    }
    if (node.children) {
//          console.log(node.children[0]['name'] )
        const orig_ary = getChildrensNames( node.children)
        const ary = [] 
        orig_ary.forEach((item)=> { 

            const letter_activity = lookup[item].split("_")
            const letter = letter_activity[0]
            const activity = letter_activity[1]
            ary.push(letter)
        })

        if ( ary.length > 0 ) {
            junction++
            if ( ary.length === 2  ) { 
            console.log( "JUNCTION: " + junction + " > " + ary)
            }
        }
        node.children.forEach((kid) => {
            loop++
            traverse(kid, loop, total)
        });
    }
}


traverse(dento)