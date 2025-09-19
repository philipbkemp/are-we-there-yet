cards = [
	{pack:"colours",flavours:["splodge/blue"]},
	{pack:"colours",flavours:["splodge/green"]},
	{pack:"colours",flavours:["splodge/red"]},
	{pack:"colours",flavours:["splodge/black"]},
	{pack:"colours",flavours:["splodge/white"]},
	{pack:"colours",flavours:["splodge/yellow"]},
	{pack:"colours",flavours:["splodge/pink"]},
	{pack:"colours",flavours:["splodge/purple"]},
	{pack:"colours",flavours:["splodge/grey"]},
	{pack:"base",icon:"bird",qty:4},
	{pack:"base",icon:"bridge",qty:2},
	{pack:"base",icon:"pylon"},
	{pack:"base",icon:"tunnel",qty:2},
	{pack:"hiking",icon:"bench",qty:5},
	{pack:"hiking",icon:"mushroom"},
	{pack:"hiking",icon:"signpost"},
	{pack:"towns",icon:"lamp",qty:5},
	{pack:"towns",icon:"playground"},
	{pack:"towns",icon:"statue"},
	{pack:"towns",icon:"wheelie-bin",qty:3},
	{pack:"towns",icon:"wheelie-bin",flavours:["splodge/black"]},
	{pack:"towns",icon:"traffic-light"},
	{pack:"towns",icon:"traffic-light",flavours:["splodge/red"]},
	{pack:"towns",icon:"traffic-light",flavours:["splodge/yellow"]},
	{pack:"towns",icon:"traffic-light",flavours:["splodge/green"]},
	{pack:"towns",icon:"fountain"},
	{pack:"infrastructure",icon:"airport"},
	{pack:"infrastructure",icon:"barrier"},
	{pack:"infrastructure",icon:"pitch"},
	{pack:"infrastructure",icon:"stadium"},
	{pack:"infrastructure",icon:"windmill"},
	{pack:"infrastructure",icon:"crane"},
	{pack:"transport",icon:"train"},
	{pack:"transport",icon:"lorry",qty:5},
	{pack:"transport",icon:"motorbike",qty:3}
];

index = 0;
cards.forEach(card=>{
	index++;
	if ( ! card.icon ) {
		card.icon = "";
	}
	if ( ! card.flavours ) {
		card.flavours = [];
	}
	if ( ! card.qty ) {
		card.qty = 1;
	}
	if ( ! card.id ) {
		card.id = index;
	}
});

deck = [];
nextCardIndex = 0;
points = 0;

function showAllCardsForSelection(parent) {

	cards.forEach(card=>{

		c = getCardElement(card);

		c.setAttribute("card-id",card.id);

		c.addEventListener("click",function(el){
			element = el.target;
			while ( ! element.classList.contains("card") ) {
				element = element.parentNode;
			}
			element.classList.toggle("not-selected");
		});

		document.querySelector(parent).append(c);
	});

	document.getElementById("play-go").addEventListener("click",function(){
		deck = [];
		cards.forEach(c=>{
			if ( document.querySelector(".card[card-id='"+c.id+"']:not(.not-selected)") ) {
				for ( i=0 ; i!==c.qty ; i++ ) {
					deck.push(c);
				}
			}
		});
		shuffleDeck();
		startGame();
	});

}

function shuffleDeck() {
	currentIndex = deck.length;
	while ( currentIndex !== 0 ) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
	}
}

function startGame() {
	document.querySelector(".deck-select").classList.add("d-none");
	document.querySelector(".deck-play").classList.remove("d-none");

	drawCard(".deck-parent-play");
	drawCard(".deck-parent-play");
	drawCard(".deck-parent-play");
	drawCard(".deck-parent-play");
	drawCard(".deck-parent-play");

	document.querySelector(".points-playing .score").textContent = points;
	document.querySelector(".points-final .score").textContent = points;
}

function drawNewCard() {
	document.querySelector(".card.earned:not(.d-none)").classList.add("d-none");
	drawCard(".deck-parent-play");
}

function endgame() {
	document.querySelector(".deck-play").classList.add("d-none");
	document.querySelector(".deck-gameover").classList.remove("d-none");
}

function drawCard(parent) {
	if ( ! deck[nextCardIndex] ) {
		endgame();
		return;
	}
	newCard = deck[nextCardIndex];
	nextCardIndex++;

	newCardEl = getCardElement(newCard);
	newCardEl.addEventListener("click",function(el){
		points++;
		document.querySelector(".points-playing .score").textContent = points;
		document.querySelector(".points-final .score").textContent = points;
		element = el.target;
		while ( ! element.classList.contains("card") ) {
			element = element.parentNode;
		}
		element.classList.toggle("earned");
		setTimeout(drawNewCard,1100);
	});
	document.querySelector(parent).append(newCardEl);
}

function showAllCards(parent) {

	cards.forEach(card=>{
		document.querySelector(parent).append(getCardElement(card));
	});

}

function getCardElement(card) {
	c = document.createElement("DIV");
	c.classList.add("card");
	p = document.createElement("DIV");
	p.classList.add("pack");
	p.textContent = card.pack;
	i = document.createElement("DIV");
	i.classList.add("icon");
	if ( card.icon !== "" ) {
		ii = document.createElement("IMG");
		ii.setAttribute("src",card.icon+".svg");
		i.append(ii);
	}
	f = document.createElement("DIV");
	f.classList.add("flavour");
	if ( card.flavours.length !== 0 ) {
		card.flavours.forEach(flavour=>{
			ff = document.createElement("IMG");
			ff.setAttribute("src",flavour+".svg");
			f.append(ff);
		})
	}
	c.append(p);
	c.append(i);
	c.append(f);

	return c;
}