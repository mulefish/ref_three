import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { Int8Attribute } from 'three'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight * 0.8

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

function init() {
  renderer.setSize(WIDTH, HEIGHT);
  document.getElementById("container").appendChild(renderer.domElement)
  const light = new THREE.AmbientLight( 0x404040 , 1); // soft white light
scene.add( light );
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });

  const pickingMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );
  // const defaultMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: true, shininess: 0	} );
  const cube1 = new THREE.Mesh(geometry, material);

  //const position = new THREE.Vector3();
  cube1.position.x = 3
  cube1.position.y = 2
  cube1.position.z = 1
  scene.add(cube1);


  const cube2 = new THREE.Mesh(geometry, material);

  //const position = new THREE.Vector3();
  cube2.position.x = -3
  cube2.position.y = -2
  cube2.position.z = -1
  scene.add(cube2);


  camera.position.z = 5;

}

function animate() {
  // requestAnimationFrame( animate );

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

init()
animate();