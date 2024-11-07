import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 20);

const geometry = new THREE.BoxGeometry(1,1,1,6,6,6);
const material = new THREE.MeshBasicMaterial({color: "red", wireframe: true});
const cube= new THREE.Mesh(geometry,material);

camera.position.z = 5;


scene.add(cube);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

function animate(){
    window.requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();