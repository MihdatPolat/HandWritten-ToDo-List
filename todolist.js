(() =>{
    let toDoListArray = [];
    const form = document.querySelector(".form");
    const input = form.querySelector(".form__input");
    const ul =document.querySelector(".toDoList");

    form.addEventListener('submit', e => {
        e.preventDefault();
        let ItemId= String(Date.now());
        let toDoItem= input.value;
        addItemToDOM(ItemId, toDoItem);
        addItemTOArray(ItemId, toDoItem);
        input.value='';
    });
    ul.addEventListener('click', toggleDone);

    function toggleDone(e) {
        let id = e.target.getAttribute('data-id');
        let li = document.querySelector('[data-id="' + id + '"]');
        li.classList.toggle("strike-through");
    }
    let firstItem = true;
    const respectLi = document.createElement('li');
        respectLi.innerText = 'Saygınlık';
        
    function addItemToDOM(ItemId, toDoItem) {
        const li = document.createElement('li')
        li.setAttribute("data-id", ItemId);
        li.innerText =toDoItem;
        ul.appendChild(li);
        const deleteIcon = document.createElement('button');
        deleteIcon.innerHTML = "X";
        deleteIcon.classList.add("delete-icon");
        li.appendChild(deleteIcon);
        deleteIcon.addEventListener("click", e => {
        e.stopPropagation();
        removeItemFromDom(ItemId);
        removeItemFromArray(ItemId);
    });
    if (firstItem) {
        firstItem = false;
        ul.appendChild(respectLi);
    }
    else{
        ul.insertBefore(li,respectLi);

    }
    }
    
    
    function addItemTOArray(ItemId, toDoItem) {
        toDoListArray.push({ItemId, toDoItem});
        console.log(toDoListArray)
    }
    
    function removeItemFromDom(id){
        var li = document.querySelector('[data-id="' + id + '"]')
        ul.removeChild(li);
        li.classList.remove("strike-through");

    }
    function removeItemFromArray(id) {
        toDoListArray = toDoListArray.filter(item => item.ItemId !== id);
        console.log(toDoListArray);
    }

    let docTitle= document.title;
    window.addEventListener("blur", () => {
        document.title = "Daha Yapacakların Var! :(";
    })
    window.addEventListener("focus", () => {
        document.title=docTitle;
    })
})();