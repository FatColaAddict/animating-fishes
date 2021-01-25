const SIZE = 1000;

function animateFish(){
	let spritedata;
	let spritesheet = new Image();
	spritedata = JSON.parse(blue_fish_frames);
	spritesheet.src = "animales2.png";
	
	let canvas = document.getElementById("myCanvas");
	canvas.width = SIZE;
	canvas.height = SIZE;
	let ctx = canvas.getContext("2d");
	
	let frame = 0;
	let maxframes = 2;
	
	let all_the_fishes = [];
	let ex_x = SIZE;
	function Fish(img_x, img_y, img_w, img_h, x, y){
		this.img_x = img_x;
		this.img_y = img_y;
		this.img_w = img_w;
		this.img_h = img_h;
		this.x = x;
		this.y = y;
	}

	Fish.prototype.update = function(){
		let speed = 0.2 + Math.random() * 3;
		let new_x = this.x + speed;
		if(ex_x < new_x){
			new_x = ex_x - 5;
		}
		if(new_x < -40){
			new_x = SIZE + 100;
		}
		ctx.drawImage(spritesheet, this.img_x, this.img_y, this.img_w, this.img_h, new_x, this.y, 100, 100);
		ex_x = new_x;
	};

	function setupFish(){
		let fishes = [];
		let X = Math.round(SIZE + 100);
		let randomY = Math.round(Math.random() * SIZE);
		
		let frames = spritedata[0].frames;
		for(let i=0; i < frames.length; i++){
			let pos = frames[i].position;
			let fish = new Fish(pos.x, pos.y, pos.w, pos.h, X, randomY);
			fishes.push(fish);
		}
		
		all_the_fishes.push(fishes);
		drawAndUpdate();
	}

	for(let i=0; i < 3; i++){	
		setupFish();
	}

	function drawAndUpdate(){
		ctx.clearRect(0, 0, SIZE, SIZE);
		
		for(let fish of all_the_fishes){
			myFish = fish[frame];
			myFish.update();
			updateFrame();
		}	
	}
	
	var intervalId = window.setInterval(function(){
    drawAndUpdate();
	}, 100);
	
	function updateFrame(){
    if(frame >= maxframes){
		frame = 0;
    }
    else{
		frame = Math.floor(Math.random() * Math.floor(maxframes));
    }
  }
}