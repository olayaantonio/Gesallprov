
//Canvas

var canvas;
var stage;

//Bakgrund

var bgImg = new Image();
var bg;

//Main menu-vy
 
var mainMenuImg = new Image();
var mainMenu;
var startButtonImg = new Image();
var startButton;

//Meny container

var TitleView = new Container();

//Spelvy

var playerImg = new Image();
var player;
var ballImg = new Image();
var ball;
var cpuImg = new Image();
var cpu;
var winImg = new Image();
var win;
var loseImg = new Image();
var lose;

//Poäng

var playerScore;
var cpuScore;

//Spelvariabler

var xSpeed = 5;
var ySpeed = 5;
var picLoaded = 0;
var ticker = new Object;

//Meny

function Main(){
	/* Canvas */
	
	canvas = document.getElementById('MLGPong');
  	stage = new Stage(canvas);
  		
  	stage.mouseEventsEnabled = true;
  	
  	//Spelljud 

	SoundJS.addBatch([{
        name:'hit', src:'hitmarker.mp3', instances:1},
		{
            name:'playerScore', src:'smokeweed.mp3', instances:1
        },
		{
            name:'enemyScore', src:'2sad4me.mp3', instances:1
        },
		{
            name:'wall', src:'wall.mp3', instances:1
        }]);
  		
  	//Laddar alla bilder innan spelstart så att det inte kraschar under spelets gång 
  		
  	bgImg.src = 'bg.png';
  	bgImg.name = 'bg';
  	bgImg.onload = loadPic;
  	
  	mainMenuImg.src = 'mainMenu.jpg';
  	mainMenuImg.name = 'mainMenu';
  	mainMenuImg.onload = loadPic;
	
	startButtonImg.src = 'startButton.png';
	startButtonImg.name = 'startButton';
	startButtonImg.onload = loadPic;
	
	playerImg.src = 'paddle.png';
	playerImg.name = 'player';
	playerImg.onload = loadPic;
	
	ballImg.src = 'ball.png';
	ballImg.name = 'ball';
	ballImg.onload = loadPic;
	
	cpuImg.src = 'paddle.png';
	cpuImg.name = 'cpu';
	cpuImg.onload = loadPic;
	
	winImg.src = 'win.png';
	winImg.name = 'win';
	winImg.onload = loadPic;
	
	loseImg.src = 'lose.png';
	loseImg.name = 'lose';
	loseImg.onload = loadPic;
	
	//Ticker för att ställa in FPS 
	
	Ticker.setFPS(30);
	Ticker.addListener(stage);
}

//Funktion loadPic som laddar upp alla bilder först för att sen göra startknappen klickbar.
function loadPic(e) {
	if(e.target.name = 'bg'){
        bg = new Bitmap(bgImg);
    }
	if(e.target.name = 'mainMenu'){
        mainMenu = new Bitmap(mainMenuImg);
    }
	if(e.target.name = 'startButton')
    {startButton = new Bitmap(startButtonImg);
    }
	if(e.target.name = 'player'){
        player = new Bitmap(playerImg);
    }
	if(e.target.name = 'ball'){
        ball = new Bitmap(ballImg);
    }
	if(e.target.name = 'cpu'){
        cpu = new Bitmap(cpuImg);
    }
	if(e.target.name = 'win'){
        win = new Bitmap(winImg);
    }
	if(e.target.name = 'lose'){
        lose = new Bitmap(loseImg);
    }
	
	picLoaded++;
	
	if(picLoaded == 8)
	{
		addTitleView();
	}
}

// Lägger till menyvy

function addTitleView() {
	startButton.x = 240 - 31.5;
	startButton.y = 160;
	startButton.name = 'startButton';
	
	TitleView.addChild(mainMenu, startButton);
	stage.addChild(bg, TitleView);
	stage.update();
	
	// Knapplysnnare
	startButton.onPress = addGameView; 
}

