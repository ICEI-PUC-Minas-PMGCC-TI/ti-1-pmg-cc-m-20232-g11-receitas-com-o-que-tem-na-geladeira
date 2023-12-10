document.addEventListener("DOMContentLoaded", function ()  {
  const pesquisaInput = document.getElementById('pesquisa');
  const botaoBusca1 = document.getElementById('botaoBusca1');
  const botaoBusca2 = document.getElementById('botaoBusca2');
  const resultadosLista = document.getElementById('resultados');
  const informacoesReceita = document.getElementById('informacoesReceita');
  const caixa1 = document.getElementById('caixa1');
  let segundaImagem = false; // Variável para controlar o estado da segunda imagem
  let caixa1Visivel = false; // Variável para controlar o estado da Caixa1

  
    // Função para realizar a pesquisa ----INÍCIO----
    const realizarPesquisa = () => {
      const termo = pesquisaInput.value.trim();
      const ingredientesMarcados = [...document.querySelectorAll('#checkbox-container input:checked')]
        .map(input => input.nextSibling.textContent.trim().toLowerCase());
    
      resultadosLista.innerHTML = '';
    
      // Carregar o arquivo JSON (FILTRO.JSON)
      fetch('filtro.json')
        .then(response => response.json())
        .then(data => {
          const receitas = data.receitas;
    
          const resultados = receitas
            .filter(receita =>
              receita.nome.toLowerCase().includes(termo) ||
              receita.ingredientes.some(i => ingredientesMarcados.includes(i.nome.toLowerCase()))
            )
            .map(receita => {
              const ingredientesDaReceita = receita.ingredientes.map(i => i.nome.toLowerCase());
              const quantidadeIngredientesMarcados = ingredientesMarcados.filter(ingrediente =>
                ingredientesDaReceita.includes(ingrediente)
              ).length;
    
              return {
                receita,
                quantidadeIngredientesMarcados
              };
            })
            .filter(({ quantidadeIngredientesMarcados }) => quantidadeIngredientesMarcados > 0); // Adicione esta condição
    
          // Ordenar os resultados com base na quantidade de ingredientes marcados
          resultados.sort((a, b) => b.quantidadeIngredientesMarcados - a.quantidadeIngredientesMarcados);
    
          if (resultados.length === 0) {
            resultadosLista.innerHTML = 'Nenhum resultado encontrado.';
          } else {
            resultados.forEach(({ receita }) => {
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
                    ${receita.ingredientes.map(ingrediente => `<li>${ingrediente.nome}</li>`).join('')}
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
    
    
    
    // Adicionar evento de clique ao primeiro botão de busca
    botaoBusca1.addEventListener('click', realizarPesquisa);
    
    // Adicionar evento de teclado ao campo de pesquisa
    pesquisaInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        realizarPesquisa();
      }
    });
  //-----FIM PESQUISA-------

  // Adicionar evento de clique ao segundo botão para alternar a imagem e mostrar/ocultar a Caixa1
  botaoBusca2.addEventListener('click', () => {
    segundaImagem = !segundaImagem; // Inverter o estado da segunda imagem

    if (segundaImagem) {
      // Adicione a URL da nova imagem SVG aqui
      botaoBusca2.innerHTML = '<img src="arrow-up-circle.svg" alt="nova imagem" height="20" width="20">';
      // Mostrar a Caixa1
      caixa1.style.display = 'block';
      caixa1Visivel = true;
    } else {
      // Adicione a URL da segunda imagem SVG aqui
      botaoBusca2.innerHTML = '<img src="arrow-down-circle.svg" alt="outra imagem" height="20" width="20">';
      // Ocultar a Caixa1
      caixa1.style.display = 'none';
      caixa1Visivel = false;
    }
   });

   const checkboxContainer = document.getElementById('checkbox-container');//MONTAGEM DA CAIXA2 E SEUS ELEMENTOS

   // Carregue o JSON a partir do arquivo "FILTRO.JSON"
   fetch('filtro.json') // Alterei o nome do arquivo para "FILTRO.json"
     .then(response => response.json())
     .then(data => {
       // Crie uma lista única de tipos de ingredientes
       const tiposDeIngredientes = [...new Set(data.receitas.flatMap(receita => receita.ingredientes.map(ingrediente => ingrediente.tipo)))];
   
       // Itere sobre os tipos de ingredientes
       tiposDeIngredientes.forEach(tipo => {
         // Crie um título para o tipo
         const titulo = document.createElement('h2');
         titulo.textContent = tipo;
         checkboxContainer.appendChild(titulo);
   
         // Crie uma lista única de ingredientes para o tipo atual
         const ingredientesDoTipo = [...new Set(data.receitas.flatMap(receita => receita.ingredientes.filter(ingrediente => ingrediente.tipo === tipo).map(ingrediente => ingrediente.nome)))];
   
         // Ordene os ingredientes em ordem alfabética
         ingredientesDoTipo.sort();
   
         // Itere sobre os ingredientes do tipo atual
         ingredientesDoTipo.forEach((ingrediente, index) => {
           const label = document.createElement('label');
           // Acessa apenas o nome do ingrediente
           label.innerHTML = `
             <input type="checkbox" name="opcao${index + 1}"> ${ingrediente}<br>
           `;
           checkboxContainer.appendChild(label);
         });
       });
     })
     .catch(error => console.error('Erro ao carregar o JSON: ', error));
   


});
