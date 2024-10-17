import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 20);

const cubegeo = new THREE.BoxGeometry(1,1,1);
const cubemat = new THREE.MeshBasicMaterial({color: "#00FFFF", wireframe: true});
const cube= new THREE.Mesh(cubegeo,cubemat);

// cube.position.x = -1;

// const spheregeo = new THREE.SphereGeometry(1,10,10);
// const spheremat = new THREE.MeshBasicMaterial({color: "red", wireframe: true});
// const sphere= new THREE.Mesh(spheregeo,spheremat);

// sphere.position.x = 1;

// const group = new THREE.Group();
// group.add(cube);
// group.add(sphere);

// group.position.x = 2;

camera.position.z = 5;

// scene.add(group);
scene.add(cube);



const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

function animate() {
    window.requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, camera);
}
animate();
// let clock = new THREE.Clock();
// function animate(){
//     window.requestAnimationFrame(animate);
//     cube.rotation.y = clock.getElapsedTime();
//     renderer.render(scene, camera);
// }

// animate();

// function animate(){
//     window.requestAnimationFrame(animate);
//     group.rotation.y += 0.01;
//     cube.rotation.y += 0.01;
//     sphere.rotation.y += 0.01;
//     renderer.render(scene, camera);
// }

// animate();