//Lägger till spelvy
function addGameView() { 
      
    stage.removeChild(TitleView); 
    TitleView = null;  
      
    player.x = 2; 
    player.y = 160 - 37.5; 
    cpu.x = 480 - 25; 
    cpu.y = 160 - 37.5; 
    ball.x = 240 - 15; 
    ball.y = 160 - 15; 
      
    playerScore = new Text('0', 'bold 20px Arial', '#FFF333'); 
    playerScore.maxWidth = 1000;
    playerScore.x = 211; 
    playerScore.y = 20; 
      
    cpuScore = new Text('0', 'bold 20px Arial', '#FFF333'); 
    cpuScore.maxWidth = 1000;   
    cpuScore.x = 262; 
    cpuScore.y = 20; 
      
    stage.addChild(playerScore, cpuScore, player, cpu, ball); 
    stage.update();   
      
    //Startar spelet när man klickar nånstans på bakgrunden
    bg.onPress = startGame; 
}

//Gör så att spelaren kan rör sig i y-led med musen
function movePlayer(e) { 
      
    player.y = e.stageY; 
}

//Funktion för att starta spelet samt lägger till lyssnare för att röra spelaren
function startGame(e) { 
    bg.onPress = null; 
    stage.onMouseMove = movePlayer; 
      
    Ticker.addListener(ticker, false); 
    ticker.tick = update; 
}

//Pausar spelet vid poäng, alltså när bollen nuddar pixeln bakom spelaren
function reset() { 
    ball.x = 240 - 15; 
    ball.y = 160 - 15; 
    player.y = 160 - 37.5; 
    cpu.y = 160 - 37.5; 
      
    stage.onMouseMove = null; 
    Ticker.removeListener(ticker); 
    bg.onPress = startGame; 
}

//Uppdaterar bollens rörelse om det inte har pausats
function update() { 
    ball.x = ball.x + xSpeed; 
    ball.y = ball.y + ySpeed;
    
    //CPU AI. CPU följer bollen men endast 2.5 pixels per frame. Med andra ord är CPU väldigt långsam
    if(cpu.y < ball.y) { 
        cpu.y = cpu.y + 2.5; 
    } 
    else if(cpu.y > ball.y) { 
        cpu.y = cpu.y - 2.5; 
    }
    
    //Bedömmer ifall bollen nuddar övre eller nedre vägg och inverterar farten
    
    //Övre vägg
    if((ball.y) < 0) { 
        ySpeed = -ySpeed; SoundJS.play('wall');
    }; 
    
    //Nedre vägg
    if((ball.y + (30)) > 320) {
        ySpeed = -ySpeed; SoundJS.play('wall');
    };
    
    //CPU Poäng
  
    if((ball.x) < 0) { 
        xSpeed = -xSpeed; 
        cpuScore.text = parseInt(cpuScore.text + 1); 
        reset(); 
        SoundJS.play('enemyScore'); 
    } 

    //Spelarpoäng 

    if((ball.x + (30)) > 480) { 
        xSpeed = -xSpeed; 
        playerScore.text = parseInt(playerScore.text + 1); 
        reset(); 
        SoundJS.play('playerScore'); 
    }
    
    //Kollar om bollen nuddar spelaren och inverterar riktningen på bollen 

    if(ball.x <= player.x + 22 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 75) { 
        xSpeed *= -1; 
        SoundJS.play('hit'); 
    }
    
    //Samma som förr fast för CPU
  
    if(ball.x + 30 > cpu.x && ball.x + 30 < cpu.x + 22 && ball.y >= cpu.y && ball.y < cpu.y + 75) { 
        xSpeed *= -1; 
        SoundJS.play('hit'); 
    } 
    
    //Alert om spelaren har vunnit med 5 poäng  
  
    if(playerScore.text == '5') { 
        alert('win'); 
    } 

    //Alert om CPU vann med 5 poäng

    if(cpuScore.text == '5') { 
        alert('lose'); 
    }
}

//Alertfunktion vid vinst eller förlust
function alert(e) { 
    Ticker.removeListener(ticker); 
    stage.onMouseMove = null; 
    bg.onPress = null
      
    if(e == 'win') 
    { 
        win.x = 140; 
        win.y = -90; 
      
        stage.addChild(win); 
        Tween.get(win).to({y: 115}, 300); 
    } 
    else
    { 
        lose.x = 140; 
        lose.y = -90; 
      
        stage.addChild(lose); 
        Tween.get(lose).to({y: 115}, 300); 
    } 
}
