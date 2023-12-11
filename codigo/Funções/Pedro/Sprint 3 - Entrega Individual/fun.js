function ledados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = {
            agendamentos: [
                
            ]
        }
    }

    return objDados;
}


function reset() {
    let resetdados = {
        agendamentos: [
            
        ]
    }
    localStorage.setItem('db', JSON.stringify(resetdados));


    imprimedados();

}




function salvadados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}








function incluiragendamento() {
    //ler checkbox
    var checkbox = document.getElementById("campocheck");


    // Verificar se a caixa de seleção está marcada
    if (checkbox.checked) {
        var check = '1';
    } else {
        var check = '0';
    }

    // Ler os dados do localStorage
    let objDados = ledados();

    // Incluir um novo contato

    let strNome = document.getElementById('camponome').value;
    let strdata = document.getElementById('campodata').value;
    let strhorario = document.getElementById('campotime').value;

    let novoagendamento = {

        nome: strNome,
        data: strdata,
        horario: strhorario,
        notificacao: check
    };
    objDados.agendamentos.push(novoagendamento);

    // Salvar os dados no localStorage novamente
    salvadados(objDados);

    // Atualiza os dados da tela
    imprimedados();
}


function obterPrimeiraPalavra(texto) {
    return texto.split(' ')[0]; // Divide a string em palavras e retorna a primeira
}





function imprimedados() {
    let tela = document.getElementById('tela');
    let strHtml = '<button id="reseta" class="btn btn-primary my-3"> Tela de agendamentos</button>'
    let objDados = ledados();

    for (i = 0; i < objDados.agendamentos.length; i++) {
        for (j = 0; j < dados.receitas.length; j++) {
            let primeira1 = obterPrimeiraPalavra(objDados.agendamentos[i].nome.toString()).toLowerCase();
            let primeira2 = obterPrimeiraPalavra(dados.receitas[j].nome.toString()).toLowerCase();
            if (primeira1 === primeira2) {
                var link = dados.receitas[j].img
                var ingredientes = dados.receitas[j].ingredientes
            }
            


        }

if(objDados.agendamentos[i].notificacao === '0'){

    strHtml += `<div class="card w-100 my-2" style="width: 18rem;">
    <img src="${link}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${objDados.agendamentos[i].nome}</h5>
    <p class="card-text">${ingredientes}</p>
    <p> marcado para<a href="#" class="btn btn-primary">${objDados.agendamentos[i].data}-${objDados.agendamentos[i].horario}</a></p>
    </div>
    <h4>notificação<span class="badge bg-secondary">desligada</span></h4>
    </div>`
}else if(objDados.agendamentos[i].notificacao === '1'){
    strHtml += `<div class="card w-100 my-2" style="width: 18rem;">
    <img src="${link}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${objDados.agendamentos[i].nome}</h5>
    <p class="card-text">${ingredientes}</p>
    <p> marcado para <a href="#" class="btn btn-primary">${objDados.agendamentos[i].data}-${objDados.agendamentos[i].horario}</a></p>
    </div>
    <h4>notificação<span class="badge bg-secondary">ligada</span></h4>
    </div>`
}








    link = ` `
    }

    tela.innerHTML = strHtml;
}



document.getElementById('imprime').addEventListener('click', imprimedados);
document.getElementById('salvar').addEventListener('click', incluiragendamento);
document.getElementById('reseta').addEventListener('click', reset);


