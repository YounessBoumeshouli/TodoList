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
