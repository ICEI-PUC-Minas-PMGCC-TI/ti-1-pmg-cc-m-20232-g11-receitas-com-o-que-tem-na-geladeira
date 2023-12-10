function addItem() {
    var itemName = document.getElementById('itemName').value;
    var itemQuantity = parseFloat(document.getElementById('itemQuantity').value);
    var quantityUnit = document.getElementById('quantityUnit').value;
    var itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (!itemName || isNaN(itemQuantity) || itemQuantity <= 0 || isNaN(itemPrice) || itemPrice <= 0) {
        alert('Por favor, insira informações válidas.');
        return;
    }

    var totalPrice = itemQuantity * itemPrice; // Multiplica a quantidade pelo preço

    var table = document.getElementById('shoppingList').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    cell1.innerHTML = itemName;
    cell2.innerHTML = itemQuantity + ' ' + quantityUnit;
    cell3.innerHTML = 'R$ ' + totalPrice.toFixed(2);

    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('quantityUnit').value = 'unidades';
    document.getElementById('itemPrice').value = '';

    updateTotal();
}
