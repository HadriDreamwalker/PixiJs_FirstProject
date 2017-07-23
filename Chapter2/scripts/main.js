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
let renderer = autoDetectRenderer();
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
// Chargement  Texture // //
////////////////////////////
loader
	.add(["images/tilesetCustom.json"])
	.on("progress", loadProgressHandler)
	.load(setupCompleteDungeon);


let dungeon, explorer, treasure, door;
let state = play;

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

	setKeyboard();
	setSprites();

	gameLoop();
}

function setSprites() {
	// Initialisation de la vélocité
	explorer.vx = 0;
	explorer.vy = 0;

	explorer.accelerationX = 0;
	explorer.accelerationY = 0;
	explorer.frictionX = 1;
	explorer.frictionY = 1;

	explorer.speed = 0.2;
	explorer.drag = 0.98;
}

function gameLoop() {
	// Loop this function 60 times per second
	requestAnimationFrame(gameLoop);

	// Setting de la vélocité
	// explorer.vx = 1;
	// explorer.vy = 1;

	// // On fait avant l'explorer de 1 vers la droite
	// explorer.x += explorer.vx;
	// explorer.y += explorer.vy;
	

	// Met à jour le state du jeu
	state();


	// On rafraichit le stage
	renderer.render(stage);
}

function play() {
	// Setting de la vélocité
	// explorer.vx = 1;
	// explorer.vy = 1;

	// On fait avant l'explorer de 1 vers la droite
	// explorer.x += explorer.vx;
	// explorer.y += explorer.vy;
	
	// On applique la vélocité du sprite à sa position
	// explorer.x += explorer.vx;
	// explorer.y += explorer.vy;
	
	// On applique l'acceleration et la friction au sprite
	explorer.vx += explorer.accelerationX;
	explorer.vy += explorer.accelerationY;

	explorer.vx *= explorer.frictionX;
	explorer.vy *= explorer.frictionY;

	// On applique la vélocité à la position pour le faire bouger
	explorer.x += explorer.vx;
	explorer.y += explorer.vy;

}

function setKeyboard() {
	let left = keyboard(37);
	let right = keyboard(39);
	let up = keyboard(38);
	let down = keyboard(40);

	left.press = () => {
		// explorer.vx = -5;
		// explorer.vy = 0;
		explorer.accelerationX = -explorer.speed;
		explorer.frictionX = 1;
	};
	left.release = () => {
		//If the left arrow has been released, and the right arrow isn't down,
		//and the pixie isn't moving vertically, stop the sprite from moving
		//by setting its velocity to zero
		// if (!right.isDown && explorer.vy === 0) {
		// 	explorer.vx = 0;
		// }
		if(!right.isDown) {
			explorer.accelerationX = 0;
			explorer.frictionX = explorer.drag;
		}

	};

	up.press = () => {
		// explorer.vy = -5;
		// explorer.vx = 0;
		explorer.accelerationY = -explorer.speed;
		explorer.frictionY = 1;
	};
	up.release = () => {
		// if(!down.isDown && explorer.vx === 0) {
		// 	explorer.vy = 0;
		// }
		if(!down.isDown) {
			explorer.accelerationY = 0;
			explorer.frictionY = explorer.drag;
		}
	};

	right.press = () => {
		// explorer.vx = 5;
		// explorer.vy = 0;
		explorer.accelerationX = explorer.speed;
		explorer.frictionX = 1;
	};
	right.release = () => {
		// if(!left.isDown && explorer.vy === 0) {
		// 	explorer.vx = 0;
		// }
		if(!left.isDown) {
			explorer.accelerationX = 0;
			explorer.frictionX = explorer.drag;
		}
	};

	down.press = () => {
		// explorer.vy = 5;
		// explorer.vx = 0;
		explorer.accelerationY = explorer.speed;
		explorer.frictionY = 1;
	};
	down.release = () => {
		// if(!up.isDown && explorer.vx === 0) {
		// 	explorer.vy = 0;
		// }
		if(!up.isDown) {
			explorer.accelerationY = 0;
			explorer.frictionY = explorer.drag;
		}
	};


}




///////////////////////////
// Fonctions Utilitaires //
///////////////////////////

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


