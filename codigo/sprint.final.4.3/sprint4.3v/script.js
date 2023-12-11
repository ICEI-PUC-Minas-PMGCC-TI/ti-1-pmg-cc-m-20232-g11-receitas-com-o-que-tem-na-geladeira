
  fetch('https://definitivo.pedroporto9.repl.co/receitas')
    .then(response => response.json())
    .then(data => {
      const recipes = data;
      console.log(recipes);
      if (window.location.pathname !== '/detalhes.html' && window.location.pathname !== '/salvos.html' && window.location.pathname !== '/lista.html') {

        const uniqueSingleWordIngredients = new Set();
        recipes.forEach(recipe => {
          recipe.ingredientes.forEach(ingredient => {
            const ingredientName = ingredient.nome.toLowerCase();
            if (!ingredientName.includes(' ')) {
              uniqueSingleWordIngredients.add(ingredientName);
            }
          });
        });


        const fixedIngredients = [...uniqueSingleWordIngredients].sort();


      





      const ingredientCheckboxes = document.getElementById('ingredientCheckboxes');
      function displayIngredientCheckboxes() {
        // Criar checkboxes para os ingredientes fixos
        fixedIngredients.forEach(ingredient => {
          createCheckbox(ingredient);
        });


      }







      function createCheckbox(ingredient) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = ingredient;
        checkbox.value = ingredient;
        checkbox.classList.add('form-check-input');




        const label = document.createElement('label');
        label.htmlFor = ingredient;
        label.appendChild(document.createTextNode(ingredient));

        ingredientCheckboxes.appendChild(checkbox);
        ingredientCheckboxes.appendChild(label);
        ingredientCheckboxes.appendChild(document.createElement('br'));
      }
      displayIngredientCheckboxes();

      


      function searchRecipes() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const selectedIngredients = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(checkbox => checkbox.value.toLowerCase());

        const recipesList = document.getElementById('recipesList');
        recipesList.innerHTML = '';

        recipes.forEach(recipe => {


          const isSaved = recipe.salvo === true;
          const checkboxChecked = isSaved ? 'checked' : '';

          if ((searchTerm === '' || recipe.nome.toLowerCase().includes(searchTerm)) &&
            selectedIngredients.every(selectedIngredient =>
              recipe.ingredientes.some(ingrediente => ingrediente.nome.toLowerCase() === selectedIngredient))
          ) {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('col-6');
            recipeDiv.classList.add('my-3');
            recipeDiv.innerHTML = `<div class="card h-100" data-id="${recipe.id}">
                <img src="${recipe.img}" class="card-img-top" alt="...">
            <div class="card-body">
          <h5 class="card-title">${recipe.nome}</h5>
          <p><strong>Ingredientes:</strong> ${getIngredients(recipe.ingredientes)}</p>
          <p><strong>Instruções:</strong> ${recipe.instrucoes}</p>
          <a href="detalhes.html?id=${recipe.id}" class="btn d-inline-flex m-2 btn-primary">Detalhes...</a>
          <div  class=" d-inline-flex m-2 form-check">
    <input type="checkbox" class="form-check-input" ${checkboxChecked} >
    <label class="form-check-label" for="exampleCheck1">salvo</label>
  </div>
        </div>
        </div>`;
            recipesList.appendChild(recipeDiv);
          }
        });
      }

      function getIngredients(ingredients) {
        return ingredients.map(ingredient => ingredient.nome).join(', ');
      }


      

      const searchButton = document.getElementById('searchButton');
      searchButton.addEventListener('click', searchRecipes);

 }



      

      

      

function setsalvo(id,status){

  fetch(`https://definitivo.pedroporto9.repl.co/receitas/`+id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({salvo: status})
  })



    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar o recurso');
      }
      return response.json();
    })
    .then(data => {
      console.log('Atualização realizada com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro ao atualizar:', error);
    });

} 


      
      
      
document.addEventListener('click', function (event) {
  const checkboxSalvar = event.target.closest('.form-check-input');
  if (checkboxSalvar) {
    const card = checkboxSalvar.closest('.card');
    const id = card.dataset.id;
    const status = checkboxSalvar.checked;
    setsalvo(id, status);
  }
});





      

