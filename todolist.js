(() =>{
    var toDoListArray = [];
    // Sayfayı yüklediğimizde localStorage'daki verileri okuyoruz
    let storedList = JSON.parse(localStorage.getItem("toDoList")) || [];
    toDoListArray = storedList;
    const form = document.querySelector(".form");
    const input = form.querySelector(".form__input");
    const ul =document.querySelector(".toDoList");

    form.addEventListener('submit', e => {
        e.preventDefault();
        let ItemId= String(Date.now());
        let toDoItem= input.value;
        addItemToDOM(ItemId, toDoItem, false);
        addItemTOArray(ItemId, toDoItem, false);
        // Liste güncellendiğinde localStorage'a kaydediyoruz
        localStorage.setItem("toDoList", JSON.stringify(toDoListArray));
        input.value='';
    });
    ul.addEventListener('click', toggleDone);

    function toggleDone(e) {
        let id = e.target.getAttribute('data-id');
        let li = document.querySelector('[data-id="' + id + '"]');
        let index = toDoListArray.findIndex(item => item.ItemId === id);
        toDoListArray[index].strike = !toDoListArray[index].strike;
        li.classList.toggle("strike-through", toDoListArray[index].strike);
        // Liste güncellendiğinde localStorage'a kaydediyoruz
        localStorage.setItem("toDoList", JSON.stringify(toDoListArray));
    }
    let firstItem = true;
    const respectLi = document.createElement('li');
        respectLi.innerText = 'Saygınlık';
        
     // Sayfa yüklendiğinde localStorage'daki verileri ekliyoruz
     for (let i = 0; i < storedList.length; i++) {
        let id = storedList[i].ItemId;
        let toDoItem = storedList[i].toDoItem;
        let strike = storedList[i].strike;
        addItemToDOM(id, toDoItem, strike);
    }

    function addItemToDOM(ItemId, toDoItem, strike) {
        const li = document.createElement('li')
        li.setAttribute("data-id", ItemId);
        li.innerText = toDoItem;
        if (strike) {
            li.classList.add("strike-through");
        }
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
    if(toDoListArray.length >=5){
        ul.appendChild(respectLi);
        localStorage.setItem("respectLi", JSON.stringify(respectLi));
    }
    /*
    if (firstItem) {
        firstItem = false;
        ul.appendChild(respectLi);
    }
    else{
        ul.insertBefore(li,respectLi);

    }*/
    }
    
    
    function addItemTOArray(ItemId, toDoItem, strike) {
        toDoListArray.push({ ItemId, toDoItem, strike });
        console.log(toDoListArray)
    }
    
    function removeItemFromDom(id){
        var li = document.querySelector('[data-id="' + id + '"]')
        ul.removeChild(li);
        li.classList.remove("strike-through");
        // Liste güncellendiğinde localStorage'a kaydediyoruz
        localStorage.setItem("toDoList", JSON.stringify(toDoListArray));

    }
    function removeItemFromArray(id) {
        toDoListArray = toDoListArray.filter(item => item.ItemId !== id);
        if(toDoListArray.length == 0){
            if(ul.contains(respectLi)){
                ul.removeChild(respectLi);
                localStorage.removeItem("respectLi");
            }
        }
         // Liste güncellendiğinde localStorage'a kaydediyoruz
         localStorage.setItem("toDoList", JSON.stringify(toDoListArray));
    }

    let docTitle= document.title;
    window.addEventListener("blur", () => {
        document.title = "Daha Yapacakların Var! :(";
    })
    window.addEventListener("focus", () => {
        document.title=docTitle;
    })
})();