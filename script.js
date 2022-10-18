// UI Variables

const form = document.querySelector("form")
const input = document.querySelector("#txtTaskName")
const btnDeleteAll = document.querySelector("#btnDeleteAll")
const taskList = document.querySelector("#task-list")
let items;



// load items
loadItems();

// call event listeners
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener("submit", addNewItem)

    // delete an item
    taskList.addEventListener("click", deleteItem)

    // delete all items
    btnDeleteAll.addEventListener("click", deleteAllItems)
}

function loadItems() {

    items = getItemsFromLS();

    items.forEach(item => {
        createItem(item)
    });
}

// get items from Local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items;
}

// set item to Local Storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text)
    localStorage.setItem('items', JSON.stringify(items))
}

// delete item from LS
function deleteItemFromLS(text) {
    items = getItemsFromLS();

    items.forEach((item, index) => {
        if (item === text) {
            items.splice(index,1)
        }
    })
    localStorage.setItem('items', JSON.stringify(items))
}

function createItem(text) {
    // create li
    const li = document.createElement("li")
    li.className = "list-group-item list-group-item-secondary"
    // bu yöntemle değeri li nin içerisine ekleyebiliriz.
    // li.innerHTML = input.value
    // input.value = ""

    // bu yöntemle de değeri li nin içerisine ekleyebiliriz.
    li.appendChild(document.createTextNode(text))

    // create a
    const a = document.createElement("a")
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#")
    a.innerHTML = "<i class ='fas fa-times'></i>"

    // add a to li
    li.appendChild(a)

    // add li to ul
    taskList.appendChild(li)
    
    // console.log(li)

}

// add new item
function addNewItem(e) {

    if (input.value === "") {
        alert("add new item")
    }

    // create item
    createItem(input.value)

    // save to LS
    setItemToLS(input.value)

    // clear input
    input.value = ""

    e.preventDefault();
}

// delete an item
function deleteItem(e) {
    
        if (e.target.className === "fas fa-times") {

            if (confirm("are you sure ?")) {
                e.target.parentElement.parentElement.remove();

                // delete item from LS
                deleteItemFromLS(e.target.parentElement.parentElement.textContent)
            }

            // genel kontrol elemana/elemanın özelliklerine ulaşılıyor mu
            // console.log(e.target.classList)
            // console.log(e.target.className)
            // console.log(e.target)

        }

    e.preventDefault();
}

// delete all items
function deleteAllItems(e) {


    // 1. yol olarak tüm elemanları böyle silebiliriz.
    // taskList.innerHTML = ""

    // 2. yol

        // cocuk elemanlarına bakalım ve protosunda forEach metodunu vermesi gerekli. console.log(taskList.childNodes)

    // console.log(taskList.children) children dediğimizde nodeList döndürmez ve protosunda forEach metodunu bulamayız.

    // etiketlerin(elemanların) nodeType ları 1 dir.
    // etiketlerin(elemanların) içindeki textlerin nodeType ı 3 tür.

    if (confirm("are you sure ?")) {
        // taskList.childNodes.forEach(item => {

        //     // console.log(item)
        //     // console.log(item.nodeType)

        //     if (item.nodeType === 1) {
        //         // console.log(item)
        //         item.remove()
        //     }
        // });

        // diger bir silme yolu
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
        localStorage.clear();
    }

    e.preventDefault()
}