/*  Obtém elementos do DOM e cria a array para armazenar os itens  */
const button_add = document.getElementById("button_add");
const input_text = document.getElementById("input_text");
const lista = document.getElementById("lista");
const itens = [];


/*  READ - operação crud de leitura  */
function lerItens() {
    console.log("Estado atual da lista:", itens);
}


/*  CREATE - operação crud de criação  */
button_add.addEventListener("click", function(e) {
    e.preventDefault();
    
    const item = input_text.value.trim(); // Remove espaços em branco;
    
    if (item === "") {
        input_text.placeholder = "Insira um item válido...";
        return; // Validação de campo vazio;
    }

 
    itens.push(item);
    
    /*  Cria elemento <li> Item </li>  */
    const item_li = document.createElement("li");
    item_li.id = item;
    item_li.textContent = item;

    /*  Cria o botão de remover item <button></button>  */
    const item_del = document.createElement("button");
    item_del.textContent = "Remover";
    
    /*  Cria o botão de atualizar item <button></button>  */
    const item_atualizar = document.createElement("button");
    item_atualizar.textContent = "Atualizar";

    /*  DELETE - operação crud de remoção  */
    item_del.addEventListener("click", (e) => {
        e.preventDefault();
        const elemento = e.target.parentElement;

        if (itens.includes(elemento.id)) {
            const index = itens.indexOf(elemento.id);
            itens.splice(index, 1);
        }

        elemento.remove();
        lerItens();
    });

    /*  UPDATE - operação crud de atualização  */
    item_atualizar.addEventListener("click", (e) => {
        e.preventDefault();
        const elemento = e.target.parentElement;
        const valorAntigo = elemento.id;

 
        const novoValor = prompt("Atualizar item:", valorAntigo);

        // Validação de campo vazio e nulo
        if (novoValor !== null && novoValor.trim() !== "") {
            const valorLimpo = novoValor.trim();


            const index = itens.indexOf(valorAntigo);
            if (index !== -1) { // Verifica se o valor antigo existe na array antes de atualizar;
                itens[index] = valorLimpo;
            }


            elemento.id = valorLimpo; 

            elemento.firstChild.textContent = valorLimpo; // Utiliza .firstChild para acessar o texto do <li> e atualizá-lo;
            
            lerItens(); 
        }
    });


    lista.appendChild(item_li);
    item_li.appendChild(item_del);
    item_li.appendChild(item_atualizar);


    input_text.value = "";
    input_text.placeholder = "";
    
    lerItens();

});