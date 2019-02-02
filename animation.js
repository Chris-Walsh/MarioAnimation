var dir = 1,
posX = 0,
posY = 0,
moving = false;
(function() {
	
	window.addEventListener('keydown', moveSelection);
	function moveSelection(evt) {
        switch (evt.keyCode) {
			case 37:
				moving = true;
                leftArrowPressed();
                break;
			case 39:
				moving = true;
                rightArrowPressed();
                break;
			case 38:
				moving = true;
                upArrowPressed();
                break;
			case 40:
				moving = true;
                downArrowPressed();
                break;
        }
	};
	window.addEventListener('keyup', stop);
		function stop(evt) {
			moving = false;
		};
	function leftArrowPressed() {
        dir = -1;
        posX -= 3;
    }

    function rightArrowPressed() {
        dir = 1;
        posX += 3;
    }

    function upArrowPressed() {
        posY -= 3;
    }

    function downArrowPressed() {
        posY += 3;
    }

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {
			
	var mario,
		marioImage,
		canvas,
		background;					

	function gameLoop () {
	
		window.requestAnimationFrame(gameLoop);
		mario.update();
		mario.render();
	}
	
	function sprite (options) {
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.update = function () {
			if (moving) {
				tickCount += 1;

				if (tickCount > ticksPerFrame) {
					tickCount = 0;

					if (frameIndex < numberOfFrames - 1) frameIndex += 1;
					else frameIndex = 0;
				}
			} else {
				frameIndex = 0;
			}
        };
		
		that.render = function () {

			that.context.drawImage(background,0,0);
			if (dir === -1) {
				that.context.save();
				that.context.translate(16,0);
				that.context.scale(-4, 4);
				that.context.translate(-40, 0);
				that.context.drawImage(that.image,
										frameIndex * that.width / numberOfFrames,
										0, that.width / numberOfFrames,
										that.height, -posX, posY,
										that.width / numberOfFrames, that.height);
				that.context.restore();
			} else {
				that.context.save();
				that.context.scale(4, 4);
				that.context.drawImage(that.image,
					frameIndex * that.width / numberOfFrames,
					0, that.width / numberOfFrames,
					that.height, posX, posY,
					that.width / numberOfFrames, that.height);
				that.context.restore();
			}
		};
		
		return that;
	}
	
	canvas = document.getElementById("marioAnimation");
	canvas.width = 1024;
	canvas.height = 432;

	marioImage = new Image();
	background = new Image();
	
	mario = sprite({
		context: canvas.getContext("2d"),
		width: 120,
		height: 28,
		image: marioImage,
		numberOfFrames: 3,
		ticksPerFrame: 6
	});
	
	marioImage.addEventListener("load", gameLoop);
	marioImage.src = "characters/mario.png";
	background.src = "Enviroment/background.png";
} ());


