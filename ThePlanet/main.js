import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25,window.innerWidth / window.innerHeight, 0.1, 100);



camera.position.z = 9;

let lastScrollTime = 0;
const throttleDelay = 2000; // 2 seconds in milliseconds

window.addEventListener('wheel', (event) => {
    const currentTime = Date.now();
    
    if (currentTime - lastScrollTime >= throttleDelay) {
        // Your wheel event handling code here
        console.log('Wheel event triggered');
        
        lastScrollTime = currentTime;
        if (event.deltaY < 0) {
            console.log('up');
        } else {
            console.log('down');
        }
    }
});



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
const textures = ['/public/csilla/color.png','/public/earth/map.jpg','/public/venus/map.jpg','/public/volcanic/color.png'];
const spheres = new THREE.Group();

// Create large sphere for starfield background
const starfieldGeometry = new THREE.SphereGeometry(50, 64, 64);
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load('/public/stars.jpg');
starTexture.colorSpace = THREE.SRGBColorSpace;
const starMaterial = new THREE.MeshStandardMaterial({
    map: starTexture,
    side: THREE.BackSide, // Render on inside of sphere
    opacity: 0.5, 
    transparent: true,
});
const starfield = new THREE.Mesh(starfieldGeometry, starMaterial);
scene.add(starfield);


let hdri = new RGBELoader();
hdri.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/moonlit_golf_1k.hdr", function(hdritexture){
    hdritexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdritexture;
}
);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

  
for(let i = 0; i<4; i++){
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(textures[i]);
  texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(radius, segments,segments);
const material = new THREE.MeshStandardMaterial({ map: texture});
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

// const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    window.requestAnimationFrame(animate);
    
    // controls.update();
    renderer.render(scene, camera);
}

animate();