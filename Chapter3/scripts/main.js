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
