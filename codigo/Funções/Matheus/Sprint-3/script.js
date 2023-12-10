function addItem() {
    var itemName = document.getElementById('itemName').value;
    var itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (!itemName || isNaN(itemPrice) || itemPrice <= 0) {
        alert('Por favor, insira um nome e um preço válido.');
        return;
    }

    var table = document.getElementById('shoppingList').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = itemName;
    cell2.innerHTML = 'R$ ' + itemPrice.toFixed(2);

    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';

    updateTotal();
}

function updateTotal() {
    var total = 0;
    var table = document.getElementById('shoppingList').getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        total += parseFloat(table.rows[i].cells[1].innerHTML.replace('R$ ', ''));
    }

    var totalElement = document.getElementById('total');
    totalElement.innerHTML = 'Total de Gastos: <strong>R$ ' + total.toFixed(2) + '</strong>';
    totalElement.style.fontSize = '18px';
    totalElement.style.textAlign = 'center';
}
