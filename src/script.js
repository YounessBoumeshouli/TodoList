let taskInput = document.getElementById("task");
let dateInput = document.getElementById("date");
let descInput = document.getElementById("description");
let form = document.getElementById("form");
let todolist = document.getElementById("ToDo");
let doinglist = document.getElementById("Doing");
let donelist = document.getElementById("Done");
let priorityInput = document.getElementById("pr");
let nTodo = document.getElementById("nTodo");
let nDoing = document.getElementById("nDoing");
let nDone = document.getElementById("nDone");
let searchInput = document.getElementById("search");
let searchdiv = document.getElementById("searchdiv");
let closeMenu = document.getElementById("closeMenu")
let closeComment = document.getElementById("closeComment")
let CommentContent = document.getElementById("CommentContent")
let comment=document.getElementById("Comment")
let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("CompletedTasks")) || [];
let doing = JSON.parse(localStorage.getItem("doing")) || [];

closeComment.addEventListener("click",function(){
    comment.style.display = "none"
})

closeMenu.addEventListener("click",function(){
    form.style.display = "none"
})
function addTask(){
     form.style.display = "block"
}
function searchTask() {
    console.log("Search triggered");
    searchdiv.innerHTML = "";
    todolist.style.display = "none"
    doinglist.style.display = "none"
    donelist.style.display="none"
    let searchValue = searchInput.value.toLowerCase(); 

 
    const allTasks = [...Tasks, ...completedTasks, ...doing];
    
    allTasks.forEach(t => {
        if (t.task.toLowerCase().includes(searchValue)) {
            
            searchdiv.innerHTML += createTaskHTML(t);
        }
    });

   
    if (searchdiv.innerHTML === "") {
         comment.style.display = "block"
        CommentContent.innerHTML = "No tasks found";
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    formValidator(); 
    todolist.style.display = "block"
    doinglist.style.display = "none"
    donelist.style.display="none"
});


function formValidator() {
    if (!taskInput.value || !descInput.value || !priorityInput.value) {
        comment.style.display = "block"
        CommentContent.innerHTML = "All fields are required.";
        
    } else {
        comment.style.display = "block"
        CommentContent.innerHTML = "Task submitted successfully!";
        
        createTask(); 
    }
}


const showTodoList = () => {
    todolist.innerHTML = "";
    doinglist.innerHTML = "";
    donelist.innerHTML = "";

    
    const renderTasks = (tasks, container) => {
        tasks.forEach(task => {
            let borderStyle = getBorderStyle(task.priority);
            container.innerHTML += createTaskHTML(task, borderStyle);
        });
    };

    renderTasks(Tasks, todolist);
    renderTasks(doing, doinglist);
    renderTasks(completedTasks, donelist);

    setupDragAndDrop();
    updateTaskCount(); 
}


const getBorderStyle = (priority) => {
    switch (priority) {
        case "P1": return "5px green solid";
        case "P2": return "5px red solid";
        case "P3": return "5px yellow solid";
        default: return "none";
    }
}


const createTaskHTML = (task, borderStyle) => {
    return `
        <div draggable="true" class="taskbox" data-id="${task.id}" style="border-left:${borderStyle}">
            <div class="mt-4 flex-col items-center justify-between">
               
                <p class="text-sm font-medium text-gray-500">${task.task}</p>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">${task.description}</p>
                <h3 class="text-lg leading-6 font-medium text-gray-900">${task.date}</h3>
                <p class="text-sm font-medium text-gray-500">${task.priority}</p>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `;
}




const createTask = () => {
    const data = {
        task: taskInput.value,
        description: descInput.value,
        date: dateInput.value,
        priority: priorityInput.value,
        id: Date.now() 
    };
    Tasks.push(data);
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
    form.reset(); 
    showTodoList(); 
}


function deleteTask(id) {
    removeTaskById(id);
    showTodoList();
}


function removeTaskById(id) {
    Tasks = Tasks.filter(task => task.id !== id);
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
    doing = doing.filter(task => task.id !== id);
    localStorage.setItem('doing', JSON.stringify(doing));
    completedTasks = completedTasks.filter(task => task.id !== id);
    localStorage.setItem('CompletedTasks', JSON.stringify(completedTasks));
}


function editTask(id) {
    form.style.display = "block"
    const taskToEdit = Tasks.find(tk => tk.id === id) || 
                       doing.find(tk => tk.id === id) || 
                       completedTasks.find(tk => tk.id === id);
    
    if (taskToEdit) {
        taskInput.value = taskToEdit.task;
        descInput.value = taskToEdit.description;
        dateInput.value = taskToEdit.date;
        priorityInput.value = taskToEdit.priority;
        removeTaskById(id);
        showTodoList();
    } else {
        comment.style.display = "block"
        CommentContent.innerHTML = "Task not found!";
        
    }
}


const updateTaskCount = () => {
    nTodo.innerHTML = `${Tasks.length}`;
    nDoing.innerHTML = `${doing.length}`;
    nDone.innerHTML = `${completedTasks.length}`;
}


showTodoList();
window.onload = setupDragAndDrop;
