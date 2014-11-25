// JavaScript Document

var enemy_counter=0;
parent = document.getElementById("track");
var enemy_array = [];
var bullet_array = [];
var main_loopid;
var score=0;

var background;
var car;

start(); //starts the game


function start()
{
	
	background = new Background();
	/*before_background=new BeforeBack();*/
	car =  new MainCar();
	var snd = new Audio("sound/sound.mp3"); // buffers automatically when created
	snd.play();
	car.reset_car();/*restart the game*/
	main_loopid = setInterval(GameLoop,30);
}

function GameLoop()
{
	createEnemy();
	updateEnemy();
	updateBullets();
	checkForCollision();
	background.updateBackground();
	enemy_counter++;
}

function MainCar()
{
	var that = this;
		this.y = 450;
		this.x = 150;
		this.car_dx = 0;
		this.main_car = document.getElementById("My-car");
		
		this.reset_car = function(){
			that.main_car.style.top = that.y+"px";
			that.main_car.style.left = that.x+"px";
		}
		this.update_car = function(e){
			var dx =0;
			if(e==1 && that.x<260)
				{
					dx=110;
				}
			else if (e==-1 && that.x>140)
				{
					dx=-110;
				}
			else
				{
					dx=0;
				}
			that.x = that.x + dx;
			that.main_car.style.left = that.x+"px";
		}
	
}
/*function BeforeBack()
{
	 var wrapper=document.createElement("div");	
	 wrapper.innerHTML="boooo";
	 wrapper.className="beforeback";
	 wrapper.style.position="absolute";
	 wrapper.style.width="100%";
	 parent.appendChild(wrapper);

}*/

function Background()
{
		var that = this;
		that.background_y = 0;
		that.background_dy = 7;
		that.updateBackground = function(){
			parent.style.backgroundPosition = "0px "+that.background_y+"px";
			that.background_y=that.background_y+ that.background_dy;
		}
}

function Enemy()
{
	this.x=0;
	this.y=-100;
	this.dy =7;
	this.health = 2;
	var that =this;
	this.elements = document.createElement('div');
	this.createEnemy = function(){
			that.elements.className = "opponents"; //style
			that.x=randomGenerator();
			that.elements.style.left = (that.x)+"px";
			that.elements.style.top = that.y+"px";
			parent.appendChild(that.elements);
			counter =0;
		}
	this.updateEnemy = function(){
		var t = that.y +that.dy;
		that.y = t;
		that.elements.style.top = that.y+"px";
		}
	this.deleteEnemy = function(){
				parent.removeChild(that.elements);
	}
	
}

function Bullet()
{
	var that = this;
	this.bullet_x =0;
	this.bullet_y =0;
	this.dy = 10;
	this.elements = document.createElement('div');
	
		this.createBullet = function(){
				that.elements.className = "bullets"; //style
				that.bullet_x = (car.x+45);
				that.bullet_y = car.y;
				that.elements.style.left = (that.bullet_x)+"px";	that.elements.style.top = that.bullet_y+"px";
				parent.appendChild(that.elements);
			}
		this.updateBullet = function(){
			var t = that.bullet_y - that.dy;
			that.bullet_y = t;
			that.elements.style.top = that.bullet_y+"px";
			}
		this.deleteBullet = function(){
					parent.removeChild(that.elements);
			}
}

//functions

function createEnemy()
{
	if(enemy_counter > 30)
	//if(Math.random()<0.1)
		{	
			var e = new Enemy();
			(enemy_array).push(e);
			e.createEnemy();
			enemy_counter =0;
		}
}
function updateEnemy()
{
	var enemies = enemy_array;
	for(var i=0;i<enemy_array.length;i++)
	{
		if(enemies[i]!=null)
		{
			enemies[i].updateEnemy();
			if(enemies[i].y>600)
				{
					enemies[i].deleteEnemy();
					enemies[i]=null;
					enemy_array = clearArray(enemies);
				}
		}
	}
}

function updateBullets()
	{
		var temp_bullets = bullet_array;
			for(var i=0;i<temp_bullets.length;i++)
			{
				if(temp_bullets[i]!=null)
				{
					temp_bullets[i].updateBullet();
					if(temp_bullets[i].bullet_y<0)
						{
							temp_bullets[i].deleteBullet();
							temp_bullets[i]=null;
						}
				}
			}
			bullet_array = clearArray(temp_bullets);
	}

function checkForCollision()
{
	var y = car.y;
	var x = car.x;
	var enemy_x;
	var enemy_y;
	var enemies = enemy_array;
	var bullets = bullet_array;
	for (var i=0;i<enemies.length;i++)
	{
		enemy_x = enemies[i].x;
		enemy_y = enemies[i].y;
	  if ( 	enemy_y<= (y+100) && (enemy_x+100) > x && (enemy_y+100) > y && enemy_x<=(x+100)	 )//top-right-bottom-left
		{
			 clearInterval(main_loopid);
		}
		
			for (var j=0;j<bullets.length;j++)
				{
						if(bullets[j]!=null)
						{
							bx = bullets[j].bullet_x;
							by = bullets[j].bullet_y;
							
							if ( enemy_y<= (by+10)&&	(enemy_x+90) > bx 	 && (enemy_y+70) > by && enemy_x<=(bx+10)	 	)
									{
									bullets[j].deleteBullet();
									bullets[j] = null;
									
										enemies[i].health = enemies[i].health-1;
										if(enemies[i].health<=0)
										{
											enemies[i].deleteEnemy();
											enemies[i] = null;
											
											score++;
											var feedback = document.getElementById("feedback");
											feedback.innerHTML ="Enemy Killed <br/>"+score;
											feedback.style.color="Red";
										}
								}
						}
				}
		}	
	bullet_array = clearArray(bullets);
	enemy_array = clearArray(enemies);
}

/*3place possible so divide values of random by 3*/
function randomGenerator()
{
	var random= Math.random();
	if(random>=0 && random<0.33)
	{
		return 40;
	}
	else if(random >=0.33 && random <0.67)
	{
		return (150);
	}
	else
	{
		return (260);
	}
}

function clearArray(input)
{
	var temp = [];
	var l =input.length;
	for(var i=0;i<l;i++)
	{
		if(input[i]!=null)
		{
			(temp).push(input[i]);
		}
	}
	return temp;
}

function resetGame()
	{
		var enemies = enemy_array;
		for(var i =0; i<enemies.length;i++)
			{
				enemies[i].deleteEnemy();
				enemies[i] =null;
			}
		enemy_array = clearArray(enemies);
		enemy_counter=0;
	}

function keydownEventHandler(e)
{

	if(e.keyCode == 37)
	{
		// take left
		car.update_car(-1);
	}
	
	if(e.keyCode == 39)
	{
		//right
		console.log("right");
		car.update_car(+1);
	}
	
	if(e.keyCode == 13)
	{
		//enter
		clearInterval(main_loopid);
		alert("restart by pressing enter");
		resetGame();
		start();
		car.update_car(+1);
	}
	
	if(e.keyCode == 32)
				{
					//left
					var e = new Bullet();
					(bullet_array).push(e);
					e.createBullet();
				}
}

document.onkeydown = keydownEventHandler;
