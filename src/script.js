import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

// import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
import {CSS3DRenderer, CSS3DSprite, CSS3DObject} from 'three-css3d';

let campaign_impact = "<table class='tbl' border='1'><th colspan='2'><div class='head'>campaign_impact</tr><tr><td><div class='c2'>campaign_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c3'>click_code</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c8'>member_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c3'>mktg_tag</div></td><td><div>varchar(255)</div></td></tr></table>"
let campaigns = "<table class='tbl' border='1'><th colspan='2'><div class='head'>campaigns</tr><tr><td><div class='c2'>campaign_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>campaign_name</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>campaign_type</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c2'>date</div></td><td><div>datetime</div></td></tr><tr><td><div class='c8'>member_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c7'>person_id</div></td><td><div>int(11)</div></td></tr></table>"
let click_names = "<table class='tbl' border='1'><th colspan='2'><div class='head'>click_names</tr><tr><td><div class='c3'>click_code</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>click_name</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c2'>click_str</div></td><td><div>char(1)</div></td></tr><tr><td><div class='c1'>click_type</div></td><td><div>char(1)</div></td></tr><tr><td><div class='c1'>count_it</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>rec_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>url</div></td><td><div>varchar(255)</div></td></tr></table>"
let click_sum = "<table class='tbl' border='1'><th colspan='2'><div class='head'>click_sum</tr><tr><td><div class='c8'>member_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>month</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c7'>person_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>vector_sum</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c2'>year</div></td><td><div>int(11)</div></td></tr></table>"
let clicks = "<table class='tbl' border='1'><th colspan='2'><div class='head'>clicks</tr><tr><td><div class='c3'>click_code</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>click_dt</div></td><td><div>datetime</div></td></tr><tr><td><div class='c2'>click_str</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>cookie</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c8'>member_id</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c3'>mktg_tag</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c7'>person_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c4'>portal_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>session_id</div></td><td><div>int(11)</div></td></tr></table>"
let demographics = "<table class='tbl' border='1'><th colspan='2'><div class='head'>demographics</tr><tr><td><div class='c2'>lob</div></td><td><div>char(1)</div></td></tr><tr><td><div class='c1'>age</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>birth_dt</div></td><td><div>datetime</div></td></tr><tr><td><div class='c2'>brand</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>gender</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c2'>grgr_id</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>grgr_name</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c8'>member_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>parent_group</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c7'>person_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c4'>portal_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>product</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>start_date</div></td><td><div>datetime</div></td></tr><tr><td><div class='c2'>state</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>term_date</div></td><td><div>datetime</div></td></tr></table>"
let registration = "<table class='tbl' border='1'><th colspan='2'><div class='head'>registration</tr><tr><td><div class='c1'>elf_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>email_address</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c8'>member_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c7'>person_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>reg_dt</div></td><td><div>datetime</div></td></tr><tr><td><div class='c2'>session_id</div></td><td><div>int(11)</div></td></tr></table>"
let segment = "<table class='tbl' border='1'><th colspan='2'><div class='head'>segment</tr><tr><td><div class='c2'>lob</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c2'>brand</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>grgr_id</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>last_login</div></td><td><div>datetime</div></td></tr><tr><td><div class='c8'>member_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>month</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>parent_group</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c7'>person_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c4'>portal_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>reg_dt</div></td><td><div>datetime</div></td></tr><tr><td><div class='c1'>segment_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c2'>state</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c2'>year</div></td><td><div>int(11)</div></td></tr></table>"
let sessions = "<table class='tbl' border='1'><th colspan='2'><div class='head'>sessions</tr><tr><td><div class='c1'>device</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c8'>member_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c3'>mktg_tag</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c7'>person_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c4'>portal_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>sesion_id</div></td><td><div>int(11)</div></td></tr><tr><td><div class='c1'>session_dt</div></td><td><div>datetime</div></td></tr></table>"
let user = "<table class='tbl' border='1'><th colspan='2'><div class='head'>user</tr><tr><td><div class='c1'>c</div></td><td><div>char(1)</div></td></tr><tr><td><div class='c2'>date</div></td><td><div>datetime</div></td></tr><tr><td><div class='c1'>email</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>goat</div></td><td><div>varchar(255)</div></td></tr><tr><td><div class='c1'>name</div></td><td><div>varchar(255)</div></td></tr></table>"


// const canvas = document.getElementById("target");




function addLight(...pos) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
}


const boxWidth = 50;
const boxHeight = 50;
const boxDepth = 50;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// function hsl(h, s, l) {
//   return (new THREE.Color()).setHSL(h, s, l);
// }

// rgb(
function hsl(h,s,l) { 
  // NOTE to the future: use hsl? or rgb?
  const color3 = new THREE.Color("rgb(255, 0, 0)");
  return color3
}


// function hsl(h, s, l) {
//   return (new THREE.Color()).setHSL(h, s, l);
// }



