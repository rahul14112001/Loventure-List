const item=document.querySelector("#item");
const toDOBox=document.querySelector("#to-do-box");


const addToDo=(item)=>{
    const listItem=document.createElement("li");
    listItem.classList.add("list");
    listItem.innerHTML=`
        ${item}
        <img src="./image/icons8-delete-24.png">
    `
    saveList()

    listItem.addEventListener(
        "click",
        function() {
            this.classList.toggle("done");
            saveList()
        }
        
    )
    listItem.querySelector("img").addEventListener(
        "click",
        function() {
            listItem.remove()
            saveList()
        }
    )

    toDOBox.appendChild(listItem);
    saveList()
}

//// save list in local storage
const saveList=()=>{
    const lists=document.querySelectorAll("li")
    console.log(lists);
    const data=[];
    lists.forEach(
        (listele)=>{
            data.push(listele.textContent);
        }
    )
    if(data.length==0)localStorage.removeItem("lists");
    else localStorage.setItem("lists",JSON.stringify(data));
}

const loadToDos = () => {
    const savedItems = localStorage.getItem("lists");

    if (savedItems) {
        const itemsArray = JSON.parse(savedItems);

        itemsArray.forEach((itemText) => {
            addToDo(itemText);
        });
    }
}

item.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addToDo(this.value);
        this.value = "";
        saveList();
    }
});

// Call loadToDos when the page loads
document.addEventListener("DOMContentLoaded", loadToDos);
