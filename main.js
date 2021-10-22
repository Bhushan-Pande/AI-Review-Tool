$(document).ready(function(){
//    drawOnImage(681, 169, 730, 322);
//    drawOnImage(644,349,686,496)
//    drawOnImage(411, 335, 477, 489)
//    drawOnImage(197, 281, 289, 391)
//    drawOnImage(482, 166, 529, 328)
//    drawOnImage(570, 172, 627, 332)
    return;
});
function drawOnImage(x1,y1,x2,y2){
    
    let diffX = Math.abs(x2 - x1);
    let diffY = Math.abs(y2 - y1);
    
    for( let i=1;i<=diffX;i++ ){
        let x = x1 + i;
        
        for( let j=1;j<=diffY;j++ ){
            let y = y1 + j;
            if( i == 1 || j == 1 || i == diffX || j == diffY )
                drawCoordinates(x,y);
        }
    }
    
}

function drawCoordinates(x,y){	  
    
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "red"; 
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2, true);
    ctx.fill();
}
