// import * as THREE from "three";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 20);

// const boxGeometry = new THREE.BoxGeometry();
// const material = new THREE.MeshPhysicalMaterial({color: 0x00ff00 });
// const cube= new THREE.Mesh(boxGeometry,material);
// cube.position.x = -1.5;


// const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
// const sphereMaterial = new THREE.MeshPhysicalMaterial({color: 0x0000ff });
// const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
// sphere.position.x = 1.5;

// camera.position.z = 5;


// scene.add(cube);
// scene.add(sphere);

// const AmbientLight = new THREE.AmbientLight(0x404040, 1);
// scene.add(AmbientLight);

// const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight1.position.set(5, 10, 7.5)
// scene.add(directionalLight1);

// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight1.position.set(-5, -10, -7.5)
// scene.add(directionalLight2);

// const canvas = document.querySelector("canvas");
// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.render(scene, camera);

// window.addEventListener("resize", function (e) {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   renderer.setSize( window.innerWidth, window.innerHeight);
//   camera.updateProjectionMatrix();
// });

// const raycaster = new THREE.Raycaster();
// const pointer = new THREE.Vector2();

// let previousIntersected = null;
// let originalColor = null;
// function onPointerMove( event ) {

// 	// calculate pointer position in normalized device coordinates
// 	// (-1 to +1) for both components

// 	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//   raycaster.setFromCamera( pointer, camera );
//   const intersects = raycaster.intersectObjects([cube, sphere]);

//   if (intersects.length > 0) {
//     const intersected = intersects[ 0 ].object;

//     if (previousIntersected !== intersects[0].object) {
//       if (previousIntersected) {
//         previousIntersected.material.color.set(originalColor);
//       }
//       previousIntersected = intersects[0].object;
//       originalColor = previousIntersected.material.color.getHex();
//       previousIntersected.material.color.set(0xff0000);
//   }
// }else{
//   if(previousIntersected) {
//     previousIntersected.material.color.set(originalColor);
//     previousIntersected = null;
//   }
// }
// }

// window.addEventListener( 'pointermove', onPointerMove );

// const controls = new OrbitControls( camera, renderer.domElement );


// function animate(){
//     window.requestAnimationFrame(animate);
//     // cube.rotation.y += 0.01;
//     controls.update();
//     renderer.render(scene, camera);
// }

// animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// Renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// HDRI Environment
new RGBELoader()
    .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_pit_1k.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        // scene.background = texture;
    });

// Load 3D Model
const loader = new GLTFLoader();
loader.load ('/pokeball.glb', function(model){
  scene.add(model.scene);
  
});

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    renderer.render(scene, camera);
}

animate();
