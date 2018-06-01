
let message = document.getElementById("message");
let modal = document.getElementById("message_modal");
const requestDetail = document.getElementById('request_details_content');
const requestDetailModal = document.getElementById('modals_request_details');

/**
 * @desc sign in a user
 * 
 * params {string} e
 * 
 */
const getAllRequest = (e)=> {
const token =  localStorage.getItem('token');
    e.preventDefault();
    fetch('https://maintaintracker.herokuapp.com/api/v1/users/requests', {
        method: 'GET',
        headers: {
            'Accept': 'application/json,*/*',
            'Content-type': 'application/json',
            'x-access-token': token
        }
        
    })
    .then((res) => res.json())
    .then((data) => {
         if (data.status === 'success') {  
            data.data.requests.forEach((request, index) => {
            addTableRow(request, index);
        });
   } else {
    message.innerHTML = 'You have not make any request';
    modal.style.display = "block";
    setTimeout(() => {
     modal.style.display = "none";
   }, 7000);
   }
    });
}


/**
 * @desc it add a row to a table
 * 
 * @param {array} requests 
 * @param {integer} index 
 */
const addTableRow = (requests, index) => {
    const table = document.getElementById('table');
   
    const newRow = table.insertRow(table.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.innerHTML = index + 1;
    cell2.innerHTML = requests.request_title;
    cell2.setAttribute('class', '.requestDetail')
    cell3.innerHTML = requests.request_status;
    cell4.innerHTML = requests.date;
    cell5.innerHTML = '<i class="fa fa-edit editRequest"><i>';
    cell5.setAttribute('id', `request_body${index+1}`);
    cell6.innerHTML = '<i class="fa fa-trash deleteRequest"><i>';
}

window.onload = getAllRequest;
