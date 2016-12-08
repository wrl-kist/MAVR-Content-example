var glScene, glRenderer;

function initEnvironment() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
	MAVR.Config.camera.position.z = 6;
  
	glRenderer = new THREE.WebGLRenderer();
	glRenderer.setClearColor( 0x000000 );
	glRenderer.setPixelRatio( window.devicePixelRatio );
	glRenderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( glRenderer.domElement );
	
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );
  
	glScene = new THREE.Scene();	
}

function init() {
	initEnvironment();
	
	initObject();
}

function initObject() {
	var dirLight = new THREE.DirectionalLight( 0xffffff );
	dirLight.position.set( 200, 200, 1000 ).normalize();

	MAVR.Config.camera.add( dirLight );
	MAVR.Config.camera.add( dirLight.target );
	
	glScene.add(MAVR.Config.camera);

	var loader = new THREE.VRMLLoader();
	loader.load( "../../images/engine.wrl", function ( object ) {
		glScene.add(object);
	} );
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	glRenderer.render( glScene, MAVR.Config.camera );
}