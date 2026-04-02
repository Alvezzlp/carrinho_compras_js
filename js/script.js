// Inicialização de variáveis
let cart = [];
let modalQt = 0;
let key = 0;

// Função auxiliar para selecionar um único elemento dom DOM
const c = (el) => document.querySelector(el);

// Função auxiliar para selecionar vários elementos do DOM
const cs = (el) => document.querySelectorAll(el);

// Manipulação dos dados do modelo a partir do JSON
modelsJson.map((item, index) => {
    // Clonar o item do modelo
    let modelsItem = c('.models .models-item').cloneNode(true);

    // Atualizar os dados do item do modelo clonado
    modelsItem.setAttribute('data-key', index);
    modelsItem.querySelector('.models-item--img img').src = item.img;
    modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[2].toFixed(3)}`;
    modelsItem.querySelector('.models-item--name').innerHTML = item.name;
    modelsItem.querySelector('.models-item--desc').innerHTML = item.description;

    // Adicionar evento de clique para exibir o modal ao clicar no modelo
    modelsItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        key = e.target.closet('.models-item').getAttribute('data-key');
        modalQt = 1;

        c('.modelsBig img').src = modelsJson[key].img;
        c('.modelsInfo h1').innerHTML = modelsJson[key].name;
        c('.modelsInfo--desc').innerHTML = modelsJson[key].description;
        c('.modelsInfo--size.selected').classList.remove('selected');

        // Atualizar os tamanhos disponíveis no modal
        cs('.modelsInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
                c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
            }
            size.querySelector('span').innerHTML = modelsJson[key].sizes[sizeIndex];
        });

        c('.modelsInfo--qt').innerHTML = modalQt;
        c('.modelsWindowArea').style.opacity = 0;
        c('.modelsWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.modelsWindowArea').style.opacity = 1;
        }, 200);

    });
    c('.models-area').append(modelsItem);
});

// Função para fechar o modal
function closeModal () {
    c('.modelsWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.modelsWindowArea').style.display = 'none';
    }, 500);
}

// Adicionar eventos de clique para fechar o modal
cs('.modelsInfo--cancelButton, .modelsInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Adicionar eventos de clique para controlar a quantidade no modal
c('.modelsInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        c('.modelsInfo--qt').innerHTML = modalQt;
    }
});

c('.modelsInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.modelsInfo--qt').innerHTML = modalQt;
});

// Adicionar eventos de clique para selecionar o tamanho do modelo no modal