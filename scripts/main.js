// Declaration des alias
let TextureCache = PIXI.utils.TextureCache;
let autoDetectRenderer = PIXI.autoDetectRenderer;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let Sprite = PIXI.Sprite;

// Create a renderer
let renderer = autoDetectRenderer(512, 256, {
	antialias: false, transparent: false, resolution: 1
});
// Create a container object called 'stage'
let stage = new PIXI.Container();


// Add canvas to the HTML document
document.body.appendChild(renderer.view);

// Style du renderer
renderer.view.style.border = "1px dashed red";
// renderer.backgroundColor = 0xFFFFFF;
// renderer.view.style.position = "absolute";
// renderer.view.style.width = window.innerWidth + "px";
// renderer.view.style.height = window.innerHeight + "px";
// renderer.view.style.display = "block";

window.addEventListener("resize", event => {
	scaleToWindow(renderer.view);
})

let scale = scaleToWindow(renderer.view);

// Partie Texture
loader
	.add(["images/explorer.png",
		"images/blob.png",
		"images/door.png",
		"images/treasure.png"])
	.load(setup);

/*
 * Cette fonction sera appelée après que PIXI.loader ai chargé l'image
 */
function setup() {
	let spriteExplorer = new Sprite(TextureCache["images/explorer.png"]);
	let spriteBlob = new Sprite(TextureCache["images/blob.png"]);
	let spriteDoor = new Sprite(TextureCache["images/door.png"]);
	let spriteTreasure = new Sprite(TextureCache["images/treasure.png"]);

	stage.addChild(spriteExplorer);
	stage.addChild(spriteBlob);
	stage.addChild(spriteDoor);
	stage.addChild(spriteTreasure);

	// Make sprites disappear
	spriteTreasure.visible = false;

	// Tell the renderer to render the stage
	renderer.render(stage);
}




