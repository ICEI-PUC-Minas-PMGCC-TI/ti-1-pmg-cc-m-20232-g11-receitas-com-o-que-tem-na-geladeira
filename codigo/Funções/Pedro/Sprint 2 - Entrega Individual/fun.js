function ledados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { agendamentos: [ 
                        { id: 1 , nome: "feijoada", data: "20/20/20", horario: "16:20", notificacao:"0" },
                        {id: 2 , nome: "batata gratinada", data: "20/20/20", horario: "16:20", notificacao:"0" }, 
                        {id: 3 , nome: "estrogonoff", data: "20/20/20", horario: "16:20", notificacao:"0" }
                    ]}
    }

    return objDados;
}


function reset(){
   let resetdados = { agendamentos: [ 
        { id: 1 , nome: "feijoada", data: "20/20/20", horario: "16:20", notificacao:"0" },
        {id: 2 , nome: "batata gratinada", data: "20/20/20", horario: "16:20", notificacao:"0" }, 
        {id: 3 , nome: "estrogonoff", data: "20/20/20", horario: "16:20", notificacao:"0" }
    ]}
    localStorage.setItem ('db', JSON.stringify (resetdados));


    imprimedados ();

}




function salvadados(dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
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

let strNome = document.getElementById ('camponome').value;
let strdata = document.getElementById ('campodata').value;
let strhorario = document.getElementById ('campotime').value;

let novoagendamento = {
    
    nome: strNome,
    data: strdata,
    horario: strhorario,
    notificacao: check
};
objDados.agendamentos.push (novoagendamento);

// Salvar os dados no localStorage novamente
salvadados (objDados);

// Atualiza os dados da tela
imprimedados ();
}








function imprimedados() {
    let tela = document.getElementById('tela');
    let strHtml = 'Tela de agendamentos';
    let objDados = ledados ();

    for (i=0; i< objDados.agendamentos.length; i++) {
        strHtml += `<p>${objDados.agendamentos[i].nome} - ${objDados.agendamentos[i].data} - ${objDados.agendamentos[i].horario} - ${objDados.agendamentos[i].notificacao}</p>`
    }

    tela.innerHTML = strHtml;
}



document.getElementById ('imprime').addEventListener ('click', imprimedados);
document.getElementById ('salvar').addEventListener ('click', incluiragendamento);
document.getElementById ('reseta').addEventListener ('click', reset);


