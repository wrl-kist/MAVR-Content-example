
function initEnvironment() {
	MAVR.Config.camera = new THREE.PerspectiveCamera( 60, 1, 0.1, 2000 );	// default
	MAVR.Config.camera.position.z=-20;
	
	MAVR.Config.renderer = new MAVR.MixedRenderer(MAVR.Config.camera);
	
	MAVR.Config.controls = new THREE.TrackballControls( MAVR.Config.camera );
}

function init() {
	initEnvironment();
	
	initObject();
}

function initObject() {
	var glScene = MAVR.Config.renderer.getWebGLScene();
	
	var axes = new THREE.AxisHelper(1000);
	glScene.add(axes);
	var userData = {};
	var domEle = new MAVR.HTMLElement();
	
	//////////////////////////////////////////////////////////
	
	domEle.createImageElement("i", "../../images/checkerboard.png", 100, 100);
	
	var domImage = $('#i')[0];
	var optImage = {
		transform :{position: {x:10, y:10, z:0}, scale: {x:0.02, y:0.02, z:0.02}}, 
		elementW: domImage.clientWidth, planeW: domImage.clientWidth, planeH: domImage.clientHeight
	};
	
	var virtualObjectImage = new MAVR.HTMLVRObject( domImage, optImage);	
	glScene.add(virtualObjectImage.getWebGLElement());
	
	//////////////////////////////////////////////////////////
	
	domEle.createVideoElement("v", "http://examples.x3dom.org/example/video/big_buck_bunny.mp4", 640, 356, "video/mp4");
	
	var domVideo = $('#v')[0];
	var optVideo = {
		transform :{position: {x:-5, y:3, z:0}, scale: {x:0.01, y:0.01, z:0.01}, rotation: {x:Math.PI/180*20, y:Math.PI, z:0}}, 
		elementW: domVideo.clientWidth, planeW: domVideo.clientWidth, planeH: domVideo.clientHeight
	};
	
	var virtualObjectVideo = new MAVR.HTMLVRObject( domVideo, optVideo, userData);
	virtualObjectVideo.update();
	glScene.add(virtualObjectVideo.getWebGLElement());
	
	//////////////////////////////////////////////////////////
	
	domEle.createAudioElement("a", "http://www.stephaniequinn.com/Music/Canon.mp3", 600, 100, "audio/mp3");
	
	var domAudio = $('#a')[0];
	var optAudio = {
		transform :{position: {x:-10, y:8, z:0}, scale: {x:0.01, y:0.01, z:0.01}, rotation: {x:0, y:Math.PI, z:0}}, 
		elementW: domAudio.clientWidth, planeW: domAudio.clientWidth, planeH: domAudio.clientHeight
	};
	
	var virtualObjectAudio = new MAVR.HTMLVRObject( domAudio, optAudio, userData);
	virtualObjectAudio.update();
	glScene.add(virtualObjectAudio.getWebGLElement());

	//////////////////////////////////////////////////////////
	
	var css = [{key:"color", value:"red"}, {key:"fontSize", value:"14px"}];
	domEle.createTextElement("t", "sample text", css);
	
	var domText = $('#t')[0];
	var optText = {
		transform :{position: {x:5, y:5, z:0}, scale: {x:0.05, y:0.05, z:0.05}, rotation: {x:0, y:Math.PI, z:0}}, 
		elementW: 100, planeW: 100, planeH: domText.clientHeight
	};
	
	var virtualObjectText = new MAVR.HTMLVRObject( domText, optText, userData);
	virtualObjectText.update();
	glScene.add(virtualObjectText.getWebGLElement());
	
	//////////////////////////////////////////////////////////	
	
	domEle.createiFrameElement("f", "http://www.w3schools.com/tags/tag_iframe.asp", 300, 300);
	
	var domiFrame = $('#f')[0];
	var optiFrame = {
		transform :{position: {x:5, y:-5, z:-1}, scale: {x:0.03, y:0.03, z:0.03}, rotation: {x:Math.PI/180*30, y:Math.PI, z:0}}, 
		elementW: domiFrame.clientWidth, planeW: domiFrame.clientWidth, planeH: domiFrame.clientHeight
	};
	
	var virtualObjectFrame = new MAVR.HTMLVRObject( domiFrame, optiFrame, userData);
	virtualObjectFrame.update();
	glScene.add(virtualObjectFrame.getWebGLElement());
	// 
	//////////////////////////////////////////////////////////
	
	var code = '<li class="toclevel-1 tocsection-1" style="background-color: white;"><a href="#Assisted_living_in_the_United_States"><span class="tocnumber">1</span> <span class="toctext">Assisted living in the United States</span></a><ul><li class="toclevel-2 tocsection-2"><a href="#Types"><span class="tocnumber">1.1</span> <span class="toctext">Types</span></a></li><li class="toclevel-2 tocsection-3"><a href="#Typical_resident"><span class="tocnumber">1.2</span> <span class="toctext">Typical resident</span></a></li><li class="toclevel-2 tocsection-4"><a href="#Special_needs"><span class="tocnumber">1.3</span> <span class="toctext">Special needs</span></a></li><li class="toclevel-2 tocsection-5"><a href="#Locked_units"><span class="tocnumber">1.4</span> <span class="toctext">Locked units</span></a></li></ul></li>';
	
	domEle.createCustomElement("h",code, 200, 200);
	
	var domCustom = $('#h')[0];
	var optCustom = {
		transform :{position: {x:-5, y:-5, z:-1}, scale: {x:0.03, y:0.03, z:0.03}, rotation: {x:Math.PI/180*30, y:Math.PI, z:0}}, 
		elementW: domCustom.clientWidth, planeW: domCustom.clientWidth, planeH: domCustom.clientHeight
	};
	
	var virtualObjectCustom = new MAVR.HTMLVRObject( domCustom, optCustom, userData);
	virtualObjectCustom.update();
	glScene.add(virtualObjectCustom.getWebGLElement());
}

function animate() {
	requestAnimationFrame( animate );

	MAVR.Config.controls.update();
	
	MAVR.Config.renderer.update();
}