import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'dat.gui'


const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))
scene.background = new THREE.Color(0x000000);


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
)
// const camera = new THREE.OrthographicCamera(-2,2,2,-2)
camera.position.z = 2

const threeCanvas = document.getElementById("threeCanvas") as HTMLCanvasElement;
// const renderer = new THREE.WebGLRenderer() // replaced by ref to hard coded canvas ref
const renderer = new THREE.WebGLRenderer({canvas: threeCanvas})
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement) // adds canvas element to html - replaced by actual canvas with id

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
console.dir(scene)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


const gui = new GUI();
// gui.add(cube.rotation, "x")
// gui.add(cube.rotation, "x",0, Math.PI * 2)
// gui.add(cube.rotation, "y",0, Math.PI * 2)
// gui.add(cube.rotation, "z",0, Math.PI * 2)
// instead of above do following and add to cubefolder
const cubeFolder = gui.addFolder("Cube");
const cubeRotationFolder = cubeFolder.addFolder("Rotation")
cubeRotationFolder.add(cube.rotation, "x",0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, "y",0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, "z",0, Math.PI * 2)
cubeFolder.open()
cubeRotationFolder.open()
const cubePositionFolder = cubeFolder.addFolder("Position")
cubePositionFolder.add(cube.position, "x", -10, 10, 0.1)
cubePositionFolder.add(cube.position, "y", -10, 10, 0.1)
cubePositionFolder.add(cube.position, "z", -10, 10, 0.1)
cubeFolder.open()
cubePositionFolder.open()
const cubeScaleFolder = cubeFolder.addFolder("Scale")
cubeScaleFolder.add(cube.scale, "x", -5, 5)
cubeScaleFolder.add(cube.scale, "y", -5, 5)
cubeScaleFolder.add(cube.scale, "z", -5, 5)
cubeScaleFolder.open()
// const cameraFolder = gui.addFolder("Camera")
// cameraFolder.add(camera.position, "z", 0, 20)
// cameraFolder.open()


function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    // cube.scale.x += 0.02

    render()

    stats.update();
}

const stats = new Stats();
document.body.appendChild(stats.dom)

function render() {
    renderer.render(scene, camera)
}

animate()