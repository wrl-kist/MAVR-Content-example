function initEnvironment() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	MAVR.Config.camera.position.z = 500;
	
	MAVR.Config.renderer = new MAVR.MixedRenderer(MAVR.Config.camera);
	
	MAVR.Config.controls = new THREE.OrbitControls(MAVR.Config.camera, MAVR.Config.renderer.domElement);	
	MAVR.Config.controls.enableZoom = false;
	MAVR.Config.controls.autoRotate = true;
}

function init() {
	initEnvironment();
	
	initObject();
}

function initObject() {
	var glScene = MAVR.Config.renderer.getWebGLScene();
	var geometry = new THREE.SphereGeometry( 500, 60, 40 );
	var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( '../../images/sphere-panorama.jpg')} );
	
	var params = {geometry:geometry, material:material, transform: {scale: {x:-1, y:1, z:1}}};
	var virtualObject = new MAVR.WebGLVRObject();
	virtualObject.createObject(params);
	glScene.add(virtualObject.getWebGLElement());
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}