
function initEnvironment() {
	MAVR.Config.camera = new THREE.PerspectiveCamera(40, 1, 10, 5000);
	MAVR.Config.camera.position.set(0, 0, 1000);
	MAVR.Config.camera.up = new THREE.Vector3(0, 1, 0);

	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );

	MAVR.Config.renderer = new MAVR.MixedStereoRenderer( MAVR.Config.camera );
}

function init() {
	initEnvironment();

	initX3D();

	initGuideLine();

	initAnnotation();
}

function initX3D() {
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	for( var i = 0 ; i < objects.length ; i++ ) {
		var virtualObject = new MAVR.WebGLVRObject();
		virtualObject.createObject(objects[i]);
		glScene.add(virtualObject.getWebGLElement());
	}
}

function initGuideLine() {
	var glScene = MAVR.Config.renderer.getWebGLScene();

	for( var i = 0 ; i < planetGuidelines.length ; i++ ) {
		var virtualObject = new MAVR.WebGLVRObject();
		virtualObject.createObject(planetGuidelines[i]);
		glScene.add(virtualObject.getWebGLElement());		
	}
}

function initAnnotation() {
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	for( var j = 0 ; j < planetAnnotations.length ; j++ ) {
		var domElement = $('#' + planetAnnotations[j].id)[0];
		var opts = {
			transform :planetAnnotations[j].transform,
			elementW: domElement.clientWidth,
			planeW: domElement.clientWidth,
			planeH: domElement.clientHeight
		};
		
		var virtualObject = new MAVR.HTMLVRObject( domElement, opts );
	
		glScene.add(virtualObject.getWebGLElement());
		
		$('#' + planetAnnotations[j].id).css("display", "none");
	}
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}