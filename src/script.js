import * as THREE from 'three'
import { ObjectSpaceNormalMap } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
// import {CSS3DRenderer, CSS3DSprite, CSS3DObject} from 'three-css3d';


const canvas = document.getElementById("target");
const HEIGHT = window.innerHeight * 0.8;
const WIDTH = window.innerWidth * 0.8
const cubes = {}
let renderer = undefined;
let camera = undefined;
let renderRequested = false;
let scene = undefined;
function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
}


function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = WIDTH // canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function main() {

    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(WIDTH, HEIGHT)

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 100; // closer

    const axes = new THREE.AxisHelper(50);
    // const controls = new THREE.OrbitControls(camera, canvas);
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.target.set(10, 10, 0);
    controls.update();

    scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    scene.add(axes);

    const X = makeTextSprite(`X`, { fontsize: 44, textColor: { r: 0, g: 0, b: 0, a: 1.0 } });
    X.position.set(55, 0, 0);
    scene.add(X);
    const Y = makeTextSprite(`Y`, { fontsize: 44, textColor: { r: 0, g: 0, b: 0, a: 1.0 } });
    Y.position.set(0, 10, 0);
    scene.add(Y);
    const Z = makeTextSprite(`Z`, { fontsize: 44, textColor: { r: 0, g: 0, b: 0, a: 1.0 } });
    Z.position.set(0, 0, 10);
    scene.add(Z);

    function addLight(...pos) {
//        co sole.log(pos)
        const color = 0xff00ff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        scene.add(light);
    }
    addLight(-1, 2, 4);
    addLight(1, -1, -2);

    addLight(-1, -1, -1);
    addLight(1, 1, 1);



    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    function makeInstance(geometry, color, x, y, z, productName) {
        // finch 
        // const clr = "rgba(0,0,0,1)"
        const material = new THREE.MeshPhongMaterial({
            color,
            opacity: 0.5,
            transparent: true,
        });

        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        cubes[productName] = cube



        cube.position.set(x, y, z);

        return cube;
    }

    function hsl(h, s, l) {
        return (new THREE.Color()).setHSL(h, s, l);
    }



    // for ( let j = 0; j < 200; j++ ) {
    Object.keys(products).forEach((k) => {
        products[k].x = 0
        products[k].y = 0
        products[k].z = 0
        const xx = 0
        const yy = 0
        const zz = 0
        let r = Math.random()
        if (r > 0.9) {
            // purple
            makeInstance(geometry, hsl(0.666, 0.66, .6), xx, yy, zz, k);
        } else {
            // pink
            makeInstance(geometry, hsl(2, 2, 1), xx, yy, zz, k);
        }
    })




    render();

    function requestRenderIfNotRequested() {
        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(render);
        }
    }

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);
}



function makeTextSprite(message, parameters) {
    if (parameters === undefined) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText(message);
    var textWidth = metrics.width;

    context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    // roundRect(context, borderThickness/2, borderThickness/2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

    context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
    context.fillText(message, borderThickness, fontsize + borderThickness);

    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
    return sprite;
}

main();

function helloworld(param) {
    //    alert(param)
    try {

        // Object.keys(products).forEach((k)=>{
        //     products[k].x =  ( Math.random() * 150 ) - 75  
        //     products[k].y =  ( Math.random() * 150 ) - 75  
        //     products[k].z =  ( Math.random() * 150 ) - 75  

        // })

        // cubes.forEach((cube)=> { 
        for (let productName in cubes) {
            // co nsole.log("PRODUCT NAME " + productName)
            const xx = (Math.random() * 150) - 75
            const yy = (Math.random() * 150) - 75
            const zz = (Math.random() * 150) - 75
            cubes[productName].position.set(xx, yy, zz);

        }
        render()
    } catch (boom) {
        alert(boom)
    }
}
function sortOn(xyz, widgetId) {
    const token = document.getElementById(widgetId).innerHTML
    let riv = []
    let most = 0
    let most_product = ""

    if (token === undefined || token.length === 0 || ! tokens.hasOwnProperty(token)) {
        riv = [0.001, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0
        ]    
    } else {
        riv = tokens[token].riv
    }

    for (let k in products) {
        const delta = cosine_similarity(riv, products[k].riv)
        if (delta > most) {
            most = delta
            most_product = k
        }
        const value = 150 * delta / 1
        products[k].delta = delta
        const modified = value
        //console.log( modified + "   " + value )
        if ( xyz === "x") {
            cubes[k].position.x = modified
            console.log("X: " + modified + "    " + k )
        } else if ( xyz === "y" ) {
            cubes[k].position.y = modified
            console.log("Y: " + modified + "    " + k )
        } else if ( xyz === "z" ) {
            cubes[k].position.z = modified
            console.log("Z: " + modified + "    " + k )
        } else {
            console.log("Something weird.... LINE 250 in script.js")
        }
        products[k][xyz] = modified

        // console.log(xyz + "   " + modified)

    }
    render()
    console.log( most + " " + most_product)
}
    self["sortOn"] = sortOn;
    self["helloworld"] = helloworld; 