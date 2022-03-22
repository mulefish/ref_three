import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// const scene = new THREE.Scene()
// // scene.add(new THREE.AxesHelper(5))

// scene.background = new THREE.Color( 0xa0a0a0 );
// scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

// const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
// hemiLight.position.set( 0, 20, 0 );
// scene.add( hemiLight );

// const dirLight = new THREE.DirectionalLight( 0xffffff );
// dirLight.position.set( 3, 10, 10 );
// dirLight.castShadow = true;
// dirLight.shadow.camera.top = 2;
// dirLight.shadow.camera.bottom = - 2;
// dirLight.shadow.camera.left = - 2;
// dirLight.shadow.camera.right = 2;
// dirLight.shadow.camera.near = 0.1;
// dirLight.shadow.camera.far = 40;
// scene.add( dirLight );



// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     100
// )
// camera.position.z = 2
// // alert("w: " + window.innerWidth + " h: " + window.innerHeight + " and " +  )

const canvas = document.getElementById("target");
const HEIGHT = window.innerHeight * 0.8;
function main() {
    // const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, HEIGHT )
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 25;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;
  
    // const controls = new THREE.OrbitControls(camera, canvas);
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.target.set(0, 0, 0);
    controls.update();
  
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');
  
    function addLight(...pos) {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(...pos);
      scene.add(light);
    }
    addLight(-1, 2, 4);
    addLight( 1, -1, -2);
  
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
      makeInstance(geometry, hsl(1 / 8, 1, .5),  d, -d, -d);
      makeInstance(geometry, hsl(2 / 8, 1, .5), -d,  d, -d);
      makeInstance(geometry, hsl(3 / 8, 1, .5),  d,  d, -d);
      makeInstance(geometry, hsl(4 / 8, 1, .5), -d, -d,  d);
      makeInstance(geometry, hsl(5 / 8, 1, .5),  d, -d,  d);
      makeInstance(geometry, hsl(6 / 8, 1, .5), -d,  d,  d);
      makeInstance(geometry, hsl(7 / 8, 1, .5),  d,  d,  d);
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
  
  main();



// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
// renderer.setSize(window.innerWidth, window.innerHeight)

// const controls = new OrbitControls(camera, renderer.domElement)



// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true
// })

// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)


// const loader = new GLTFLoader();

// loader.load( 'Xbot.glb', function ( gltf ) {
// 	scene.add( gltf.scene );
// }, undefined, function ( error ) {
// 	console.error( error )
// } );

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

// function animate() {
//     requestAnimationFrame(animate)
//     render()
// }
// function render() {
//     renderer.render(scene, camera)
// }
// animate()

