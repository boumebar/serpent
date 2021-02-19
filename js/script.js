window.onload = function()
{
    var canvasWidth = 810;
    var canvasHeight = 510;
    var blockSize = 30;
    var ctx;
    var delay = 90;
    var snakee;
    var applee;
    var applee2;
    var blockInWidth = canvasWidth/blockSize;
    var blockInHeight = canvasHeight/blockSize;
    var score = 0;
    var timeOut;
    var timeOut2 = 0;
    // var bestscore = 0;
    
    // var namePlayer = this.prompt('Votre nom');
    init();
    
    function init()
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "20px solid gray";
        canvas.style.display = "block";
        canvas.style.margin = "20px auto";
        canvas.style.backgroundColor = "#ddd"


        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6,4],[5,4],[4,4]],"right");
        applee = new Apple([10,5],"#33cc33");
        applee2 = new Apple([Math.round(Math.random() * (blockInWidth - 1)),Math.round(Math.random() * (blockInHeight - 1))],"red");
        score = 0;
        refreshcanvas();
       
    }
    
    function refreshcanvas()
    {
        timeOut2++;
        console.log(timeOut2);
        snakee.advance();
        if(snakee.checkCollision()){
            gameOver();
        }
        else{
            if(snakee.isEatingApple(applee)){
                score++;
                if(score == 20 || score == 40 || score == 60 || score == 80 || score == 100 || score == 120 || score == 140)
                    delay -= 12;
                // console.log(delay);
                snakee.ateApple = true;
                do{
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee)); 
            }
            if(snakee.isEatingApple(applee2)){
                score += 2;
                if(score == 20 || score == 40 || score == 60 || score == 80 || score == 100 || score == 120 || score == 140)
                    delay -= 12;
                // console.log(delay);
                snakee.ateApple = true;
                do{
                    applee2.setNewPosition();
                }
                while(applee2.isOnSnake(snakee));
                timeOut2 = 0;
            }
            
        if(timeOut2 > 300)
            timeOut2 = 0;
            
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        drawScore();
            /************************************************************************************************* */
            
            // if(score > bestscore){
            //     bestscore = score;
            //     // bestScoreName = namePlayer;
            // }
    
            // ctx.strokeText("bestsore " + bestscore,200,150 + 100);
            // ctx.fillText("bestsore " + bestscore,200,150 + 100);
            // ctx.strokeText("bestsore " + bestScoreName + " " +bestscore,200,150 + 100);
            // ctx.fillText("bestsore " + bestScoreName + " " + bestscore,200,150 + 100);

            /************************************************************************************************* */
            
            
            if(timeOut2 > 150 && timeOut2 < 190 ){
                applee2.draw();
            }
                
            snakee.draw();
            applee.draw();
            
            
            timeOut = setTimeout(refreshcanvas,delay);
        }
        
    }

    function drawBlock(ctx, position){
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;


        ctx.fillRect(x,y,blockSize -3,blockSize -3);
    }

    function gameOver(){
        ctx.save();
        // ctx.font = "bold 70px sans-serif";
        // ctx.fillStyle = "black";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.strokeStyle = "white";
        // ctx.lineWidth = 5;
        // var centreX = canvasWidth / 2;
        // var centreY = canvasHeight / 2;
        // ctx.strokeText("Game Over",centreX,centreY - 180);
        // ctx.fillText("Game Over",centreX,centreY - 180);

        // ctx.font = "bold 30px sans-serif";
        // ctx.strokeText("Appuyer sur la touche espace pour rejouer",centreX,centreY - 120);
        // ctx.fillText("Appuyer sur la touche espace pour rejouer",centreX,centreY - 120);
        ctx.restore();

        /************************************************************************************************* */

        // var hiddenName = document.getElementById('namePlayer');
        var hiddenScore = document.getElementById('score');
        // hiddenName.value= namePlayer;
        hiddenScore.value= score;
        // this.console.log(hiddenName);
        // this.console.log(hiddenScore);
        hiddenScore.parentElement.submit();

        /************************************************************************************************* */
         
    }

    function restart(){
        snakee = new Snake([[6,4],[5,4],[4,4]],"right");
        applee = new Apple([10,5],"#33cc33");
        applee2 = new Apple([13,9]);
        score = 0;
        clearTimeout(timeOut);
        refreshcanvas();
    }

    function drawScore(){
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;

        ctx.fillText(score.toString() , centreX , centreY);
        ctx.restore();
    }

   
    function Snake(body,direction){
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i =0; i < this.body.length; i++)
                {
                    if(i===0)
                        ctx.fillStyle = "#b10011";
                    else
                        ctx.fillStyle = "#ff0000";

                    drawBlock(ctx, this.body[i]);
                }
            ctx.restore();
        };

        this.advance = function(){
            var nextPosition = this.body[0].slice();
            switch(this.direction){
                case "up" :
                    nextPosition[1] -= 1;
                    break;
                case "down" :
                    nextPosition[1] += 1;
                    break;
                case "right" :
                    nextPosition[0] += 1;
                    break;
                case "left" :
                    nextPosition[0] -= 1;
                    break;
                default : 
                    throw("Invalid direction");
            }
            this.body.unshift(nextPosition);
            if(!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
        };

        this.setDirection = function(newDirection){
            var allowedDirections;
            switch(this.direction){
                case "up" :
                case "down" :
                    allowedDirections = ["right","left"];
                    break;
                case "right" :
                case "left" :
                    allowedDirections = ["up","down"];
                    break;
                default : 
                    throw("Invalid direction");
            }
            if(allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };
          
        this.checkCollision = function(){
            var wallCollision = false;
            var snakeCollision = false;
            var headSnake = this.body[0];
            var restSnake = this.body.slice(1);
            var snakeHeadX = headSnake[0];
            var snakeHeadY = headSnake[1]; 
            var minX = 0;
            var minY = 0;
            var maxX = blockInWidth - 1;
            var maxY = blockInHeight -1;
            var isNotInHorizontalWall = snakeHeadX < minX || snakeHeadX > maxX;
            var isNotInVerticalWall = snakeHeadY < minY || snakeHeadY > maxY;

            if(isNotInHorizontalWall || isNotInVerticalWall){
                wallCollision = true;
            }

            for(var i = 0 ; i < restSnake.length ; i++){
                if(snakeHeadX === restSnake[i][0] && snakeHeadY === restSnake[i][1]){
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;
        };

        this.isEatingApple = function(applePosition){
            var head = this.body[0];
            if(head[0] === applePosition.position[0] && head[1] === applePosition.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position,color){
        this.position = position;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            var radius = blockSize/2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x,y,radius,0,Math.PI*2,true);
            ctx.fill();
            ctx.restore();
        }
        this.setNewPosition = function(){
            var newX = Math.round(Math.random() * (blockInWidth - 1));
            var newY = Math.round(Math.random() * (blockInHeight - 1));
            this.position = [newX,newY];
        }
        this.isOnSnake = function(snake){
            var isOnSnake = false;

            for(var i = 0; i < snake.body.length; i++){
                if(this.position[0] === snake.body[i][0] && this.position[1] === snake.body[i][1]){
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        }
    }


    this.document.onkeydown = function handleKeyDown(e){
        var key = e.keyCode;
        var newDirection;
        
        // console.log(key);
        switch(key){
            // case 16 :
            //     restart();
            //     return;
            case 37 :
                newDirection = "left";
                break;
            case 38 :
                newDirection = "up";
                break;
            case 39 :
                newDirection = "right";
                break;
            case 40 :
                newDirection = "down";
                break;
            case 65:
            case 32 :
                if (timeOut == null){
                    timeOut = setTimeout(refreshcanvas, delay);
                } else{
                    clearTimeout(timeOut);
                    ctx.save();
                    ctx.font = "bold 70px sans-serif";
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 5;
                    var centreX = canvasWidth / 2;
                    var centreY = canvasHeight / 2;
                    ctx.strokeText("Pause",centreX,centreY + 100);
                    ctx.fillText("Pause",centreX,centreY + 100);

                    ctx.font = "bold 30px sans-serif";
                    ctx.strokeText("Appuyer sur la touche espace pour reprendre",centreX,centreY + 180);
                    ctx.fillText("Appuyer sur la touche espace pour reprendre",centreX,centreY + 180);
                    ctx.restore();
                    timeOut = null;
                }
                break;
            default : 
                return;
        }

        snakee.setDirection(newDirection);
        
    }
}