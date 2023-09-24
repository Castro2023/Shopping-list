const itemForm= document.querySelector('#item-form');
const itemInput= document.querySelector('#item-input');
const ulList= document.querySelector('#item-list') ; 

function addItem(e){
    e.preventDefault()
      
    const newItem= itemInput.value;

    //validate input
    if(newItem===''){
        alert('Please add an Item'); //only a button can submit a form each form should have one button element
        return
    }

    //create list items
const li=document.createElement('li');
li.appendChild(document.createTextNode(newItem));

const button=document.createElement('button')
button.className='remove-item btn-link text-red';
 
const icon=document.createElement('i');
icon.className='fa-solid fa-xmark';
button.appendChild(icon);
li.appendChild(button);

ulList.appendChild(li);
itemInput.value='';
}

//Event Listeners
itemForm.addEventListener('submit',addItem);

