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
let Text = PIXI.Text;
let BitmapText = PIXI.extras.BitmapText;
let Container = PIXI.Container;
let ParticleContainer = PIXI.ParticleContainer;

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
let line;

loader
	.add("fonts/puzzler.ttf")
	.add("fonts/disko.xml")
	.add("images/animals.json")
	.load(setupContainer)

// Ajout de la font:
	linkFont("fonts/puzzler.otf");

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
	// circle.position.set(256, 112);
	// stage.addChild(circle);
	// Ajout d'un antialiasing
	let circleTexture = circle.generateTexture();
	let circleSprite = new Sprite(circleTexture);
	circleSprite.position.set(212, 64);
	stage.addChild(circleSprite);

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

function setupWithOneContext() {

	let ctx = new Graphics();

	// Un rectangle dans le context
	ctx.beginFill(0x0033CC);
	ctx.lineStyle(4, 0xFF0000, 1);
	ctx.drawRect(32, 32, 96, 96);
	ctx.endFill();

	// Un cercle toujours dans le même contexte
	ctx.beginFill(0xFF9933);
	ctx.lineStyle(0);
	ctx.drawCircle(224, 80, 48);
	ctx.endFill();

	// Une ligne maintenant
	ctx.lineStyle(4, 0xFFFFFF, 1);
	ctx.moveTo(320, 48);
	ctx.lineTo(420, 112);

	stage.addChild(ctx);

	gameLoop();
}

function setupText() {	

	let message = new Text(
		"Hello World ! Bacon ipsuem dorlor sit amert et very appreciate vrom the very finest set of connaisseurs of the world of the doom of the of of the very best !",
		{font: "12px Impact", fill: "red", wordWrap: true, wordWrapWidth: 100}
	);

	let messageBitmap = new BitmapText(
		"Hello World BIS !", 
		{font: "48px disko"}
	);

	message.position.set(renderer.view.width / 2 - message.width / 2, renderer.view.height / 2 - message.height / 2);
	messageBitmap.position.set(message.x - 150, message.y + 150);
	// message.style = ({wordWrap: true, wordWrapWidth: 100});

	stage.addChild(message);
	stage.addChild(messageBitmap);

	gameLoop();
}


function setupAnimation() {
	line = new Graphics();
	stage.addChild(line);

	line.angleA = 0;
	line.angleB = 0;

	gameLoop();
}

function setupContainer() {
	let cat, hedgehog, tiger;
	let animals;
	let id = loader.resources["images/animals.json"].textures;

	// The cat
	cat = new Sprite(id["cat.png"]);
	cat.position.set(0,0);

	// The hedgehog
	hedgehog = new Sprite(id["hedgehog.png"]);
	hedgehog.position.set(32, 32);

	// The tiger
	tiger = new Sprite(id["tiger.png"]);
	tiger.position.set(64, 64);

	// Création du container
	animals = new Container();

	animals.addChild(cat);
	animals.addChild(hedgehog);
	animals.addChild(tiger);

	animals.width = 250;
	animals.height = 250;

	animals.position.set(96, 96);

	console.log("TIGER LOCAL POSITION: ", tiger.position);
	console.log("TIGER GLOBAL POSITION: ", animals.toGlobal(tiger.position).x, ":", animals.toGlobal(tiger.position).y);
	console.log("CAT GLOBAL POSITION: ", cat.getGlobalPosition().x, ":", cat.getGlobalPosition().y);
	console.log("Distance between Cat and Hedgehog: ", cat.toLocal(cat.position, hedgehog).x, ":", cat.toLocal(cat.position, hedgehog).y)

	stage.addChild(animals);

	// Utilisation d'un ParticleContainer
	// let superFastSprites = new ParticleContainer();

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

	// Play Animation
	// line.angleA += 0.02;
	// let rotatingA = rotateAroundPoint(64, 64, 20, 20, line.angleA);

	// line.angleB -= 0.03;
	// let rotatingB = rotateAroundPoint(192, 208, 20, 20, line.angleB);

	// line.clear();

	// line.lineStyle(4, 0xFFFFFF, 1);
	// line.moveTo(rotatingA.x, rotatingA.y);
	// line.lineTo(rotatingB.x, rotatingB.y);

	// Play Text
	

}

function rotateAroundPoint(pointX, pointY, distanceX, distanceY, angle) {
	let point = {};
	point.x = pointX + Math.cos(angle) * distanceX;
	point.y = pointY + Math.sin(angle) * distanceY;
	return point;
}

function linkFont(source) {

	//Use the font's filename as the `fontFamily` name. This code captures
	//the font file's name without the extension or file path
	let fontFamily = source.split("/").pop().split(".")[0];

	//Append an `@afont-face` style rule to the head of the HTML document
	let newStyle = document.createElement("style");
	let fontFace = "@font-face {font-family: '" + fontFamily + "'; src: url('" + source + "');}";
	newStyle.appendChild(document.createTextNode(fontFace));
	document.head.appendChild(newStyle);
}