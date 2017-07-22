// Declaration des alias
let TextureCache = PIXI.utils.TextureCache;
let autoDetectRenderer = PIXI.autoDetectRenderer;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let Sprite = PIXI.Sprite;
let Rectangle = PIXI.Rectangle;
let Texture = PIXI.Texture;

PIXI.scaleModes.DEFAULT = PIXI.SCALE_MODES_NEAREST;

// Create a renderer
// let renderer = autoDetectRenderer(512, 512, {
// 	antialias: false, transparent: false, resolution: 1
// });
let renderer = autoDetectRenderer();
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
		"images/treasure.png",
		"images/tileset.png",
		"images/tilesetCustom.json"])
	.on("progress", loadProgressHandler)
	.load(setupCompleteDungeon);

/*
 * Cette fonction sera appelée après que PIXI.loader ai chargé l'image
 */
function setup() {
	let spriteExplorer = new Sprite(TextureCache["images/explorer.png"]);
	let spriteBlob = new Sprite(TextureCache["images/blob.png"]);
	let spriteDoor = new Sprite(TextureCache["images/door.png"]);
	let spriteTreasure = new Sprite(TextureCache["images/treasure.png"]);

	// Set sprite position
	spriteExplorer.x = 96;
	spriteExplorer.y = 128;
	spriteTreasure.anchor.x = 0.5;
	spriteTreasure.anchor.y = 0.5;
	spriteExplorer.rotation = 0.5;

	spriteBlob.position.set(235, 52);
	spriteBlob.width = 80;
	spriteBlob.height = 120;
	spriteBlob.anchor.set(0.5, 0.5);
	spriteBlob.rotation = getRadiansFromDegrees(45);

	spriteDoor.position.set(125, 200);
	spriteDoor.scale.x = 0.5;
	spriteDoor.scale.y = 0.5;
	spriteDoor.pivot.set(spriteDoor.width / 2, spriteDoor.height / 2);
	spriteDoor.rotation = getRadiansFromDegrees(90);

	spriteTreasure.position.set(352, 110);
	spriteTreasure.scale.set(2, 2);

	stage.addChild(spriteExplorer);
	stage.addChild(spriteBlob);
	stage.addChild(spriteDoor);
	stage.addChild(spriteTreasure);

	// Make sprites disappear
	// spriteTreasure.visible = false;

	// Tell the renderer to render the stage
	renderer.render(stage);
}

function setupWithTileset() {
	// Creation du tileset
	// let texture = TextureCache["images/tileset.png"];

	// Le rectangle qui ciblera l'image à extraire du tileset
	// let rectangle = new PIXI.Rectangle(160, 256, 32, 32);

	// On utilise ce rectangle sur le tileset
	// texture.frame = rectangle;

	// On crée le sprite à partir du rectangle
	// let adventuress = new Sprite(frame("images/tileset.png", 160, 256, 32, 32));
	
	// Utilisation d'un tileset JSON
	let id = loader.resources["images/tilesetCustom.json"].textures;
	let spriteExplorer = new Sprite(id["explorer.png"]);
	

	// On positionne / scale
	// adventuress.position.set(64, 64);
	// adventuress.scale.set(3, 3);
	spriteExplorer.position.set(64, 64);
	spriteExplorer.scale.set(3, 3);

	// Add et render le stage
	// stage.addChild(adventuress);
	stage.addChild(spriteExplorer);
	renderer.render(stage);
}

let dungeon, explorer, treasure, door;

function setupCompleteDungeon() {
	// On charge les sprites dans le stage
	let textureDungeon = TextureCache["dungeon.png"];
	dungeon = new Sprite(textureDungeon);
	stage.addChild(dungeon);

	// On peut le faire d'une autre manière
	let id = loader.resources["images/tilesetCustom.json"].textures;
	explorer = new Sprite(id["explorer.png"]);

	// On positionne les sprites
	explorer.x = 68;
	explorer.y = stage.height / 2 - explorer.height / 2;
	stage.addChild(explorer);

	// Un autre sprite a charger
	treasure = new Sprite(id["treasure.png"]);
	stage.addChild(treasure);
	treasure.x = stage.width - treasure.width - 48;
	treasure.y = stage.height / 2 - treasure.height / 2;

	// Et maintenant la porte
	door = new Sprite(id["door.png"]);
	door.position.set(32, 0);
	stage.addChild(door);

	// On rajoute des blobs !
	let numberOfBlobs =  6,
		spacing = 48,
		xOffset = 150;

	for(let i = 0; i < numberOfBlobs; i++) {
		let blob = new Sprite(id["blob.png"]);
		let x = spacing * i + xOffset;
		let y = randomInt(0, stage.height - blob.height);

		blob.x = x;
		blob.y = y;

		stage.addChild(blob);
	}


	renderer.render(stage);
}


function frame(source, x, y, width, height) {
	let texture, imageFrame;

	// Si la source est un string, c'est une texture dans le cache
	//  ou bien un fichier image
	if(typeof source === "string") {
		if(TextureCache[source]) {
			texture = new Texture(TextureCache[source]);
		}
	} else if(source instanceof Texture) {
		texture = new Texture(source);
	}

	if(!texture) {
		console.log("Please load the " + source + " texture into the cache");
	} else {
		// On fait un rectangle 
		imageFrame = new Rectangle(x, y, width, height);
		texture.frame = imageFrame;

		// On évite le texture bleeding
		texture.baseTexture.scaleMode = PIXI.SCALE_MODES_NEAREST;

		return texture;
	}
}

function loadProgressHandler(loader, resource) {
	console.log("Loading: " + resource.url);

	console.log("Progress: " + loader.progress);
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


