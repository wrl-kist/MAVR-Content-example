
function initEnvironment() {
	MAVR.Config.camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000 );
	
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );	
	
	MAVR.Config.renderer = new MAVR.MixedRenderer(MAVR.Config.camera);
	
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	MAVR.Config.camera.position.set(0,150,400);
	MAVR.Config.camera.lookAt(glScene.position);
}

function init() {
	initEnvironment();
	
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	////////////////////////////////////////////////////////////////////////////////
	
	var annotation = document.getElementById('overview');
	var opts = {elementW: annotation.offsetWidth, elementH: annotation.offsetHeight, planeW: annotation.offsetWidth, planeH: annotation.offsetHeight,
			useTexture: true, transform :{ position: { x: 0, y: 0, z: 0 } } };
	
	var virtualObject = new MAVR.WebGLVRObject();
	virtualObject.createObjectWithHTMLTexture(annotation, opts, null, function() {
		glScene.add(virtualObject.getWebGLElement());
		
		$(annotation).hide();		
	});
	
	////////////////////////////////////////////////////////////////////////////////
	
	var annotation1 = document.getElementById('annotation1');
	var opts1 = {elementW: annotation1.offsetWidth, elementH: annotation1.offsetHeight, planeW: annotation1.offsetWidth, planeH: annotation1.offsetHeight,
			useTexture: true, transform :{ position: { x: -150, y: 20, z: 0 } } };
	
	var virtualObject1 = new MAVR.WebGLVRObject();
	virtualObject1.createObjectWithHTMLTexture(annotation1, opts1, null, function() {
		glScene.add(virtualObject1.getWebGLElement());
		
		$(annotation1).hide();		
	});
	
	////////////////////////////////////////////////////////////////////////////////
	
	var annotation2 = document.getElementById('annotation2');
	var opts2 = {elementW: annotation2.offsetWidth, elementH: annotation2.offsetHeight, planeW: annotation2.offsetWidth, planeH: annotation2.offsetHeight,
			useTexture: true, transform :{ position: { x: 100, y: 50, z: 0 } } };
	
	var virtualObject2 = new MAVR.WebGLVRObject();
	virtualObject2.createObjectWithHTMLTexture(annotation2, opts2, null, function() {
		glScene.add(virtualObject2.getWebGLElement());
		
		$(annotation2).hide();		
	});
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}