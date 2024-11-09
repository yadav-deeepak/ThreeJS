import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25,window.innerWidth / window.innerHeight, 0.1, 100);



camera.position.z = 9;




const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

window.addEventListener("resize", function (e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize( window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
  });

const radius = 1.3;
const segments = 64;
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
const spheres = new THREE.Group();
  
for(let i = 0; i<4; i++){
const geometry = new THREE.SphereGeometry(radius, segments,segments);
const material = new THREE.MeshBasicMaterial({color: colors[i]});
const sphere = new THREE.Mesh(geometry, material);

const angle = (i / 4) * (Math.PI *2);
const orbitRadius = 4.5;
sphere.position.x = orbitRadius * Math.cos(angle);
sphere.position.z = orbitRadius * Math.sin(angle);

spheres.add(sphere);
}
spheres.rotation.x = 0.1;
spheres.position.y = -0.8;
scene.add(spheres);

setInterval(()=>{
  gsap.to(spheres.rotation, {
    y: `+=${Math.PI / 2}`,
    duration: 2,
    ease: "expo.easeInOut",
  });
}, 2500);

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    window.requestAnimationFrame(animate);
    
    controls.update();
    renderer.render(scene, camera);
}

animate();