import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer, CSS3DSprite, CSS3DObject } from 'three-css3d';
let height = window.innerHeight * 0.6
var camera, scene, renderer, controls, rendererTrad;
let dentogram;
let dentogram_lookup;

function blue(msg) {
  console.log("%c" + msg, "background:lightblue;")
}
function green(msg) {
  console.log("%c" + msg, "background:lightgreen;")
}
function tan(msg) {
  console.log("%c" + msg, "background:tan;")
}
function pink(msg) {
  console.log("%c" + msg, "background:pink;")
}

function loadData(dataFileName, lookupFileName) {
  green(dataFileName + "   " + lookupFileName)
  const t1 = new Date().getTime()
  fetch('./' + dataFileName)
    .then(response => response.json())
    .then(data => {
      blue(`1 of 2 ${dataFileName} loaded`)
      dentogram = data
      fetch('./' + lookupFileName)
        .then(response => response.json())
        .then(data2 => {
          blue(`2 of 2 ${lookupFileName} loaded`)
          dentogram_lookup = data2
          init()
          animate()
          document.getElementById("milsec").innerHTML = new Date().getTime() - t1
        })
        .catch(error => pink(error));
    })
    .catch(error => pink(error));
}

function clickListener(evt) {
  const id = evt.target.id
  if (id === "loadTestData") {
    loadData("test.json", "test_lookup.json")     // // Load 10 nodes 
  } else if (id === "loadRealData") {
    loadData("data_april_13.json", "data_april_13_lookup.json")     // Load 4361 nodes 
  } else if (id === "cx+") {
    camera.position.x += 500
    animate()
  } else if (id === "cy+") {
    camera.position.y += 500
    animate()
  } else if (id === "cz+") {
    camera.position.z += 500
    animate()
  } else if (id === "cx-") {
    camera.position.x -= 500
    animate()
  } else if (id === "cy-") {
    camera.position.y -= 500
    animate()
  } else if (id === "cz-") {
    camera.position.z -= 500
    animate()
  } else {
    console.log("Fall through, with id=" + id)
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


  const letter_activity = text.split("_")
  const letter = letter_activity[0]
  const activity = letter_activity[1]
  let className = "mint"
  if (activity === "on the move") {
    className = "grey"
  } else if (activity === "yoga") {
    className = "olive"
  } else if (activity === "training") {
    className = "lime"
  } else if (activity === "running") {
    className = "orange"
  }



  const createdElement = document.createElement('div')
  const details = document.createElement('div')
  // details.innerHTML = `<a href='javascript:selectedNode("${text}")'>${text} ${position.x} ${position.y} ${position.z}</a>` // table
  details.innerHTML = `<a class='${className}' href='javascript:selectedNode("${text}")'>${letter}</a>` // table
  createdElement.appendChild(details)

  const theTable = new CSS3DObject(createdElement)
  scene.add(theTable)

  theTable.position.x = position.x
  theTable.position.y = position.y
  theTable.position.z = position.z
}

function xyz() {
  return {
    x: (Math.random() * 6000).toFixed(0) - 3000,
    y: (Math.random() * 6000).toFixed(0) - 3000,
    z: 0 // (Math.random() * 3000).toFixed(0) 
  }
}






function init() {




  camera = new THREE.PerspectiveCamera(40, window.innerWidth / height, 1, 10000)
  camera.position.z = 10000
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#f9f9f9');
  addLight(-1, 2, 4);
  addLight(1, -1, -2);
  const mymaterial = new THREE.MeshPhongMaterial()
  const sprite1 = new THREE.Sprite(mymaterial);
  sprite1.position.set(0, 0, 0);
  scene.add(sprite1);

  const sprite2 = new THREE.Sprite(mymaterial);
  sprite2.position.set(500, 200, 1500);
  scene.add(sprite2);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    sprite1.position,
    sprite2.position,
  ]);
  addLetter(sprite2.position, "A")
  const line1 = new THREE.Line(lineGeometry1, lineMaterial);
  scene.add(line1);

  addLetter(sprite1.position, "B")


  for (let k in dentogram_lookup) {

    const v = dentogram_lookup[k]
    const loc = xyz()
    const mysprite = new THREE.Sprite(mymaterial);
    mysprite.position.set(loc.x, loc.y, loc.z);
    scene.add(mysprite);
    addLetter(mysprite.position, v)

  }


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
  document.getElementById("cx").innerHTML = camera.position.x.toFixed(0)
  document.getElementById("cy").innerHTML = camera.position.y.toFixed(0)
  document.getElementById("cz").innerHTML = camera.position.z.toFixed(0)
  requestAnimationFrame(animate)
  controls.update()
}

function render() {
  renderer.render(scene, camera)
  rendererTrad.render(scene, camera)
}
