var direction = "down";
var timerId;
var snakeTail=['3:8','4:8','5:8'];
var score=0
var cherry=""
function build(){
    score=0
    document.querySelector(".result").style.display="none"
    document.querySelector(".pole").style.display="block"
    document.querySelector(".start").style.display="none"


    snakeTail=['3:8','4:8','5:8'];
    
    var built=""
    for(var i =1; i <= 20; i++){
        built+='<div class="rows">'
        for (var j =1; j <= 20; j++){
            built+=`<div id="${i+":"+j}" class="cols"></div>`
        }
        built+='</div>'
    }
    var pole = document.querySelector(".pole")
    if (pole != null && pole != undefined){
    pole.innerHTML = built
    }
    document.querySelector("[id='5:8']").style.backgroundColor="black"
    document.querySelector("[id='4:8']").style.backgroundColor="black"
    document.querySelector("[id='3:8']").style.backgroundColor="black"
    
    spawnCherry()

    timerId = setInterval(()=>
    {
        if (direction =="down"){
            moveD()
        }else if(direction =="up"){
            moveU()
        } else if(direction =="left"){
            moveL()
        }else if(direction =="right"){
            moveR()
        }
    }
    , 300);
}

function over(){
    clearInterval(timerId)
    document.querySelector(".result").style.display="flex"
    document.querySelector(".pole").style.display="none"
    document.querySelector("#score").innerText="score: " + score
    direction ="down"

}

function go(arr, bool, next){
        if (next.split(":")[0] <= 20 && next.split(":")[0] >= 1 && next.split(":")[1] <=20  && next.split(":")[1] >= 1){
            if (snakeTail.includes(next)){over();}
            if (next == cherry){
                // document.querySelector(`[id='${next}']`).style.backgroundColor="black"
                
                document.querySelector(`[id='${cherry}']`).style.backgroundColor="black"
                score++
                spawnCherry();
                arr.push(next)
                console.log(arr)
            }else{
            document.querySelector(`[id='${next}']`).style.backgroundColor="black"
            document.querySelector(`[id='${arr[0]}']`).style.backgroundColor="white"
            arr.push(next)
            arr.splice(0 ,1)
            }
        }else {
             over();
        }
    
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function spawnCherry(){
    n = getRandom(1,20)+":"+getRandom(1,20)
    if (snakeTail.includes(n)){
        spawnCherry()
    }else {
        cherry=n
        console.log(n)
        document.querySelector(`[id='${n}']`).style.backgroundColor="red"
    }
}


function moveR(){
    direction= "right"
    n =parseFloat(snakeTail[snakeTail.length -1].split(":")[1])+1
    m = snakeTail[snakeTail.length -1].split(":")[0] +":"+ n
    go(snakeTail, 1, m)
}

function moveL(){
    direction= "left"
    n =parseFloat(snakeTail[snakeTail.length -1].split(":")[1])-1
    m = snakeTail[snakeTail.length -1].split(":")[0] +":"+ n
    go(snakeTail, 1, m)
}
function moveU(){
    direction= "up"
    n = parseInt(snakeTail[snakeTail.length -1].split(":")[0])-1 
    m = n +":" +snakeTail[snakeTail.length -1].split(":")[1]
    go(snakeTail, 1, m)
}
function moveD(){
    direction= "down"
    n = parseInt(snakeTail[snakeTail.length -1].split(":")[0])+1
    m = n +":" +snakeTail[snakeTail.length -1].split(":")[1]
    go(snakeTail, 1, m)
}


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87) {
        moveU();
    }
    else if(event.keyCode == 83) {
        moveD()
    }else if(event.keyCode == 68){
        moveR()
    }else if(event.keyCode == 65){
        moveL()
    }
});
