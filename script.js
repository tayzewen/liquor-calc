let entries = JSON.parse(localStorage.getItem('entries')) || [];

class Entry {
    constructor(size, type, name, age, acqCost, allocation, garnish, markup, poursPerBtl, pourCost, pourPrice, netProfitMargin) {
        this.size = size
        this.type = type
        this.name = name
        this.age = age
        this.acqCost = acqCost
        this.allocation = allocation
        this.garnish = garnish
        this.markup = markup
        this.poursPerBtl = poursPerBtl
        this.pourCost = pourCost
        this.pourPrice = pourPrice
        this.netProfitMargin = netProfitMargin
    }
}

function getSize() {
    let size = document.getElementById("btl-size").value
    return size
}

function getType() {
    let type = document.getElementById("liquor-type").value
    return type
}

function getAge() {
    let age = document.getElementById("liquor-age").value
    return age
}

function getAgeMarkup() {
    let markup;
    let age = getAge()
    switch (true) {
        case (age >= 0 && age <= 5):
            markup = .25;
            break;
        case (age >= 6 && age <= 8):
            markup = .28
            break;
        case (age >= 9 && age <= 11):
            markup = .31
            break;
        case (age >= 12 && age <= 14):
            markup = .34
            break;
        case (age >= 15 && age <= 17):
            markup = .37
            break;
        case (age === 18 || age === 19):
            markup = .40
            break;
        case (age >= 20 && age <= 22):
            markup = .43
            break;
        case (age >= 23 && age <= 24):
            markup = .46
            break;
        case (age >= 25):
            markup = .50
            break;
        default:
            markup = .25
            break;
    }

    return markup
}

function calculate() {
    let size = getSize()
    let type = getType()
    let markup = getAgeMarkup()
    let age = getAge()
    let name = document.getElementById("product-name").value
    let acqCost = parseFloat(document.getElementById("acqCost").value).toFixed(2)

    if (size === "750mL") {
        poursPerBtl = 17
    } else if (size === "1L") {
        poursPerBtl = 22
    }

    let allocation = document.getElementById("allocation").checked
    let garnish = document.getElementById("garnish").checked

    let pourPrice;
    let allocationPrice = acqCost * 0.50
    let basePrice = acqCost * markup
    let garnishCharge = 0.50
    
    if (allocation && garnish) {
        pourPrice = parseFloat(basePrice + garnishCharge + allocationPrice).toFixed(2)
    } else if (allocation) {
        pourPrice = parseFloat(allocationPrice + basePrice).toFixed(2)
    } else if (garnish) {
        pourPrice = parseFloat(garnishCharge + basePrice).toFixed(2)
    } else {
        pourPrice = parseFloat(basePrice).toFixed(2)
    }

    let pourCost = (acqCost / poursPerBtl).toFixed(2)
    let preRevenue = (pourPrice * poursPerBtl)
    let shrinkage = preRevenue * 0.15
    let totalRevenue = preRevenue - shrinkage
    let netIncome = totalRevenue - acqCost
    let netProfitMargin = ((netIncome / totalRevenue) * 100).toFixed(2)
    
    console.log(size)
    console.log(type)
    console.log(name)
    console.log(age)
    console.log(acqCost)
    console.log(allocation)
    console.log(garnish)
    console.log(markup)
    console.log(poursPerBtl)
    console.log(pourCost)
    console.log(pourPrice)
    console.log(netProfitMargin)

    let newEntry = new Entry(size, type, name, age, acqCost, allocation, garnish, markup, poursPerBtl, pourCost, pourPrice, netProfitMargin)
    entries.push(newEntry)

    return newEntry;

}

function displayEntry() {
    let entry = calculate()
    console.log(entry)
    let entryOutputDiv = document.getElementById("entry-output")
    entryOutputDiv.innerHTML = `
    <strong>Size:</strong> ${entry.size}<br>
    <strong>Type:</strong> ${entry.type}<br>
    <strong>Name:</strong> ${entry.name}<br>
    <strong>Age:</strong> ${entry.age}<br>
    <strong>Acquisition Cost:</strong> $${entry.acqCost}<br>
    <strong>Pour Cost:</strong> $${entry.pourCost}<br>
    <strong>Pour Price:</strong> $${entry.pourPrice}<br>
    <strong>Net Profit Margin:</strong> ${entry.netProfitMargin}%
  `;

  createEntryBtns();
}

function createEntryBtns() {
    let existingSaveBtn = document.getElementById("saveBtn");
    let entryBtns = document.getElementById("entryBtns");
    if (!existingSaveBtn) {
        let saveBtn = document.createElement("button");
        saveBtn.innerHTML = "Save";
        saveBtn.id = "saveBtn";
        saveBtn.addEventListener("click", saveEntry);
        entryBtns.appendChild(saveBtn);
    } else if (saveBtn.disabled = true) {
        saveBtn.disabled = false
        saveBtn.innerHTML = "Save"
    }

    let existingViewEntriesBtn = document.getElementById("viewEntriesBtn");
    if (!existingViewEntriesBtn) {
        let viewEntriesBtn = document.createElement("button");
        viewEntriesBtn.innerHTML = "All Entries";
        viewEntriesBtn.id = "viewEntriesBtn";
        viewEntriesBtn.addEventListener("click", function() {
            window.location="entries.html"
        })
        entryBtns.appendChild(viewEntriesBtn);
    }
}


function saveEntry() {
    localStorage.setItem('entries', JSON.stringify(entries));

    let saveBtn = document.getElementById("saveBtn");
    saveBtn.innerHTML = "Saved!";
    saveBtn.disabled = true;
}