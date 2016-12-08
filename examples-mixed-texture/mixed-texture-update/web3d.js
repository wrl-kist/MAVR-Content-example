
function initEnvironment() {
	MAVR.Config.camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 20000 );
	
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );	
	
	MAVR.Config.renderer = new MAVR.MixedRenderer( MAVR.Config.camera );
	
	MAVR.Config.camera.position.z = 3;
}

function init() {
	initEnvironment();
	
	initUI();
	
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	var domElement = document.getElementById('annotation1');
	
	var opts = {
		elementW: domElement.offsetWidth,
		elementH: domElement.offsetHeight,
		planeW: domElement.offsetWidth,
		planeH: domElement.offsetHeight,
		transform :{
			position: {x: 0.5, y: 0, z: 0},
			rotation: {x: 0, y: 0, z: 0 },
			scale: { x: 0.02, y: 0.02, z: 0.02 }
		},
		useTexture: true,
		animation : [{ transform: "rotation", axis: "y", to: 6.28, repeat: "Infinity", duration: 10000 } ]
	};
	
	(function () {
		// create the plane
		var virtualObject = new MAVR.HTMLVRObject( domElement, opts );
		var element = new MAVR.HTMLElement();
		
		element.createHTML2Texture(domElement, function( texture ) {
			virtualObject.updateTexture(texture, true);
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

function initUI() {
	var domElement = document.getElementById('annotation1');
	
	domElement.addEventListener("click", function() {
		var numElement = document.getElementById('number');
		
		console.log(numElement.innerHTML);
		
		numElement.innerHTML = parseInt(numElement.innerHTML) + 1;
	});
}

function animate() {
	//setTimeout( function() {
		requestAnimationFrame( animate );
		
		MAVR.Config.controls.update();
		
		MAVR.Config.renderer.update();
	//}, 1000 / 30 );	
}