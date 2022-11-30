import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
// import {CSS3DRenderer, CSS3DSprite, CSS3DObject} from 'three-css3d';


const canvas = document.getElementById("target");
const HEIGHT = window.innerHeight * 0.8;
function main() {

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, HEIGHT)

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 100;

    const axes = new THREE.AxisHelper(50);
    // const controls = new THREE.OrbitControls(camera, canvas);
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.target.set(10,10,0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    scene.add(axes);

    const X = makeTextSprite( `X`, { fontsize: 44, textColor: {r:0, g:0, b:0, a:1.0}} );
	X.position.set(10,0,0);
    scene.add(X);
    const Y = makeTextSprite( `Y`, { fontsize: 44, textColor: {r:0, g:0, b:0, a:1.0}} );
	Y.position.set(0,10,0);
    scene.add(Y);
    const Z = makeTextSprite( `Z`, { fontsize: 44, textColor: {r:0, g:0, b:0, a:1.0}} );
	Z.position.set(0,0,10);
    scene.add(Z);

    function addLight(...pos) {
        console.log( pos )
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        scene.add(light);
    }
    addLight(-1, 2, 4);
    addLight(1, -1, -2);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x, y, z) {
        const material = new THREE.MeshPhongMaterial({
            color,
            opacity: 0.5,
            transparent: true,
        });

        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);




        cube.position.set(x, y, z);

        return cube;
    }

    function hsl(h, s, l) {
        return (new THREE.Color()).setHSL(h, s, l);
    }

    {
        const d = 0.8;
        makeInstance(geometry, hsl(0 / 8, 1, .5), -d, -d, -d);
        makeInstance(geometry, hsl(1 / 8, 1, .5), d, -d, -d);
        makeInstance(geometry, hsl(2 / 8, 1, .5), -d, d, -d);
        makeInstance(geometry, hsl(3 / 8, 1, .5), d, d, -d);
        makeInstance(geometry, hsl(4 / 8, 1, .5), -d, -d, d);
        makeInstance(geometry, hsl(5 / 8, 1, .5), d, -d, d);
        makeInstance(geometry, hsl(6 / 8, 1, .5), -d, d, d);
        makeInstance(geometry, hsl(7 / 8, 1, .5), d, d, d);
    }


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    let renderRequested = false;

    function render() {
        renderRequested = undefined;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
    }
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
    alert(param)
}
self["helloworld"] = helloworld; 