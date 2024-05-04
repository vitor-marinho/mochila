const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];
let identificacao;

itens.forEach(element => {
    criaElemento(element);    
});

form.addEventListener("submit", function(evento){
    evento.preventDefault();

    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];

    itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
        "id": 0
    }

    const existe = itens.find( function(elemento){ return elemento.nome === itemAtual.nome });
    

    if(existe){

        itemAtual.nome = existe.nome;
        itemAtual.id = existe.id;
        
        editaElemento(itemAtual);
        
    }else{
        
        for(i = 0; i <= itens.lenght; i++){
            if(itens.id[i] >= itens.id[i+1]){
                identificacao = itens[i];
            }
        }

        identificacao += 1;
        itemAtual.id = identificacao;
        
        itens.push(itemAtual);
        localStorage.setItem("itens", JSON.stringify(itens));
        criaElemento(itemAtual);
        
    }

    nome.value = "";
    quantidade.value = "";

})


function criaElemento(item){
    
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");
    
    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.dataset.id = item.id;

    novoItem.appendChild(botaoDeleta(novoItem));

    lista.appendChild(novoItem);

}


function botaoDeleta(tag){

    const botao = document.createElement("button");
    botao.innerHTML = "X";

    botao.addEventListener("click", function(){
        deletaElemento(tag.dataset['id'], tag);
    });

    return botao;


}

function deletaElemento(id, tag){
   
    const auxD = itens.findIndex(function (elemento){ return elemento.id === id });
    itens.splice(auxD, 1);
    tag.remove();
    localStorage.setItem("itens", JSON.stringify(itens));
}



function editaElemento(item){

    var AuxE = itens.findIndex(function(elemento){ return elemento.id === item.id});

    itens[AuxE].quantidade = item.quantidade;

    localStorage.setItem("itens", JSON.stringify(itens));

    document.querySelector("[data-id='"+item.id+"']").remove();

    criaElemento(item);
   
                          
}