let distance = 6000

  const months = []
  // function When (id, display, distance) {
  //   this.id = id
  //   this.display = display
  //   this.distance = distance
  // }

  class When{ 
    constructor(id, display, distance) {
      this.id = id
      this.display = display
      this.distance = distance
    }
  }


  const timeline = () => {
  // +6000 'units' is what Z is set to in the three.js code
    const distanceLikurt_betweenMonths = 6000 / 24
    distance = 6000
    for (var i = 0; i < 24; i++) {
      let d = new Date()
      d.setMonth((d.getMonth() - 12) + i)
      months.push(new When(i, formatDate(d), distance))
      distance -= distanceLikurt_betweenMonths
    }
  }

  // const showDates = () => {
  //   for (x in months) {
  //     let o = months[x]
  //     console.log(o.id + ' -> ' + o.display + ' -> ' + o.distance)
  //   }
  // }

  const formatDate = (d) => {
    let year = 1900 + d.getYear()
    let month = 1 + d.getMonth()
    if (month < 10) {
      month = '0' + month
    }
    let date = d.getDate()
    if (date < 10) {
      date = '0' + date
    }
    let yyyymmdd = year + '/' + month + '/' + date
    return yyyymmdd
  }

  timeline()

// ------------------------------------

  var height = 500
  var camera, scene, renderer
  var controls
  var rendererTrad; 
  
  var objects = []

  init()
  animate()


/* 
  function addTable ( distance) {
    var bunny = document.createElement('div')

    const x = 300
    const y = 300
    const z = distance 

    const hue = Math.random()
    const saturation = 1; // Math.random()
    const lightness = Math.random()
//     makeInstance(geometry, hsl(hue, saturation, lightness  ),  300, 300, z - 50 );
//    makeInstance(geometry, hsl(0, 0, 1  ),  300, 300, z - 50 );

    console.log( hue, saturation, lightness, x, y, z  )
    var t = `<table border='1'>`
    t += `<tr><td>x</td><td>${x}</td></tr>`
    t += `<tr><td>y</td><td>${y}</td></tr>`
    t += `<tr><td>z</td><td>${z}</td></tr>`


    var details = document.createElement('div')
    details.className = 'details'

    details.innerHTML = t
    bunny.appendChild(details)

    var o2 = new CSS3DObject(bunny)
    scene.add(o2)
    // scene.background = new THREE.Color('white');


    // addLight(-1, 2, 4);
    // addLight( 1, -1, -2);


    o2.position.x = 300// 500 + (Math.floor(Math.random() * 1000))
    o2.position.y = 300// -500 + (Math.floor(Math.random() * 1000))
    o2.position.z = distance// -500 + (Math.floor(Math.random() * 4000))
    o2.rotateX = 10.2


  }
*/
  function addWhen (index) {
    let w = months[index]
    // console.log('addWhen: ' + index + 'w ' + w)

    var thing = document.createElement('div')
    var details = document.createElement('div')
    details.className = 'timeline'
    details.innerHTML = w.display
    thing.appendChild(details)

    // var o2 = new THREE.CSS3DObject(thing)
    var o2 = new CSS3DObject(thing)
    scene.add(o2)

    o2.position.x = -200// + (Math.floor(Math.random() * 1000))
    o2.position.y = -200// + (Math.floor(Math.random() * 1000))
    o2.position.z = w.distance
  }


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


  function init () {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / height, 1, 10000)
    camera.position.z = 10000
    scene = new THREE.Scene()

    // months[22].id = '0'
    // months[22].display = 'ZOOM'
    // months[22].distance = 400

    for (var i = 23; i > 0; i--) {
      // months[i].display = months[i].distance + ' | ' + months[i].id
      addWhen(i)
    }

    // let html = createTable()
//    addTable( months[0].distance)
    // addTable( -10)

    scene.background = new THREE.Color('tan');


    addLight(-1, 2, 4);
    addLight( 1, -1, -2);





    // addTable( 101)
    // addTable( 1001)



    // addTable( months[9].distance)
    // addTable( months[15].distance)


    const mymaterial = new THREE.MeshPhongMaterial()
    // var clr = hsl(hue, saturation, lightness  )
    // const material = new THREE.MeshPhongMaterial({
    //   clr ,
    //   opacity: 0.5,
    //   transparent: true,
    // });
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
    const line1 = new THREE.Line(lineGeometry1, lineMaterial);
    scene.add(line1);

   

    renderer = new CSS3DRenderer()
    rendererTrad = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, height)
    rendererTrad.setSize(window.innerWidth, height)
    renderer.domElement.style.position = 'absolute'
    document.getElementById('container').appendChild(renderer.domElement)
    document.getElementById('container').appendChild(rendererTrad.domElement)
    // canvas.appendChild(renderer.domElement)

    // controls = new TrackballControls(camera, renderer.domElement)
    controls = new OrbitControls(camera, renderer.domElement)

    controls.rotateSpeed = 0.5
    controls.minDistance = 500
    controls.maxDistance = 6000
    controls.addEventListener('change', render)

    window.addEventListener('resize', onWindowResize, false)
    render()
  }

  function onWindowResize () {
    camera.aspect = window.innerWidth / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, height)
    render()
  }

  function animate () {
    requestAnimationFrame(animate)
    controls.update()
  }

  function render () {
    renderer.render(scene, camera)
    rendererTrad.render(scene, camera)
  }