var mapArray, ctx, currentImgMainx, currentImgMainY;
var imgMountain, imgMain, imgEnemy;

//當網頁元件載入完成後要做的事情
$(document).ready(function()
{
    //遊戲地形設定
    //0:可走、1:障礙、2:終點、3:敵人
     mapArray = [0,1,1,0,0,0,3,1,2];
     ctx = $("#myCanvas")[0].getContext("2d");
    
    //擺上主角 - 使用預設位置
    imgMain = new Image();
    imgMain.src = "SimpleRPGPractive/images/spriteSheet.png";
    currentImgMainx=0;
    currentImgMainY=0;
    imgMain.onload=function()
    {
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainx,currentImgMainY,200,200);
    };
    
    //擺上障礙物與敵人
    imgMountain = new Image();//障礙物圖片物件
    imgMountain.src = "SimpleRPGPractive/images/material.png";
    imgEnemy = new Image(); //敵人圖片物件
    imgEnemy.src = "SimpleRPGPractive/images/Enemy.png";
    imgMountain.onload=function()
    {
        imgEnemy.onload=function()
        {
           for(var x in mapArray)
           {
               if(mapArray[x]==1)//擺上山
               {
                   ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);
               }else if (mapArray[x]==3)//擺上敵人
               {
                   ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
               }
           }
        };
    };
    
});
//當有人按下按鍵後要做的事情
$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    event.preventDefault();
    //alert(event.which);
    switch(event.which){
        case 37://往左走
            targetImgMainX = currentImgMainx-200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case 38://往上走
            targetImgMainX = currentImgMainx;
            targetImgMainY = currentImgMainY-200;
            cutImagePositionX = 355;
            break;
        case 39://往右走
            targetImgMainX = currentImgMainx+200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case 40://往下走
            targetImgMainX = currentImgMainx;
            targetImgMainY = currentImgMainY+200;
            cutImagePositionX = 0;
            break;
        default://當有人按這四個件以外狀況
            return;
    }
    if (targetImgMainX<=400 && targetImgMainX>=0 &&
        targetImgMainY<=400 && targetImgMainY>=0)
    {
        targetBlock=targetImgMainX/200+targetImgMainY/200*3;
    }
    else
    {
        targetBlock=-1;//-1代表異常, 不移動
    }
    
    ctx.clearRect(currentImgMainx, currentImgMainY,200,200);
    
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3)
    {
        //目標位置異常，遇到障礙物、敵人都不能走，在原地
    }else
    {
        $("#talkBox").text("");
        currentImgMainx=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
        ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainx,currentImgMainY,200,200);
    switch(mapArray[targetBlock])
        {
            case undefined:
                $("#talkBox").text("邊界");
            break;
            case 1:
                $("#talkBox").text("有山");
            break;
            case 2:
                $("#talkBox").text("抵達終點!");
            break;
            case 3:
                $("#talkBox").text("嗨~");
            break;
        }
});
