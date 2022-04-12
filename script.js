function restart(){
    delete selected_boxes.one;
	delete selected_boxes.two;
	delete selected_boxes.three;
	const answer= document.querySelector('.answer');
	answer.innerHTML= '';
    for(const box of boxes){
		box.classList.remove('selected');
		box.classList.remove('not_selected');
		const img= box.querySelector('.checkbox');
		img.src= 'images/unchecked.png';
		box.addEventListener('click', img_selected);
	}
}

function end(){
    for(const box of boxes){
		box.removeEventListener('click', img_selected);
	}
	const answer= document.querySelector('.answer');
	const new_h1= document.createElement('h1');
	const new_p= document.createElement('p');
	const new_button= document.createElement('button');
	if(selected_boxes.one === selected_boxes.two || selected_boxes.one === selected_boxes.three){
	   new_h1.textContent= RESULTS_MAP[selected_boxes.one].title;
	   new_p.textContent= RESULTS_MAP[selected_boxes.one].contents;
	}else if(selected_boxes.two === selected_boxes.three){
	   new_h1.textContent= RESULTS_MAP[selected_boxes.two].title;
	   new_p.textContent= RESULTS_MAP[selected_boxes.two].contents;
	}else if(selected_boxes.one !== selected_boxes.two && selected_boxes.one !== selected_boxes.three && selected_boxes.two !== selected_boxes.three){
	   new_h1.textContent= RESULTS_MAP[selected_boxes.one].title;
	   new_p.textContent= RESULTS_MAP[selected_boxes.one].contents;
	}
	new_button.textContent= 'Ricomincia il quiz';
	answer.innerHTML= '';
	answer.appendChild(new_h1);
	answer.appendChild(new_p);
	answer.appendChild(new_button);
	new_button.addEventListener('click', restart);
}

function img_not_selected(question, choice){
    for(const box of boxes){
		if(box.dataset.questionId === question && box.dataset.choiceId !== choice){
		   box.classList.remove('selected');
		   box.classList.add('not_selected');
		   const img= box.querySelector('.checkbox');
		   img.src= 'images/unchecked.png';
		}
	}
}

function cont(){
    let val=0;
    for(let question in selected_boxes){
		val++;
	}
	return val;
}

function img_selected(event){ 
    const div= event.currentTarget;
	const img= div.querySelector('.checkbox');
	img.src= 'images/checked.png';
	div.classList.remove('not_selected');
	div.classList.add('selected');
	const question= div.dataset.questionId;
	const choice= div.dataset.choiceId;
	img_not_selected(question,choice);
	selected_boxes[question]= choice;
	let size=0;
	size= cont();
	if(size==3){
		end();
	}
}

const boxes= document.querySelectorAll('.choice-grid div');
for (const box of boxes){
	box.addEventListener('click', img_selected);
}
const selected_boxes={};