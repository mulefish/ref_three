import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer, CSS3DSprite, CSS3DObject } from 'three-css3d';
let height = window.innerHeight * 0.6
var camera, scene, renderer, controls, rendererTrad;

function clickListener(evt) { 
  const id = evt.target.id 
  if ( id === "loadTestData") {
    fetch('./test.json')
    .then(response => response.json())
    .then(data => { 
      // console.log(data)
      let i = 0
      for ( let k in data ) {
        const v = data[k] 
        console.log( ++i + "   " + v + "    " + k )
      }
      init()
      animate()
  

    })
    .catch(error => console.error(error));    



  } else { 
    console.log("BOO " + id )
  }
}
window.addEventListener("click", clickListener);


function addLight(...pos) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
}

function addLetter(position, text) {
  const createdElement = document.createElement('div')
  const details = document.createElement('div')
  details.innerHTML = `<a href='javascript:selectedNode("${text}")'>${text}</a>` // table
  createdElement.appendChild(details)

  const theTable = new CSS3DObject(createdElement)
  scene.add(theTable)

  theTable.position.x = position.x
  theTable.position.y = position.y
  theTable.position.z = position.z
}

function init() {
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / height, 1, 10000)
  camera.position.z = 10000
  scene = new THREE.Scene()
  scene.background = new THREE.Color('lightgrey');
  addLight(-1, 2, 4);
  addLight(1, -1, -2);
  const mymaterial = new THREE.MeshPhongMaterial()
  const sprite1 = new THREE.Sprite(mymaterial);
  sprite1.position.set(500, 200, 0);
  scene.add(sprite1);

  const sprite2 = new THREE.Sprite(mymaterial);
  sprite2.position.set(500, 200, 3000);
  scene.add(sprite2);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    sprite1.position,
    sprite2.position,
  ]);
  addLetter(sprite2.position, "A")
  console.log("sprite2.position: " + JSON.stringify(sprite2.position))
  const line1 = new THREE.Line(lineGeometry1, lineMaterial);
  scene.add(line1);

  addLetter(sprite1.position, "B")

  renderer = new CSS3DRenderer()
  rendererTrad = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, height)
  rendererTrad.setSize(window.innerWidth, height)
  renderer.domElement.style.position = 'absolute'
  document.getElementById('container').appendChild(renderer.domElement)
  document.getElementById('container').appendChild(rendererTrad.domElement)

  controls = new OrbitControls(camera, renderer.domElement)

  controls.rotateSpeed = 0.5
  controls.minDistance = 500
  controls.maxDistance = 6000
  controls.addEventListener('change', render)

  window.addEventListener('resize', onWindowResize, false)
  render()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / height
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, height)
  render()
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()
}

function render() {
  renderer.render(scene, camera)
  rendererTrad.render(scene, camera)
}
