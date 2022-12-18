// *********select all elements

let inputBox = document.getElementById("input");
let submitbtn = document.querySelector(".submit-btn");
let alert = document.querySelector(".alert");
let taskContainer = document.querySelector(".task-container");
let taskList = document.querySelector(".task-list");
let clearbtn = document.querySelector(".clear-btn");



// ********add items
submitbtn.addEventListener('click',additem)

let edit  = false;
let i = 1;

function additem(e){

    e.preventDefault();

    if(!edit && inputBox.value){
    
    let id = new Date().getTime();
    let value = inputBox.value;

    let task = document.createElement('div')
    task.setAttribute('class','task')
    task.setAttribute('data-id',id)
    task.innerHTML = `
    <p ><span class="num">${(i++)}. </span>${value}</p>
                    
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
    </div>`

    taskList.appendChild(task);
    taskContainer.classList.add("display")
    //add to loacal storage
    addToLocalStorage(id,value)

    

    // callback
    displayAlert("task added","green");

    // selecting items for delete function
    const deletebtn = task.querySelector(".delete-btn");
    deletebtn.addEventListener('click',deleteItem);
    const editbtn = task.querySelector(".edit-btn");
    editbtn.addEventListener('click',editItem);
    }

    // edite function
    else if(edit){
       editElement.childNodes[1].nodeValue =  inputBox.value;
       displayAlert("task edited","green")
       edit = false;
       submitbtn.innerText = "submit"

       editLocalStorage(editElement.parentElement.dataset.id,inputBox.value)
    }

    else{displayAlert("empty","red")}
    
    inputBox.value=''


    

}

// *******display alert

function displayAlert(text,color){
alert.innerHTML = text
alert.classList.add('display');
alert.classList.add(color);
setTimeout(()=>{
alert.classList.remove('display');
alert.classList.remove(color);
},1000)

}

//****** clear all

clearbtn.addEventListener('click',clearAll)

function clearAll(){
    // taskList.innerHTML = '' 
    let items = document.querySelectorAll(".task")
    items.forEach((item)=>{
        taskList.removeChild(item)      
    })
    taskContainer.classList.remove("display");
    localStorage.clear()

}

//****** delet item

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    taskList.removeChild(element);
    deletFromLoacalStorage(element.dataset.id);
    location.reload()
    
    if(!taskList.children.length){
        taskContainer.classList.remove("display");
        displayAlert("empty","red")
    }
    else{displayAlert("one task deleted","red")}
    i=1;
}

function editItem(e){
    edit = true;
    editElement = e.currentTarget.
    parentElement.previousElementSibling;
    inputBox.value = editElement.childNodes[1].nodeValue;
    submitbtn.innerText = " edit ";
    
}


// *******set local storage

function getLocalStorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")) :[]
}

function addToLocalStorage(id,value){

    let list = getLocalStorage()
    let item = {id,value}
    list.push(item)
    localStorage.setItem("list",JSON.stringify(list))
}

function deletFromLoacalStorage(id){
    let list = getLocalStorage()
    list.forEach((item)=>{
       if(item.id==id){
        const index = list.indexOf(item);
        list.splice(index,1)
       }
    })
    localStorage.setItem("list",JSON.stringify(list))
}

function editLocalStorage(id,value){
    let list = getLocalStorage();

    for (item of list){
        if(item.id==id){
          item.value = value
        }
             
    }
    localStorage.setItem("list",JSON.stringify(list))


}


// *****setup items in list

window.addEventListener('DOMContentLoaded',setupItems)

function setupItems(){
    let list = getLocalStorage();
    list.forEach((item)=>{

        let task = document.createElement('div')
        task.setAttribute('class','task')
        task.setAttribute('data-id',item.id)
        task.innerHTML = `
        <p ><span class="num">${(i++)}. </span>${item.value}</p>
                        
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
        </div>`
    
        taskList.appendChild(task);
        taskContainer.classList.add("display");

         // selecting items for delete function
    const deletebtn = task.querySelector(".delete-btn");
    deletebtn.addEventListener('click',deleteItem);
    const editbtn = task.querySelector(".edit-btn");
    editbtn.addEventListener('click',editItem);
 
    })
    
}



