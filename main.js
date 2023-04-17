function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return new THREE.Color(r, g, b);
}

function randomGeometry() {
  const geometryTypes = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.ConeGeometry(1, 2, 32),
    new THREE.CylinderGeometry(1, 1, 2, 32),
    new THREE.TorusGeometry(1, 0.4, 16, 100),
    new THREE.TetrahedronGeometry(1, 0),
  ];
  return geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
}

let scene, camera, renderer;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer(); // Remove the alpha property
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.threeD-container').appendChild(renderer.domElement);

  const numShapes = 100;
  for (let i = 0; i < numShapes; i++) {
    const geometry = randomGeometry();
    const material = new THREE.MeshPhongMaterial({ color: randomColor() });
    const shape = new THREE.Mesh(geometry, material);

    shape.position.x = (Math.random() - 0.5) * 30;
    shape.position.y = (Math.random() - 0.5) * 30;
    shape.position.z = (Math.random() - 0.5) * 30;

    shape.rotation.x = Math.random() * Math.PI;
    shape.rotation.y = Math.random() * Math.PI;

    shape.scale.set(2, 2, 2);

    scene.add(shape);
  }

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  camera.position.z = 50;
}

function animate() {
  requestAnimationFrame(animate);

  scene.traverse((object) => {
    if (object.type === 'Mesh') {
      object.rotation.x += Math.random() * 0.01;
      object.rotation.y += Math.random() * 0.01;
    }
  });

  renderer.render(scene, camera);
}

init();
animate();
