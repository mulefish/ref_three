

const fs = require('fs');
fs.readFile('simple.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    } else {
        const x = JSON.parse(data)
        traverse(x, 0, 0, 0)
    }
});

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
         console.log(junction + " : " + node.name);
    }
    if (node.distance) {
        total += node.distance
        console.log(node.distance + "  " + loop + "    " + total)
    }
    if (node.children) {
        // console.log(node.children[0]['name'] )
        const ary = getChildrensNames( node.children)
        if ( ary.length > 0 ) {
            junction++
            console.log( junction + " > " + ary)
        }
        node.children.forEach((kid) => {
            loop++
            traverse(kid, loop, total)
        });
    }
}


function numberToLetter(num) {
    const letters = 'abcdefghijklmnopqrstuvwxyz'; // ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    while (num > 0) {
        const remainder = (num - 1) % 26;
        result = letters[remainder] + result;
        num = Math.floor((num - remainder) / 26);
    }

    return result;
}
