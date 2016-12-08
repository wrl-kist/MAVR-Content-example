
function initEnvironment() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
	MAVR.Config.camera.position.set( 670.5311180133696, 123.10212900508493, 622.6322916978304 );
  
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );
	
	MAVR.Config.renderer = new MAVR.MixedRenderer( MAVR.Config.camera );	
}

function init() {
	initEnvironment();
	
	initObject();
	
	initAnnotation();
}

function initObject() {
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	//light
	var dirLight = new THREE.DirectionalLight( 0xffffff );
	dirLight.position.set( 200, 200, 1000 ).normalize();

	MAVR.Config.camera.add( dirLight );
	MAVR.Config.camera.add( dirLight.target );
	
	glScene.add( MAVR.Config.camera );
	
	var loader = new THREE.VRMLLoader();
	loader.load( "../../images/engine.wrl", function ( object ) {
		MAVR.Config.renderer.getWebGLScene().add(object);
	} );
	
	var axes = new THREE.AxisHelper(1000);
	glScene.add(axes);
}

function initAnnotation() {
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	for( var j = 0 ; j < planetAnnotations.length ; j++ ) {
		var domElement = $('#' + planetAnnotations[j].id)[0];
		
		if (domElement !== undefined) {
			var opts = {
					transform :planetAnnotations[j].transform,
					elementW: domElement.clientWidth,
					planeW: domElement.clientWidth,
					planeH: domElement.clientHeight
				};
				
				var virtualObject = new MAVR.HTMLVRObject( domElement, opts );
			
				glScene.add(virtualObject.getWebGLElement());
		}
	}
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}