import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 20);



camera.position.z = 5;




const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

window.addEventListener("resize", function (e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize( window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
  });

const radius = 1;
const segments = 32;
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
const spheres = new THREE.Group();
  
for(let i = 0; i<4; i++){
const geometry = new THREE.SphereGeometry(radius, segments,segments);
const material = new THREE.MeshBasicMaterial({color: colors[i]});
const sphere = new THREE.Mesh(geometry, material);
spheres.add(sphere);
}
scene.add(spheres);

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    window.requestAnimationFrame(animate);
    
    controls.update();
    renderer.render(scene, camera);
}

animate();