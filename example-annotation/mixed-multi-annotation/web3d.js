var annotations = ["./panorama-annotation.json", "./target-annotation.json"];

function init() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	MAVR.Config.camera.position.z = 500;
	
	MAVR.Config.renderer = new MAVR.MixedRenderer( MAVR.Config.camera );
	
	MAVR.Config.controls = new THREE.OrbitControls( MAVR.Config.camera, MAVR.Config.renderer.getWebGLRenderer().domElement );	
	MAVR.Config.controls.enableZoom = false;
	MAVR.Config.controls.autoRotate = true;
	
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	var axes = new THREE.AxisHelper(1000);
	glScene.add(axes);
	
	var light = new THREE.PointLight( 0xffffff, 1, 0 );
	light.position.set( 10, 10, -10 );
	glScene.add( light );
	
	var light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
	glScene.add( light2 );	
	
	MAVR.SceneGraph.show();

	loadAnnotation(0);
}

function loadAnnotation(idx) {
	$.getJSON( annotations[idx], function( data ) {
		var annotation = new MAVR.Annotation();
		annotation.loadAnnotation(data, function() {
			var targetURL = annotation.getTargetURL();
			var targetThing = getTargetNodeID(targetURL);
			
			MAVR.SceneGraph.addAnnotationNodes(targetThing, annotation);
			MAVR.SceneGraph.drawAnnotation( annotation );
			
			idx++;
			if( idx !== annotations.length ) {
				loadAnnotation(idx);
			}
		});
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