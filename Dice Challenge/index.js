let randomNumber1 = Math.floor(Math.random() * 6) + 1;
let dice1ImagePath = "images/dice" + randomNumber1.toString() + ".png";
document.querySelector(".dice .img1").setAttribute("src", dice1ImagePath);

let randomNumber2 = Math.floor(Math.random() * 6) + 1;
let dice2ImagePath = "images/dice" + randomNumber2.toString() + ".png";
document.querySelector(".dice .img2").setAttribute("src", dice2ImagePath);

announcer = document.querySelector("h1");
if(randomNumber1 > randomNumber2){
    announcer.innerHTML = "Player 1 Wins!";
}
else if(randomNumber2 > randomNumber1){
    announcer.innerHTML = "Player 2 Wins!";
}
else{
    announcer.innerHTML = "Draw!";
}