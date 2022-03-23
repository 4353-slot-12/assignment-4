// class Quote{
//     constructor(id, gallonsRequested, deliveryAddress, deliveryDate){
//         this.id = id;
//         this.timeStamp = new Date();
//         this.gallonsRequested = gallonsRequested;
//         this.deliveryAddress = deliveryAddress;
//         this.deliveryDate = deliveryDate;
//         this.price = 1.00;
//         this.totalPrice = this.price * 5;
//     }
// }

// Date.prototype.yyyymmdd = function() {
//     var mm = this.getMonth() + 1; // getMonth() is zero-based
//     var dd = this.getDate();
  
//     return [this.getFullYear(),
//             (mm>9 ? '' : '0') + mm,
//             (dd>9 ? '' : '0') + dd
//            ].join('/');
// };

// const quote_history = []; 

// console.log("reached");

// let tmpDate = new Date(2022, 6, 5);
// let tmpQuote = new Quote(1, 23, "133 Apple Drive", tmpDate);
// quote_history.push(tmpQuote);

// tmpDate = new Date(2023, 3, 17);
// tmpQuote = new Quote(2, 52, "152 Orange Road", tmpDate);
// quote_history.push(tmpQuote);

// tmpDate = new Date(2022, 11, 20);
// tmpQuote = new Quote(3, 17, "6547 Yellowstone Drive", tmpDate);
// quote_history.push(tmpQuote);

// let tmpStr = '';
// let table = document.getElementById("quote-history-table");
// for (i = 0; i < quote_history.length; i++) {
//     tmpTimeStamp = datum.timeStamp.yyyymmdd()
//     tmpDeliveryDate = datum.deliveryDate.yyyymmdd()
//     tmpStr += '<tr>';
//     tmpStr += `<td>${tmpTimeStamp}</td>`;
//     tmpStr += `<td>${datum.gallonsRequested}</td>`;
//     tmpStr += `<td>${datum.deliveryAddress}</td>`;
//     tmpStr += `<td>${tmpDeliveryDate}</td>`;
//     tmpStr += `<td>$${datum.price}</td>`;
//     tmpStr += `<td>$${datum.totalPrice}</td>`;
//     tmpStr += '</tr>';
// }
// table.innerHTML = tmpStr;

function populateTable(data) {
    console.log(data)
    let table = document.getElementById("quote-history-table");
    let tmpStr = '';
    for (const datum of data) {
        tmpStr += '<tr>';
        tmpStr += `<td>${new Date(datum.timeStamp).toLocaleString()}</td>`;
        tmpStr += `<td>${datum.gallonsRequested}</td>`;
        tmpStr += `<td>${datum.deliveryAddress}</td>`;
        tmpStr += `<td>${new Date(datum.deliveryDate).toLocaleDateString()}</td>`;
        tmpStr += `<td>${datum.suggestedPrice}</td>`;
        tmpStr += `<td>${datum.totalPrice}</td>`;
        tmpStr += '</tr>';
    }
    table.innerHTML = tmpStr;
}


document.addEventListener("DOMContentLoaded", function() {
    // Runs on load to populate the address field.
    fetch('http://localhost:8080/api/quote', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
    })
    .then(response => response.json())
    .then(data => populateTable(data))
    .catch(err => console.error(err));
});