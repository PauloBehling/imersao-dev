let cardContainer = document.querySelector(".card-container");
let campoBusca = document.getElementById("campo-busca");
let dados = [];

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar dados:", error);
            return; // Interrompe a execução se houver erro
        }
    }

    const termoBusca = campoBusca.value.trim().toLowerCase();
    let dadosFiltrados;

    // Se o campo de busca estiver vazio, mostra todos os dados.
    if (termoBusca === "") {
        dadosFiltrados = dados;
    } else {
        // Caso contrário, filtra os dados conforme o termo digitado.
        dadosFiltrados = dados.filter(dado => 
            dado.nome.toLowerCase().includes(termoBusca) || 
            dado.descricao.toLowerCase().includes(termoBusca)
        );
    }
    // Ordena os resultados em ordem alfabética pelo nome
    dadosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.data_criacao}</p>
        <p>${dado.descricao}</p>
        <p class="tags">#${dado.tags.join(", #")}</p>
        <a href="${dado.link_oficial}" target="_blank">Saiba mais</a>

        `
        cardContainer.appendChild(article);
    }
}

// Adiciona um "escutador" para o evento de pressionar uma tecla no campo de busca
campoBusca.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      iniciarBusca();
    }
});