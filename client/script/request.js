let token;
const message = document.getElementById("message");
const requestExistMessage = document.getElementById("requestExistMessage");
const requestExistModal = document.getElementById("requestExistModal");
const modal = document.getElementById("message_modal");

/**
 * @desc sign in a user
 * 
 * params {string} e
 * 
 */
const getAllRequest = (e)=> {
token =  localStorage.getItem('token');
    e.preventDefault();
    fetch('/api/v1/users/requests', {
        method: 'GET',
        headers: {
            'Accept': 'application/json,*/*',
            'Content-type': 'application/json',
            'x-access-token': token
        }     
    })
    .then((res) => { if (res.status === 401){
      message.innerHTML = 'You are unauthorized';
      modal.style.display = "block";
      setTimeout(() => {
       modal.style.display = "none";
     }, 5000); 
      window.location.href = "./../../client/signin.html";
    } 
    return res.json();
   })
    .then((data) => {
         if (data.status === 'success') {  
            data.data.requests.forEach((request, index) => {
            addTableRow(request, index);
        });
   } else if (data.message) {
    message.innerHTML = data.message;
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.display = "none";
    }, 3000);
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
    cell4.innerHTML = requests.date.slice(0,10);
    cell5.innerHTML = '<i class="fa fa-edit editRequest"><i>';
    cell5.setAttribute('id', `request_body${index+1}`);
    cell6.innerHTML = '<i class="fa fa-trash deleteRequest"><i>';
}

/**
 * @desc it creates a new requests
 * 
 * @param {string} e
 */
const createRequest = e => {
  e.preventDefault();
    const requestTitle = document.getElementById("requestTitle").value;
    const requestBody = document.getElementById("requestBody").value;
    const date = document.getElementById("date").value;
    fetch("/api/v1/users/requests", {
      method: "POST",
      headers: {
        Accept: "application/json,*/*",
        "Content-type": "application/json",
        'x-access-token': token
      },
      body: JSON.stringify({
       requestTitle,
       requestBody,
       date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          window.location.reload();
        } else if (data.message) {
          requestExistMessage.innerHTML = data.message;
          requestExistModal.style.display = "block";
          setTimeout(() => {
          requestExistModal.style.display = "none";
        }, 3000);
        } else {
          document.getElementById("requestTitleError").innerHTML =
            data.data.error.requestTitle || "";
          document.getElementById("requestBodyError").innerHTML =
            data.data.error.requestBody || "";
          document.getElementById("dateError").innerHTML =
            data.data.error.date || "";
        }
      });
}


document.getElementById("make_request_content").addEventListener("submit", createRequest);
window.onload = getAllRequest;