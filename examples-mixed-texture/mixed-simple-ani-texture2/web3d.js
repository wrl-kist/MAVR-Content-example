function initEnvironment() {
	MAVR.Config.camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 20000 );
	
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );	
	
	MAVR.Config.renderer = new MAVR.MixedRenderer( MAVR.Config.camera );
	
	MAVR.Config.camera.position.z = 3;
}

function init() {
	initEnvironment();
	
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	var domElement = document.getElementById('threejs');
	
	var opts = {
		elementW: domElement.offsetWidth,
		elementH: domElement.offsetHeight,
		planeW: domElement.offsetWidth,
		planeH: domElement.offsetHeight,
		transform :{
			position: {x: 0, y: 1, z: 0},
			rotation: {x: 0, y: 0, z: 0 },
			scale: { x: 0.005, y: 0.005, z: 0.005 }
		},
		useTexture: true,
		animation : [{ transform: "rotation", axis: "y", to: 6.28, repeat: "Infinity", duration: 10000 } ]
	};
	
	(function () {
		var virtualObject = new MAVR.HTMLVRObject( domElement, opts );
		var element = new MAVR.HTMLElement();
		
		element.createHTML2Texture(domElement, function( texture ) {
			virtualObject.updateTexture(texture);
			glScene.add(virtualObject.getWebGLElement());			
		});	
	})();
	
	//////////////////////////////////////////////////////////////////////////////////
	//		add objects in the scene					//
	//////////////////////////////////////////////////////////////////////////////////
	var geometry	= new THREE.TorusKnotGeometry(0.5-0.125, 0.125);
	var material	= new THREE.MeshNormalMaterial();
	
	var paramsR = {geometry:geometry, material:material, transform: { position: { x: 1, y: 0, z: 0.5} }, 
			animation : [{transform: "rotation", axis: "y", to: 6.28, repeat: "Infinity", duration: 10000 }]};
	var virtualObjectR = new MAVR.WebGLVRObject();
	virtualObjectR.createObject(paramsR);
	glScene.add(virtualObjectR.getWebGLElement());
	
	var paramsL = {geometry:geometry, material:material, transform: { position: { x: -1, y: 0, z: -0.5} },
			animation : [{transform: "rotation", axis: "y", to: -6.28, repeat: "Infinity", duration: 10000 }]};
	var virtualObjectL = new MAVR.WebGLVRObject();
	virtualObjectL.createObject(paramsL);
	glScene.add(virtualObjectL.getWebGLElement());
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}