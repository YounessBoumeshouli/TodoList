let task = document.getElementById("task");
let date = document.getElementById("date");
let desc =  document.getElementById("description");
let form = document.getElementById("form");
let message = document.getElementById("msg");
let todolist = document.getElementById("ToDo");
form.addEventListener("submit",(e) =>{
e.preventDefault();
console.log("submit is  clicked");
formvalidator()

});
function formvalidator(){
    
    if(task.value===""||desc.value===""){
        
 message.innerHTML = "You should fill all informations to submit"
    } else{
        
 message.innerHTML = "YouR task is submited successfully"
 acceptData();
 creatTask();
    }
    
}

let data = {};
let acceptData=()=>{
    data["task"] = task.value;
    data["description"] = desc.value;
    data["date"] = date.value;
    
    console.log(data);
}
let creatTask = ()=>{
todolist.innerHTML+=`
<div >
                            
                        <div class="flex items-center justify-between">
                            
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Item 1</h3>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">Description for Item 1</p>
                         </div>
                         <div class="mt-4 flex items-center justify-between">
                            <p class="text-sm font-medium text-gray-500">Status: <span class="text-green-600">Active</span></p>
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                        </div>
                        <button onclick="deletTask(this)">Delete</button>
                        </div>
`
}

let deletTask = (e) =>{
    e.parentElement.remove();
}