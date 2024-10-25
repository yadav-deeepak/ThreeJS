import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 20);

const geometry = new THREE.BoxGeometry(1,2,3);
const material = new THREE.MeshBasicMaterial({color: "red"});
const cube= new THREE.Mesh(geometry,material);

camera.position.z = 5;


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

function animate(){
    window.requestAnimationFrame(animate);
    // cube.rotation.y += 0.01;
    cube.lookAt(new THREE.Vector3(mouse.x-.5,-mouse.y+.5,1));
    controls.update();
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();