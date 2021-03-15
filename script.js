var character = document.getElementById("character");
var block = document.getElementById("block");
var blockLevel2 = document.getElementById("block-lvl2");
var body = document.getElementsByTagName("body")[0];
var Scorelist = document.querySelectorAll("#scoreContainer li");
var scoreAray = [];
var topScore = document.getElementById("topScore");
var home = document.getElementById("home");
var startButton = document.getElementById('start');
var backButton = document.getElementById('backToHome');
var jeu = document.getElementById("jeu");
var listCharacters = document.getElementsByClassName("character");
var listStages = document.getElementsByClassName("stage");
var gameContainer = document.getElementById("gameContainer");
var conteur = 0;
var didLoose = null

function selectionParametreJeu(list,classToAdd,cfgToReplace){

    for(let i = 0; i<list.length;i++){
        list[i].addEventListener("click",function(e){

                var d = document.getElementsByClassName(classToAdd);
                for(let j = 0; j<d.length;j++){
                    d[j].classList.remove(classToAdd);
                }
                this.classList.add(classToAdd);
                cfgToReplace.style.backgroundImage = window.getComputedStyle(this).backgroundImage
                

        })
    }
}

selectionParametreJeu(listCharacters,"characterSelectionne",character);
selectionParametreJeu(listStages,"stageSelectionne",gameContainer);

// for(let i = 0; i<selectionStage.length;i++){
//     selectionStage[i].addEventListener("click",function(e){
//         if(this.classList == "stageSelectionne"){
//             this.classList.remove('stageSelectionne');
//         }else{
//             var d = document.getElementsByClassName("stageSelectionne");
//             for(let j = 0; j<d.length;j++){
//                 d[j].classList.remove("stageSelectionne");
//             }
//             this.classList.add("stageSelectionne");
//             gameContainer.style.backgroundImage=window.getComputedStyle(this).backgroundImage;
//         }
//     })
// }


startButton.addEventListener('click',function(){
    if(document.getElementsByClassName("characterSelectionne").length != 0 && document.getElementsByClassName("stageSelectionne").length != 0){
        home.style.display = "none";
        jeu.style.display = "block";
    }else{
        window.alert("Vous devez selectionnez au moins un stage et un personnage")
    }
})


backButton.addEventListener('click',function(){
    jeu.style.display = 'none';
    home.style.display = 'flex';
})



function jump(){
    if(character.classList != ''){
        return
    }
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },400);

}

function crouch(){
    if(character.classList != ''){
        return
    }
    character.classList.add("crouch-animation");
    setTimeout(function(){
        character.classList.remove("crouch-animation");
    },400)
}

body.addEventListener("keydown",function(e){
    if(jeu.style.display == "block"){
        if(e.code == 'Space'){
            jump();
            if(!didLoose){
                block.style.animation = "block 1.4s infinite linear";
                didLoose = window.setInterval(function() {
                    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
                    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
                    let blocklvl2Left = parseInt(window.getComputedStyle(blockLevel2).getPropertyValue("left"));
                    if(blockLeft<40 && blockLeft>-40 && characterTop>=120 || blocklvl2Left<40 && blocklvl2Left>-40 && characterTop <= 160){
                        scoreAray.push(conteur) // on push le score dans le tableau
                        bestScore = scoreAray[0] // meilleur score setter au premiere element du tableau
                        for(let i = 0; i <= scoreAray.length;i++){
                            if(scoreAray[i] > bestScore){ // si l'un des element du tableau est > au meilleur score
                                bestScore = scoreAray[i]  // il devient le meilleur score
                            }
                        }
                            topScore.innerHTML = bestScore;
                            let scoreContainer = document.getElementById("scoreContainer"); // le ul
                            let scoreListElement = document.createElement('li'); // creation d'un LI
                            scoreContainer.append(scoreListElement); // on rajoute le li dans le ul
                            scoreListElement.textContent = scoreAray[scoreAray.length-1]; // le li prend le score comme valeur   

                        window.clearInterval(didLoose);
                        didLoose = null;
                        block.style.animation = "none";
                        blockLevel2.style.animation = "none"
                        document.getElementById('fail').innerHTML = "Game Over. your last  score is: " + conteur
                        conteur = 0;
                }else{
                    conteur++;
                    if(conteur > 200 && blockLeft < 250){
                        blockLevel2.style.animation = "block 1.4s infinite linear";
                    }
                    document.getElementById("score").innerHTML = conteur;
            
                }
            }, 10);
            
        }

        }else if(e.code = "ArrowDown"){
            crouch();
        }
    }
});


