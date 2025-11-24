let cardContainer = document.querySelector(".card-container");

let campoBusca = document.querySelector("header input");

let dados = [];

function renderizarCards(dados) {
    // Limpa os cards existentes antes de renderizar novos
    cardContainer.innerHTML = "";

    for(let dado of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.ano || dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <div class="tags">
                ${dado.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="link-contain">
            <a href="${dado.link}" class="card-link" target="_blank">Saiba mais</a>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca no arquivo JSON
    if(dados.length === 0) {
        try{
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
            return; // Interrompe a execução se houver um erro
        }
    }
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}


