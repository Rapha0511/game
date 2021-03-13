var personnage = document.getElementById("personnage");
var block = document.getElementById("block");
var blockLevel2 = document.getElementById("block-lvl2");
var body = document.getElementsByTagName("body")[0];
var Scorelist = document.querySelectorAll("#scoreContainer li");
var scoreAray = [];
var topScore = document.getElementById("topScore");
var accueil = document.getElementById("accueil");
var boutonStart = document.getElementById('start');
var jeu = document.getElementById("jeu");
var selectionCaractere = document.getElementsByClassName("character");
var selectionStage = document.getElementsByClassName("stage");
var CadreJeu = document.getElementById("cadreJeu");
var personnage = document.getElementById("personnage");
var conteur = 0;
var checkDead;

function selectionParametreJeu(selection,classAjouSuppr,imageAremplacer){

    for(let i = 0; i<selection.length;i++){
        selection[i].addEventListener("click",function(e){
            if(this.classList == classAjouSuppr){
                this.classList.remove(classAjouSuppr);
            }else{
                var d = document.getElementsByClassName(classAjouSuppr);
                for(let j = 0; j<d.length;j++){
                    d[j].classList.remove(classAjouSuppr);
                }
                this.classList.add(classAjouSuppr);
                imageAremplacer.style.backgroundImage = window.getComputedStyle(this).backgroundImage
                
            }
        })
    }
}

selectionParametreJeu(selectionCaractere,"characterSelectionne",personnage);
selectionParametreJeu(selectionStage,"stageSelectionne",CadreJeu);

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
//             CadreJeu.style.backgroundImage=window.getComputedStyle(this).backgroundImage;
//         }
//     })
// }


boutonStart.addEventListener('click',function(){
    if(document.getElementsByClassName("characterSelectionne").length != 0 && document.getElementsByClassName("stageSelectionne").length != 0){
        accueil.remove();
        jeu.style.display = "block";
        body.style.background = 'white';
    }else{
        window.alert("Vous devez selectionnez au moins un stage et un personnage")
    }

})


function saut(){
    if(personnage.classList == "animate"){return}
    personnage.classList.add("animate");
    personnage.classList.remove("crouch-animation")
    setTimeout(function(){
        personnage.classList.remove("animate");
    },400);

}

function crouch(){
    if(personnage.classList == "crouch-animation"){return}
    personnage.classList.add("crouch-animation");
    setTimeout(function(){
        personnage.classList.remove("crouch-animation");
    },400)
}

body.addEventListener("keydown",function(e){
    if(jeu.style.display == "block"){
        if(e.code == 'Space'){
            saut();
            if(!checkDead){
                block.style.animation = "block 1s infinite linear";
                checkDead = window.setInterval(function() {
                    let characterTop = parseInt(window.getComputedStyle(personnage).getPropertyValue("top"));
                    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
                    let blocklvl2Left = parseInt(window.getComputedStyle(blockLevel2).getPropertyValue("left"));
                    console.log(blockLeft)
                    if(blockLeft<40 && blockLeft>-40 && characterTop>=120 || blocklvl2Left<40 && blocklvl2Left>-40 && characterTop <= 160){
                        console.log(characterTop)
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

                        window.clearInterval(checkDead);
                        checkDead = null;
                        block.style.animation = "none";
                        blockLevel2.style.animation = "none"
                        document.getElementById('fail').innerHTML = "Game Over. your last  score is: " + conteur
                        conteur = 0;
                }else{
                    conteur++;
                    if(conteur > 1000){
                        blockLevel2.style.animation = "block 1s infinite linear";
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