fetch('https://definitivo.pedroporto9.repl.co/receitas')
    .then(response => response.json())
    .then(data => {
      const recipes = data;
      console.log(recipes);
      if (window.location.pathname !== '/detalhes.html' && window.location.pathname !== '/salvos.html' && window.location.pathname !== '/lista.html') {

        const uniqueSingleWordIngredients = new Set();
        recipes.forEach(recipe => {
          recipe.ingredientes.forEach(ingredient => {
            const ingredientName = ingredient.nome.toLowerCase();
            if (!ingredientName.includes(' ')) {
              uniqueSingleWordIngredients.add(ingredientName);
            }
          });
        });


        const fixedIngredients = [...uniqueSingleWordIngredients].sort();


      





      const ingredientCheckboxes = document.getElementById('ingredientCheckboxes');
      function displayIngredientCheckboxes() {
        // Criar checkboxes para os ingredientes fixos
        fixedIngredients.forEach(ingredient => {
          createCheckbox(ingredient);
        });


      }







      function createCheckbox(ingredient) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = ingredient;
        checkbox.value = ingredient;
        checkbox.classList.add('form-check-input');




        const label = document.createElement('label');
        label.htmlFor = ingredient;
        label.appendChild(document.createTextNode(ingredient));

        ingredientCheckboxes.appendChild(checkbox);
        ingredientCheckboxes.appendChild(label);
        ingredientCheckboxes.appendChild(document.createElement('br'));
      }
      displayIngredientCheckboxes();

      


      function searchRecipes() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const selectedIngredients = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(checkbox => checkbox.value.toLowerCase());

        const recipesList = document.getElementById('recipesList');
        recipesList.innerHTML = '';

        recipes.forEach(recipe => {


          const isSaved = recipe.salvo === true;
          const checkboxChecked = isSaved ? 'checked' : '';

          if ((searchTerm === '' || recipe.nome.toLowerCase().includes(searchTerm)) &&
            selectedIngredients.every(selectedIngredient =>
              recipe.ingredientes.some(ingrediente => ingrediente.nome.toLowerCase() === selectedIngredient))
          ) {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('col-6');
            recipeDiv.classList.add('my-3');
            recipeDiv.innerHTML = `<div class="card h-100" data-id="${recipe.id}">
                <img src="${recipe.img}" class="card-img-top" alt="...">
            <div class="card-body">
          <h5 class="card-title">${recipe.nome}</h5>
          <p><strong>Ingredientes:</strong> ${getIngredients(recipe.ingredientes)}</p>
          <p><strong>Instruções:</strong> ${recipe.instrucoes}</p>
          <a href="detalhes.html?id=${recipe.id}" class="btn d-inline-flex m-2 btn-primary">Detalhes...</a>
          <div  class=" d-inline-flex m-2 form-check">
    <input type="checkbox" class="form-check-input" ${checkboxChecked} >
    <label class="form-check-label" for="exampleCheck1">salvo</label>
  </div>
        </div>
        </div>`;
            recipesList.appendChild(recipeDiv);
          }
        });
      }

      function getIngredients(ingredients) {
        return ingredients.map(ingredient => ingredient.nome).join(', ');
      }


      

      const searchButton = document.getElementById('searchButton');
      searchButton.addEventListener('click', searchRecipes);

 }



      

      

      

function setsalvo(id,status){

  fetch(`https://definitivo.pedroporto9.repl.co/receitas/`+id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({salvo: status})
  })



    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar o recurso');
      }
      return response.json();
    })
    .then(data => {
      console.log('Atualização realizada com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro ao atualizar:', error);
    });

} 


      
      
      
document.addEventListener('click', function (event) {
  const checkboxSalvar = event.target.closest('.form-check-input');
  if (checkboxSalvar) {
    const card = checkboxSalvar.closest('.card');
    const id = card.dataset.id;
    const status = checkboxSalvar.checked;
    setsalvo(id, status);
  }
});




if (window.location.pathname !== '/detalhes.html' && window.location.pathname !== '/salvos.html' && window.location.pathname !== '/lista.html') {
      

searchRecipes();
 }

    })
    .catch(error => console.error('Erro ao carregar receitas:', error));




    })
    .catch(error => console.error('Erro ao carregar receitas:', error));



    















