
document.addEventListener("DOMContentLoaded", function () {
  const pesquisaInput = document.getElementById('pesquisa');
  const botaoBusca = document.getElementById('botaoBusca');
  const resultadosLista = document.getElementById('resultados');
  const informacoesReceita = document.getElementById('informacoesReceita');

  
  const realizarPesquisa = () => {
    const termo = pesquisaInput.value.toLowerCase();
    resultadosLista.innerHTML = '';

    
    fetch('teste.json')
      .then(response => response.json())
      .then(data => {
        
        const receitas = data.receitas;

        
        const resultados = receitas.filter(receita =>
          receita.nome.toLowerCase().includes(termo)
        );

        if (resultados.length === 0) {
          resultadosLista.innerHTML = 'Nenhum resultado encontrado.';
        } else {
          resultados.forEach(receita => {
            const itemLista = document.createElement('li');
            itemLista.textContent = receita.nome;
            itemLista.addEventListener('click', () => {
              
              const idReceita = receita.id ? `ID: ${receita.id}` : '';
              informacoesReceita.innerHTML = `
                <h2>${receita.nome}</h2>
                <p>${receita.descricao || ''}</p>
                <p>${idReceita}</p>
                <h3>Ingredientes:</h3>
                <ul>
                  ${receita.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                </ul>
                <h3>Instruções:</h3>
                <p>${receita.instrucoes || ''}</p>
              `;
            });
            resultadosLista.appendChild(itemLista);
          });
        }
      })
      .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
      });
  };

  
  botaoBusca.addEventListener('click', realizarPesquisa);

  
  pesquisaInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      realizarPesquisa();
    }
  });
});
