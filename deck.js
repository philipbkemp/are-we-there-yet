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

cards.forEach(card=>{
	if ( ! card.icon ) {
		card.icon = "";
	}
	if ( ! card.flavours ) {
		card.flavours = [];
	}
	if ( ! card.qty ) {
		card.qty = 1;
	}
});

function showAllCards(parent) {

	cards.forEach(card=>{
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

		document.querySelector(parent).append(c);
	});
}