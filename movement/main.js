import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui'; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 20);

const geometry = new THREE.BoxGeometry(1,2,3);
const material = new THREE.MeshPhysicalMaterial({color: "red"});
const cube= new THREE.Mesh(geometry,material);

camera.position.z = 5;

const light = new THREE.AmbientLight("white", 0.1); // soft white light
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(2, 2, 0);
scene.add( directionalLight );

const helper = new THREE.DirectionalLightHelper( directionalLight, 2 );
scene.add( helper );

scene.add(cube);



const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );



const mouse = {
  x:0,
  y:0,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX / window.innerWidth;
  mouse.y = e.clientY / window.innerHeight;
  console.log(e.clientX,e.clientY);
});

window.addEventListener("resize", function (e) {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});

const gui = new GUI();
const lightFolder = gui.addFolder('Directional Light');
lightFolder.add(light.position, 'x', -10, 10).name('Light X');
lightFolder.add(light.position, 'y', -10, 10).name('Light Y');
lightFolder.open();

// const gui = new GUI();
// const cubeFolder = gui.addFolder("Cube Properties");

// // GUI controls for cube size and color
// const cubeParams = {
//   width: 1,
//   height: 2,
//   depth: 3,
//   color: "#ff0000"
// };

// cubeFolder.add(cubeParams, "width", 0.1, 5).onChange((value) => {
//   cube.scale.x = value;
// });

// cubeFolder.add(cubeParams, "height", 0.1, 5).onChange((value) => {
//   cube.scale.y = value;
// });

// cubeFolder.add(cubeParams, "depth", 0.1, 5).onChange((value) => {
//   cube.scale.z = value;
// });

// cubeFolder.addColor(cubeParams, "color").onChange((value) => {
//   cube.material.color.set(value);
// });

// cubeFolder.open();

function animate(){
    window.requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();

