
function init() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, 1, 0.1, 2000 );	// default
	MAVR.Config.camera.position.z=-20;
	
	MAVR.Config.renderer = new MAVR.MixedRenderer( MAVR.Config.camera );
	
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );
	
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
	var annotation = new MAVR.Annotation();
	annotation.loadAnnotation(annotationJSON, function() {
		var targetURL = annotation.getTargetURL();
		var targetThing = getTargetNodeID( targetURL );
		
		MAVR.SceneGraph.addAnnotationNodes( targetThing, annotation );
		MAVR.SceneGraph.drawAnnotation( annotation );
	});
}

function getTargetNodeID(target) {
	var targetThing = MAVR.Things.getThingUUID(target);
	
	if ( targetThing === null) {
		targetThing = MAVR.Things.generateUUID();
		MAVR.Things.setThing(targetThing, { id: targetThing, origin:target, type: "VirtualObject", name: "Annoatation", draw: false });
		
		var targetNode = MAVR.SceneGraph.getNode(targetThing);
		
		if( targetNode === false ) {
			MAVR.SceneGraph.createNode(null, MAVR.Things.getThing(targetThing));
		}		
}

return targetThing;
}


function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}