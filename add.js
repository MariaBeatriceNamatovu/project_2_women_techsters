//this file handles the addition of new items to the list, or removes them, and updates the progress depending on the degree of completion


//defining the addition web component
const template = document.createElement('template');
template.innerHTML = 
`
<script src="https://kit.fontawesome.com/cada603cfc.js" crossorigin="anonymous"></script>

<style>

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


//for the styling of the addition heading

.add{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

button{
    border: none;
    outline: none;
    background: #ff5945;
    padding: 16px 50px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    border-radius: 40px;
    font-family: Poppins;
}

.add_more{
    padding: 8px;
    border-radius: 3px;
}

h2 img{
    width: 30px;
    margin-left: 10px;
}

//for styling of the input field

.row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #edeef0;
    border-radius: 30px;
    padding-left: 20px;
    margin-bottom: 25px;
    display: none;
}
input{
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 10px;
    font-weight: 14px;
    font-family: Poppins;
}

//for styling of the list section on addition of items to the list

ul li{
    list-style: none;
    font-size: 17px;
    user-select: none;
    cursor: pointer;
    padding: 12px 8px 12px 50px;
    position: relative;
}

ul li::before{
    content: '';
    position: absolute;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    background-image: url(assets/unchecked.png);
    background-size: cover;
    background-position: center;
    top: 12px;
    left: 8px;
}
ul li.checked{
    color: #555;

}
ul li.checked::before{
    background-image: url(assets/checked.png);
}
ul li span{
    position: absolute;
    right: 0;
    top: 5px;
    width: 40px;
    height: 40px;
    font-size: 22px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
}

ul li span:hover{
    background: #edeef0;
}


//styling of the progress bar

.progress {
    -webkit-appearance: none;
    width: 95%;
    height: 0.20px;
    background: #ff5945;
    border-radius: 15px;
    cursor: pointer;
    margin: 46px 0;
    display: none;
}

.progress::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #ff5945;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 6px solid #fff;
    box-shadow: 0 5px 5px rgba(255, 26, 26, 0.22);
}


//styling the progress percentage displayed

#percentage{
    margin-left: 50%;
    color: #ff5945;
    font-weight: 500;
    display: none;
}
</style>


//addition header

<div class="add">
<h2>TODAY <img src="./assets/icon.png" alt=""></h2>
<button class="add_more"><i class="fa-regular fa-square-plus"></i></button>
</div>

//input section

<div class="row">
<input type="text" id="input-box" placeholder="Add new task">
<button onclick="addTask()" id="add-btn">Add</button>
</div>


//progress-bar

<input type="range" class="progress">
<p id="percentage"></p>


//task-list section
<ul id="list-container">
</ul>

`
;


//definin the constructor section

class Add extends HTMLElement{
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});

        let clone = template.content.cloneNode(true);
        shadowRoot.append(clone);

        //adding eventlistener for the plus button

        const plusButton = shadowRoot.querySelector('.add_more');
        plusButton.addEventListener('click', ()=>{
            // to toggle the visibility of the input section and progress bar and the percentage displayed:

            //input section
            const inputField = shadowRoot.querySelector('.row');
            inputField.style.display = inputField.style.display === 'none' ? 'flex' : 'none';


            //progress bar
            const progressBar = shadowRoot.querySelector('.progress');
            progressBar.style.display = progressBar.style.display === 'none' ? 'block' : 'none';

            //percentage display
            const progressPercentage = shadowRoot.querySelector('#percentage');
            progressPercentage.style.display = progressPercentage.style.display === 'none' ? 'block' : 'none';
        })

        //handling the addition of tasks in the input field
        const addButton = shadowRoot.getElementById("add-btn");
        const inputBox = shadowRoot.getElementById("input-box");
        const listContainer = shadowRoot.getElementById("list-container");
        

        //defining the add task function - to add tasks or remove tasks from the list

        function addTask(){
            if(inputBox.value === ''){
                alert("You must write something!");      //if the user enters no value
        
            }else{

                //creating new list element when the add button is clicked
                let li = document.createElement("li");

                //populate the li element with the value entered by the user

                li.innerHTML = inputBox.value;
                listContainer.appendChild(li);

                //to add a cross beside each item in the list;
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);

                //calculating the percentage of completed tasks
                const totalTasks = listContainer.querySelectorAll("li").length;
                const completedTasks = listContainer.querySelectorAll("li.checked").length;
                const percentage = Math.round((completedTasks / totalTasks) * 100);

                //to update the progress bar value and the percentage displayed:
                const progressBar = shadowRoot.querySelector('.progress');
                progressBar.value = percentage;
    
                //update the percentage displayed
                const progressPercentage = shadowRoot.querySelector('#percentage');
                progressPercentage.innerText = `${percentage}% Done`;
                
                //to adjust the hue of the color basing on the percentage covered
                const shade = 100 - percentage;
                progressBar.style.background = `hsl(30, 100%, ${shade}%)`;
            }
            inputBox.value = '';
            saveData();
        }

        //when the add button is clicked, an item should be added to the list

        addButton.addEventListener('click', addTask);
        
        //to add or remove an item from the list
        listContainer.addEventListener("click", function(e){

            //if the item in the list is clicked, it's checked, or unchecked
            if(e.target.tagName === "LI"){
                e.target.classList.toggle("checked");
                saveData();
            }

            //if the cross is clicked, the item is removed from the list
            else if(e.target.tagName === "SPAN"){
                e.target.parentElement.remove();
                saveData()
            }
        }, false);
        
        //to ensure that contents don't disappear after refreshing the browser
        function saveData(){
            localStorage.setItem("data", listContainer.innerHTML)
        }
        
        //to display any previously stored tasks when the app window is reopened
        function showTask(){
            listContainer.innerHTML = localStorage.getItem("data");
        }
        showTask();
    }
}

window.customElements.define('add-item', Add);