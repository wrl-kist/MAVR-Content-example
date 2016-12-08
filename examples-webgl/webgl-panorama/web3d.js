var glScene, glRenderer;

function initEnvironment() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	MAVR.Config.camera.position.z = 500;
	
	glRenderer = new THREE.WebGLRenderer();
	glRenderer.setPixelRatio( window.devicePixelRatio );
	glRenderer.setSize( window.innerWidth, window.innerHeight );
	var container = document.getElementById( 'container' );
	container.appendChild( glRenderer.domElement );
  
	MAVR.Config.controls = new THREE.OrbitControls( MAVR.Config.camera, glRenderer.domElement );
	MAVR.Config.controls.enableZoom = false;
	MAVR.Config.controls.autoRotate = true;
	
	glScene = new THREE.Scene();	
}

function init() {
	initEnvironment();
	
	initObject();
}

function initObject() {
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
	
	glRenderer.render( glScene, MAVR.Config.camera );
}