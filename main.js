var cardsArray = [
    {'name': 'IronMan',       'img': 'Images/ironman.jpeg',},
    {'name': 'Thor',          'img': 'Images/thor.jpeg',},
    {'name': 'BlackWidow',    'img': 'Images/images.jpeg',},
    {'name': 'Hulk',          'img': 'Images/hulk.jpeg',},
    {'name': 'CaptainAmerica','img': 'Images/captain.jpeg',},
    {'name': 'SpiderMan',     'img': 'Images/spiderman.jpeg',},
    {'name': 'Hawkeye',       'img': 'Images/hwakeye.jpeg',},
    {'name': 'Thanos',        'img': 'Images/thanos.jpeg',},
    {'name': 'ScarletWitch',  'img': 'Images/witch.jpeg',},
    {'name': 'DoctorStrange', 'img': 'Images/doctor.jpeg',},
    {'name': 'Valkyrie',      'img': 'Images/valkyrie.jpeg',},
    {'name': 'AntMan',        'img': 'Images/antman.jpeg',}
];

var gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(function(){
    return 0.5 - Math.random();
})
var game = document.getElementById('game-board');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for(var i = 0; i< gameGrid.length; i++){

    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name;
    var front = document.createElement('div');
    front.classList.add('front')

    var back = document.createElement('div');
    back.classList.add('back')
    back.style.backgroundImage = `url(${gameGrid[i].img})`;
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
};
var firstGuess = '';
var secondGuess = '';
var count = 0;
var pt = null;
var delay = 800;

var match = function(){
    var selected = document.querySelectorAll('.selected');
    for(var i=0; i<selected.length; i++)
    {
        selected[i].classList.add('match');
    }
};

var resetGuesses = function(){
    firstGuess = '';
    secondGuess = '';
    count = 0;
    pt = null;

    var selected = document.querySelectorAll('.selected');
    for(var i=0; i<selected.length; i++){
    selected[i].classList.remove('selected');
    }
};

grid.addEventListener('click', function(e){
    var clicked = event.target;
    if(clicked.nodeName === "SECTION" || clicked === pt || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
        return;
    }
    if (count<2){
        count++;
        if(count === 1){
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        if(firstGuess !== '' && secondGuess !== ''){
            if(firstGuess === secondGuess){
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            }
            else {
                setTimeout(resetGuesses, delay);
            }
        }
        pt = clicked;
    }
});