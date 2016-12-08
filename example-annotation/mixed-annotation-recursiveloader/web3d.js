var annotationJSONs = ["panorama-annotation.json"];

function init() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	MAVR.Config.camera.position.z = 500;
	
	MAVR.Config.renderer = new MAVR.MixedRenderer( MAVR.Config.camera );
	
	MAVR.Config.controls = new THREE.OrbitControls( MAVR.Config.camera, MAVR.Config.renderer.getWebGLRenderer().domElement );	
	MAVR.Config.controls.enableZoom = false;
	//MAVR.Config.controls.autoRotate = true;
	
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	var axes = new THREE.AxisHelper(1000);
	glScene.add(axes);
	
	var light = new THREE.PointLight( 0xffffff, 1, 0 );
	light.position.set( 10, 10, -10 );
	glScene.add( light );
	
	var light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
	glScene.add( light2 );	
	
	MAVR.SceneGraph.show();
	
	loadAnnotation();
}

function loadAnnotation() {
	var loader = new MAVR.AnnotationLoader();
	
	loader.loadAnnotations(annotationJSONs, function() {
		var annotations = loader.getAnnotations();
		
		for( var i = 0 ; i < annotations.length ; i++) {
			var annotation = annotations[i].annotation;
			var targetThing = annotations[i].target;

			MAVR.SceneGraph.addAnnotationNodes(targetThing, annotation);
			MAVR.SceneGraph.drawAnnotation( annotation );
		}
	});
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}