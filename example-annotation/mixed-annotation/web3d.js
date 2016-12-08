
function init() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, 1, 0.1, 2000 );	// default
	MAVR.Config.camera.position.z=-20;
	
	MAVR.Config.renderer = new MAVR.MixedRenderer( MAVR.Config.camera );
	
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );
	
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	var axes = new THREE.AxisHelper(1000);
	glScene.add(axes);
	
	var annotationURL = "http://kistvr.webizing.org/Annotations/56fbcbb07b3b5673ac3090f3";
	
	var annotation = new MAVR.Annotation();
	annotation.loadURL(annotationURL, function() {
		annotation.showAnnotations();
		
		MAVR.SceneGraph.drawAnnotation( annotation);
	});
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}