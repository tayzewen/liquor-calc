(function retrieveEntries() {
    let savedEntries = localStorage.getItem('entries');
    if (savedEntries) {
        entries = JSON.parse(savedEntries);
    }
    
    console.log(entries)

    displayData();
}) ();

function displayData() {
    let entryOutput = document.getElementById("entriesOutput")
    entryOutput.innerHTML = ""

    let table = document.createElement("table");
    table.classList.add("entries-table");

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `
      <th>Size</th>
      <th>Type</th>
      <th>Name</th>
      <th>Age</th>
      <th>Acquisition Cost</th>
      <th>Pour Cost</th>
      <th>Pour Price</th>
      <th>Net Profit Margin</th>
    `;
    table.appendChild(tableHeader);

    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
          <td>${entry.size}</td>
          <td>${entry.type}</td>
          <td>${entry.name}</td>
          <td>${entry.age}</td>
          <td>$${entry.acqCost}</td>
          <td>$${entry.pourCost}</td>
          <td>$${entry.pourPrice}</td>
          <td>${entry.netProfitMargin}%</td>
          <td><button class="delete-entry-btn" onclick="deleteEntry(${i})">X</button></td>
        `;
        table.appendChild(tableRow);
      }

      entryOutput.appendChild(table);

}

function deleteEntry(index) {
    entries.splice(index, 1)
    localStorage.setItem('entries', JSON.stringify(entries));
    displayData();
}

function exportToExcel() {
  let table = document.querySelector('.entries-table');
  let rows = table.getElementsByTagName('tr');
  
  let csvContent = 'data:text/csv;charset=utf-8,';
  

  for (let row of rows) {
    let rowData = [];
    
  
    for (let cell of row.cells) {
      rowData.push(cell.textContent);
    }
    
    let rowString = rowData.join(',');
    csvContent += rowString + '\r\n';
  }
  
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'liquorCalculations.csv');
  document.body.appendChild(link);

  link.click();
  
  document.body.removeChild(link);
}