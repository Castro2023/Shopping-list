const itemForm= document.querySelector('#item-form');
const itemInput= document.querySelector('#item-input');
const ulList= document.querySelector('#item-list') ; 
const clearBtn= document.querySelector('#clear'); 
const itemFilter=document.querySelector('#filter');
const formBtn=itemForm.querySelector('button')
let isEditMode=false;

function displayItemsFromLocalStorage(){
   const itemsFromStorage = getItemFromLocalStorage()
   itemsFromStorage.forEach(item=>{
    return addItemToDOM(item);
    
   })
   resetUI()
} 

function onAddItemSubmit(e){
    e.preventDefault()
      
    const newItem= itemInput.value;

    //validate input
    if(newItem===''){
        alert('Please add an Item'); //only a button can submit a form each form should have one button element
        return
    }
    //check for edit mode
    if(isEditMode){
        const itemToEdit=ulList.querySelector('.edit-mode') //gets items to edit;
        removeItemsFromLocalStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item ';
        formBtn.style.backgroundColor='#333'
        isEditMode=false;
    } else{
        if(checkItems(newItem)){
            alert('Item already Exist'); 
        }
       
    }

    //CREEATE LIST ITEMS
// const li=document.createElement('li');
// li.appendChild(document.createTextNode(newItem));

// const button=document.createElement('button')
// button.className='remove-item btn-link text-red';
 
// const icon=document.createElement('i');
// icon.className='fa-solid fa-xmark';
// button.appendChild(icon);
// li.appendChild(button);

// //ADD LIST ITEMS TO DOM
// ulList.appendChild(li);

//Create Item DOM element
addItemToDOM(newItem);

//Add item to Local Storage
addItemToLocalStorage(newItem)

resetUI();
itemInput.value='';
}

function addItemToDOM(item){

//create list items
const li=document.createElement('li');
li.appendChild(document.createTextNode(item));

const button=document.createElement('button')
button.className='remove-item btn-link text-red';
 
const icon=document.createElement('i');
icon.className='fa-solid fa-xmark';
button.appendChild(icon);
li.appendChild(button);

//Add Li to DOM
ulList.appendChild(li);

}
 
function addItemToLocalStorage(item){
    let itemsFromStorage=getItemFromLocalStorage()

    //Add new Item to Array if empty
      itemsFromStorage.push(item);

      //convert to JSON string and set to localStorage
      localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemFromLocalStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items')=== null){
        itemsFromStorage=[] ;
    }else
    {
        itemsFromStorage=JSON.parse(localStorage.getItem('items'));
    }
    
      return itemsFromStorage
}

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }
}

//check for double entries
function checkItems(item){
    const itemsFromStorage=getItemFromLocalStorage();
    return itemsFromStorage.includes(item)
}

//Set item to edit function
function setItemToEdit(item){
    isEditMode=true;
    //remove edit property from applying to all ul
    ulList.querySelectorAll('li').forEach((i)=>i.classList.remove("edit-mode"));

    item.classList.add('edit-mode');
    formBtn.innerHTML='<i class="fa-solid fa-pen"></i>Edit Item'
    itemInput.value= item.textContent;
    formBtn.style.backgroundColor='#228822'
}

//Removes item when X bitton is clicked
function removeItem(item){
    if (confirm('Do you want to delete?')){
        item.remove();

        //remove Item from Storage
        removeItemsFromLocalStorage(item.textContent);

        resetUI();
    }

    // if(e.target.parentElement.classList.contains('remove-item')){
    //     if (confirm('Do you want to delete?')){
    // e.target.parentElement.parentElement.remove()
          //      resetUI();
      //  }
   // } event delegation
}

function removeItemsFromLocalStorage(item){
    let itemsFromStorage=getItemFromLocalStorage();
    //filter out items to be removed
    itemsFromStorage=itemsFromStorage.filter((i)=>{
        return i !==item    
    })
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(e){  
    // ulList.innerHTML=''; or
    while(ulList.firstChild){
        ulList.removeChild(ulList.firstChild);
    }
    //CLear from Local Storage
    localStorage.removeItem('items');

    resetUI();
}

//Filters the closest input
function filterItems(e){
    const liItems=ulList.querySelectorAll('li');
    const text= e.target.value.toLowerCase();

    liItems.forEach((item)=>{
       const itemName=item.firstChild.textContent.toLowerCase();
       if(itemName.indexOf(text) != -1){
        //indexOf(-1)is a mismatch
        item.style.display='flex';
       }else{
       item.style.display='none'}
    })
   
}

//Removes the filter and clear button each time the page loads
function resetUI(){
    const liItems=ulList.querySelectorAll('li');
    if(liItems.length===0){
        clearBtn.style.display='none';
        itemFilter.style.display='none';
    }else{
        clearBtn.style.display='block'; 
        itemFilter.style.display='block';
    }
}
 
//initialize App
function initialize (){
    //Event Listeners
itemForm.addEventListener('submit',onAddItemSubmit);
ulList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItemsFromLocalStorage)

resetUI()
}

initialize();


