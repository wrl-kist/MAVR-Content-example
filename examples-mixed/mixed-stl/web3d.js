
function initEnvironment() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
	MAVR.Config.camera.position.set( -33.788646984529954, 66.33917119408734, -66.33098362123899 );
  
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );
	
	MAVR.Config.renderer = new MAVR.MixedRenderer(MAVR.Config.camera);	
}

function init() {
	initEnvironment();
	
	initObject();
}

function initObject() {
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	//light
	glScene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

	addShadowedLight( 0.5, 1, -1, 0xffff99, 1 );
		
	var loader = new THREE.STLLoader();
	loader.load( '../../images/engine.stl', function ( geometry ) {
		var meshMaterial = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
		
		if (geometry.hasColors) {
			meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
		}
		
		var transform = { position: { x: 0.5, y: 0.2, z: 0}, 
				rotation: { x: -Math.PI / 2, y: Math.PI / 2, z: 0}, 
				scale: { x: 0.3, y: 0.3, z: 0.3} };
		
		var params = {geometry:geometry, material:meshMaterial, transform: transform};

		var virtualObject = new MAVR.WebGLVRObject();
		virtualObject.createObject(params);
		
		MAVR.Config.renderer.getWebGLScene().add(virtualObject.getWebGLElement());		
	} );

	var axes = new THREE.AxisHelper(1000);
	glScene.add(axes);
}

function addShadowedLight( x, y, z, color, intensity ) {
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	var directionalLight = new THREE.DirectionalLight( color, intensity );
	directionalLight.position.set( x, y, z );
	glScene.add( directionalLight );

	directionalLight.castShadow = true;

	var d = 1;
	directionalLight.shadowCameraLeft = -d;
	directionalLight.shadowCameraRight = d;
	directionalLight.shadowCameraTop = d;
	directionalLight.shadowCameraBottom = -d;

	directionalLight.shadowCameraNear = 1;
	directionalLight.shadowCameraFar = 4;

	directionalLight.shadowMapWidth = 1024;
	directionalLight.shadowMapHeight = 1024;

	directionalLight.shadowBias = -0.005;
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}