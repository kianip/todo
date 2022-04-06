// la date d'aujourdh'ui

const date = document.getElementById('date');
// <--- Les options d'affichage pour la date
options = {weekday: "long", month: "short", day: "numeric"}
const today = new Date();
// <-- Ajoute la date d'aujourdh'ui avec un fonction predefini JavaScript, Langue = anglais et les options sont defini en haut
// Ajout de la date ainsi que le temps de l'utilisateur
date.innerHTML = today.toLocaleDateString("en-US", options);
date.innerHTML += ",  ";
date.innerHTML += today.getHours();
date.innerHTML += ":";
date.innerHTML += today.getMinutes();

// <--- Selection de la variable #list
const list = document.querySelector('#list');
let id = 0;


// Main liste d'objet pour l'interface
class UI {
    static displayToDo(){
        // Cherche les objects todos avec le storage
        const todos = Store.getToDos();
        // On cherche les valeurs du text, id et completed pour check/uncheck
        todos.forEach((todo) => UI.addToDoList(todo.text, todo.id, todo.completed));    
    }
    static addToDoList (toDo, id, ifChecked){
        // Quand on load le localstorage on assigne les classes et les icones a partir de s'ils sont complete ou non
        const completed = ifChecked ? 'checkedLine' : '';
        const statusIcon = ifChecked ? 'fa-checked-circle' : 'fa-circle';
        // Ajoute les valeurs entrer dans la valeur listItem
        const listItem = `<li>
        <p class="text ${completed}">${toDo}</p>
        <i class="far ${statusIcon} co" action="complete" id="${id}"></i>
        <i class="far fa-trash-alt" action="delete" id="${id}"></i>
        </li>`;
        // on utilise la fonctions insertAdjacentHTML pour modifier notre code HTML et entrer les valeurs dans la valeur "liste "
        const position = "beforeend"; // Pour inserer les valeurs un apres l'autre.
        list.insertAdjacentHTML(position, listItem);
    }
    // Fonction pour supprimer la liste li au complet
    static removeToDo(element){
        element.parentNode.parentNode.removeChild(element.parentNode);
        // On doit s'assurer de supprimer les elements de la liste de localStorage pour quand on refresh la paeg
        const curId = element.attributes.id.value;
        const todos = Store.getToDos();
        todos.forEach((todo, index) => {
            if(+todo.id === +curId){
                todos.splice(index, 1);
            }
        });
        localStorage.setItem('toDo', JSON.stringify(todos));
    }

    // Fonction pour ajouter la fonctionnalite qui permet de marquer une tache comme etant complete 
    static completeToDo(element){
        // Utilise les icones fontawesome pour soit marquer comme complete ou pas
        const CHECK = "fa-check-circle";
        const UNCHECK = "fa-circle";
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        // Avec la fonction query selection, on selection le texte, ensuite, on ajoute a partir des options CSS une ligne pour marquer comme complet (L'option checkedLine est ajoutee comme classe dans la blaise p)
        // Tout en "togglant" entre les class CHECK et UNCHECK
        element.parentNode.querySelector(".text").classList.toggle("checkedLine");

        // mettre a jour le storage
        // quand on clique sur check, on cherche le ID de la tache
        const curId = element.attributes.id.value;
        const todos = Store.getToDos();
        todos.forEach((todo, index) => {
            if(+todo.id === +curId){
                todos[index].completed = todos[index].completed ? false : true;
            }
        });
        localStorage.setItem('toDo', JSON.stringify(todos));
    }

    //fonction pour enlever TOUT les elements de la liste
    static clearToDo(){
        list.innerHTML = '';
        localStorage.clear();
    }
}

// Systeme d'enregistrement des taches dans la liste en utilisant localStorage
class Store {
    static getToDos(){
        let todos;
        // Cree un array pour les valeurs entre dans le texte
        if (localStorage.getItem('toDo') === null){
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('toDo'));
        }
        return todos;
    }
    static addToDoList(toDo, id){
        const todos = Store.getToDos();
        // Ajoute les variables text id et completed dans le array
        todos.push({text: toDo, id: id, completed: false});
        // Ajoute tout les variables et valeurs au local storage
        localStorage.setItem('toDo', JSON.stringify(todos));
    }
}

// Montrer les elements todo

document.addEventListener('DOMContentLoaded', UI.displayToDo);

// Quand on appuie sur le bouton "Enter" sur le clavier, le tache s'ajoute a la liste
document.addEventListener("keyup", function(){
    if (event.keyCode == 13){
        // Attache la valeur entrer dans input a la variable toDoItem
        const toDoItem  = input.value;
        if (toDoItem){
            UI.addToDoList(toDoItem, Date.now()); // Date.now(); sert a assigner un ID qui va etre unique
            // Incremente la valeur de l'objet du to do list pour compter le nombre de tache
            // ajoute l'element au local storage
            Store.addToDoList(toDoItem, Date.now());
            id++;
        }
        // Vide la valeur input apres l'appuie du boutton Enter
        input.value = "";
    }
});

// Ajoute un ecouteur d'evenement pour detecter quand on clique a quelque part dans la todo list
document.addEventListener("click", (event) => {
    const element = event.target;
    // Verifie si l'element sur la quelle on clique contient un valeur "action" (Donc seulement les icones)
    if (element.attributes.action){
        // Assigne la valeur de action a la valeur elemensActions, soit "complete ou delete"
        const elementsAction = element.attributes.action.value;
        // Si la valeur de elementsAction est complete, on renverse et vice-versa, mais seulement quand on clique
        if (elementsAction == "complete"){
            UI.completeToDo(element);
        // Apelle la fonction pour supprimer l'element du liste
        }else if (elementsAction == "delete"){
           UI.removeToDo(element); 
        }
    }
});

// RATING COMPONENT //

// DECLARATION DES VARIABLES
const resultBox = document.getElementById('result-box');
const myButtons= document.querySelectorAll('[role="button"]');
const chosenRating = document.getElementById('chosen-rating');
const ratingSurvey = document.getElementById('rating-survey');
const submitButton= document.getElementById('submit');

// LOOP POUR SAVOIR SUR QUELLE BOUTON ON CLIQUE
myButtons.forEach((btn)=>{
  btn.addEventListener('click' ,function (e) {
    let buttonChoice= e.currentTarget;
    for (let i=0 ; i<myButtons.length;  i++){
     if (myButtons[i].getAttribute('area-selection')=='true') {
      myButtons[i].setAttribute('area-selection',false);
      buttonChoice.setAttribute('area-selection',true);
     }
  else 
       {
  	    buttonChoice.setAttribute('area-selection',true);
       }
    }
  })
})

// CHANGEMENT DE SCENE QUAND ON CLIQUE SUR SUBMIT.
submitButton.addEventListener('click' ,function(){
  ratingSurvey.setAttribute('hidden', true);
  resultBox.removeAttribute('hidden');
})