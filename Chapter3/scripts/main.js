///////////////////////////
// Declaration des alias //
///////////////////////////
let TextureCache = PIXI.utils.TextureCache;
let autoDetectRenderer = PIXI.autoDetectRenderer;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let Sprite = PIXI.Sprite;
let Rectangle = PIXI.Rectangle;
let Texture = PIXI.Texture;
let Graphics = PIXI.Graphics;

////////////////////////
// Configuration PIXI //
////////////////////////
PIXI.scaleModes.DEFAULT = PIXI.SCALE_MODES_NEAREST;

//////////////////////////
// Paramétrage renderer //
//////////////////////////
// Create a renderer
let renderer = autoDetectRenderer(512, 512);
// Create a container object called 'stage'
let stage = new PIXI.Container();
// Add canvas to the HTML document
document.body.appendChild(renderer.view);
document.body.style.backgroundColor = "#2C3539";
// Style du renderer
renderer.view.style.border = "1px dashed black";
window.addEventListener("resize", event => {
	scaleToWindow(renderer.view);
})
let scale = scaleToWindow(renderer.view);


////////////////////////////
// Code métier /////////////
////////////////////////////
let state = play;

loader
	.add("fonts/puzzler.ttf")
	.load(setup)

function setup() {

	// Dessin d'un rounded rectangle
	let rectangle = new Graphics();
	rectangle.beginFill(0x0033CC);
	rectangle.lineStyle(4, 0xFF0000, 1);
	rectangle.drawRoundedRect(0, 0, 96, 96, 12);
	// rectangle.drawRect(0, 0, 96, 96);
	rectangle.endFill();
	rectangle.x = 64;
	rectangle.y = 64;
	rectangle.alpha = 0.5;
	stage.addChild(rectangle);

	// Dessin d'un cercle
	let circle = new Graphics();
	circle.beginFill(0xFF9933);
	circle.lineStyle(4, 0x006600, 1);
	circle.drawCircle(0, 0, 48);
	circle.endFill();
	circle.position.set(256, 112);
	stage.addChild(circle);

	// Dessin d'une elipse
	let elipse = new Graphics();
	elipse.beginFill(0xFFFF00);
	elipse.lineStyle(4, 0x00FF00, 1);
	elipse.drawEllipse(0, 0, 64, 32);
	elipse.endFill();
	elipse.position.set(416, 112);
	stage.addChild(elipse);

	// Dessin d'une ligne
	let line = new Graphics();
	line.lineStyle(4, 0xFFFFFF, 1);
	line.moveTo(0, 0);
	line.lineTo(100, 50);
	line.position.set(64, 212);
	stage.addChild(line);

	// Un triangle maintenant
	let triangle = new Graphics();
	triangle.beginFill(0xFF3300);
	triangle.lineStyle(4, 0x336699, 1);
	triangle.moveTo(0, 0);
	triangle.lineTo(-64, 64);
	triangle.lineTo(64, 64);
	triangle.lineTo(0, 0);
	triangle.endFill();
	triangle.position.set(320, 192); // La position représente le 1er point du triangle
	stage.addChild(triangle);

	// Une line courbe
	let quadLine = new Graphics();
	quadLine.lineStyle(4, 0xFFFFFF, 1);
	quadLine.moveTo(32, 128);
	quadLine.quadraticCurveTo(128, 20, 224, 128);
	quadLine.position.set(64, 192);
	stage.addChild(quadLine);

	// Une ligne de Bézier
	let bezierLine = new Graphics();
	bezierLine.lineStyle(4, 0xFFFFFF, 1);
	bezierLine.moveTo(32, 128);
	bezierLine.bezierCurveTo(32, 20, 224, 20, 224, 128);
	stage.addChild(bezierLine);

	// Un arc de cercle
	let partialCircle = new Graphics();
	partialCircle.lineStyle(4, 0xFFFFFF, 1);
	partialCircle.arc(64, 64, 64, 3.14, 5, false);
	partialCircle.position.set(64, 416);
	stage.addChild(partialCircle);

	gameLoop();
}



function gameLoop() {
	// Loop this function 60 times per second
	requestAnimationFrame(gameLoop);

	// Met à jour le state du jeu
	state();

	// On rafraichit le stage
	renderer.render(stage);
}

function play() {

}
