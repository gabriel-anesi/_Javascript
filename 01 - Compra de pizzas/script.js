const c = (el)=>document.querySelector(el); //selecionar um elemento
const cs = (el)=>document.querySelectorAll(el); //selecionar o array

pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
    //preencher as informações

    c('.pizza-area').append(pizzaItem);

});