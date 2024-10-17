let todoName = document.querySelector('#title');
let todoDiscriptions = document.querySelector('#discriptions');
let publishDate = document.querySelector('#publishDate');
let todoListContainer = document.querySelector('#listContainer');
let search = document.querySelector('#search')


let toDoList = [];
let editIndex = -1;

let storedTodoTask = localStorage.getItem('toDoList');
      if(storedTodoTask){
        toDoList = JSON.parse(storedTodoTask)
      };

  displayTodoTask();

function addTodoFunc(){
    let todoTitle = todoName.value;
    let todoDesc = todoDiscriptions.value;
    let todoDate = publishDate.value;

    if (editIndex > -1) {
        toDoList[editIndex] = { title: todoTitle, description: todoDesc, addDate: todoDate };
        editIndex = -1; 
    } else {
        toDoList.push({ title: todoTitle, description: todoDesc, addDate: todoDate });
    };
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    todoName.value = '';
    todoDiscriptions.value = '';
    publishDate.value = '';

    displayTodoTask();
};

function displayTodoTask() {
    let storedTodoTask = localStorage.getItem('toDoList');
    if(storedTodoTask){
        toDoList = JSON.parse(storedTodoTask)
    };

 let newHtml = '';

 for(let i = 0; i < toDoList.length; i++){
     let {title, description, addDate} = toDoList[i];
     newHtml += `
  <div class="task-item">
    <span>${title}</span>
    <span>${description}</span>
    <span>${addDate}</span>
    <div>
      <button class="edit" onClick="editTodo(${i})">Edit</button>
      <button class="delete" onClick="deleteTodo(${i})">Delete</button>
    </div>
  </div>
`;

};
 todoListContainer.innerHTML = newHtml;
};


function deleteTodo(index) {
    toDoList.splice(index, 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    displayTodoTask();
};


function editTodo(index) {
  let storedTodoTask = localStorage.getItem('toDoList');
     if(storedTodoTask){
        toDoList = JSON.parse(storedTodoTask)
     }

   let editTodoTask = toDoList[index];

   document.getElementById('title').value = editTodoTask.title;
   document.getElementById('discriptions').value = editTodoTask.description;
   document.getElementById('publishDate').value = editTodoTask.addDate;

   editIndex = index;

  displayTodoTask();
};


function searchTodo(){
    let todoSearch = search.value.toLowerCase();
    let filterTodo = toDoList.filter( todo =>
     todo.title.toLowerCase().includes(todoSearch)
    );
    todoListContainer.innerHTML = filterTodo.length === 0 ? `<div> Todo not found </div>` : 
    filterTodo.map( ({title, description, addDate}, i) => `
         <spain>${title}</spain>
          <spain>${description}</spain>
           <spain>${addDate}</spain>
             <button class="delete" onClick="deleteTodo(${i})">Delete</button>
             `
            )
};



 