import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 20);

// const geometry = new THREE.BufferGeometry();
// let vertices = new Float32Array(3000);

// for(let i=0; i<= 1000*3 ; i++){
//     vertices[i] = (Math.random() - 0.5)*5;
// }

// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// const material = new THREE.MeshBasicMaterial({color: "red", wireframe: true});
// const mesh = new THREE.Mesh(geometry, material);

// const light = new THREE.DirectionalLight("white", 2);
// light.position.set(1,1,1);
// scene.add(light);

// const helper = new THREE.DirectionalLightHelper( light, .8 );
// scene.add( helper ); //helper will tell use from where light is created or coming from

let textureLoader = new THREE.TextureLoader();
let tex = textureLoader.load("/public/earthmap1k.jpg");
tex.colorSpace = THREE.SRGBColorSpace;

let tex2 = textureLoader.load("https://www.shutterstock.com/image-photo/isolated-white-clouds-on-black-260nw-684470536.jpg");
tex2.colorSpace = THREE.SRGBColorSpace;

const cubegeo = new THREE.SphereGeometry(1,50,50);
const material = new THREE.MeshPhysicalMaterial({map: tex});
// material.metalness = 1;
// material.roughness =.3;
// material.clearcoat = .2;

const cube= new THREE.Mesh(cubegeo,material);

const geometry2 = new THREE.SphereGeometry(1.02,50,50);
const material2 = new THREE.MeshPhysicalMaterial({alphaMap: tex2});
material2.transparent = true;
const mesh2 = new THREE.Mesh(geometry2, material2);

let hdri = new RGBELoader();
hdri.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/autumn_field_4k.hdr",function(hdritexture){
    hdritexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdritexture;
});





// cube.position.x = -1;

// const spheregeo = new THREE.SphereGeometry(1,10,10);
// const spheremat = new THREE.MeshBasicMaterial({color: "red", wireframe: true});
// const sphere= new THREE.Mesh(spheregeo,spheremat);

// sphere.position.x = 1;

// const group = new THREE.Group();
// group.add(cube);
// group.add(sphere);

// group.position.x = 2;

camera.position.z = 3;

// scene.add(group);
scene.add(cube);
scene.add(mesh2);




const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 1

function animate() {
    window.requestAnimationFrame( animate );
    cube.rotation.y += 0.002;
    mesh2.rotation.y += 0.003;
    // camera.position.z -=0.01;
    controls.update();
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