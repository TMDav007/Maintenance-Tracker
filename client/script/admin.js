let token, tableRowIndex, requestBodyCell, requestId, approvedRequestId;
const message = document.getElementById("message");
const modal = document.getElementById("message_modal");
const requestDetailModal = document.getElementById("modal_request_details");
let selectedRequest = document.getElementsByClassName("adminRequest");

/**
 * @desc get all request
 *
 * params {string} e
 *
 */
const getAllRequest = e => {
    token = localStorage.getItem("token");
    e.preventDefault();
    fetch("/api/v1/requests", {
      method: "GET",
      headers: {
        Accept: "application/json,*/*",
        "Content-type": "application/json",
        "x-access-token": token
      }
    })
      .then(res => {
        if (res.status === 401) {
          message.innerHTML = "You are unauthorized";
          modal.style.display = "block";
          setTimeout(() => {
            modal.style.display = "none";
          }, 7000);
          window.location.href = "./../../client/signin.html";
        } else if (res.status === 403) {
            message.innerHTML = "You are forbidden";
            modal.style.display = "block";
            setTimeout(() => {
                modal.style.display = "none";
            }, 7000);
            window.location.href = "./../../client/request.html";
        }
        return res.json();
      })
      .then(data => {
         if (data.status === "success") {
           data.data.requests.forEach((request, index) => {
             addTableRow(request, index);
           });
          viewARequest();
          resolveOnclick();
          getRequestId();
          processRequest();
         } else if (data.message) {
          message.innerHTML = data.message;
          modal.style.display = "block";
          setTimeout(() => {
            modal.style.display = "none";
          }, 3000);
        } else {
          message.innerHTML = "You have not make any request";
          modal.style.display = "block";
          setTimeout(() => {
            modal.style.display = "none";
          }, 7000);
        }
      });
  };
  

/**
 * @desc it add a row to a table
 *
 * @param {array} requests
 * @param {integer} index
 */
const addTableRow = (requests, index) => {
    const newRow = table.insertRow(table.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    const cell8 = newRow.insertCell(7);
    const cell9 = newRow.insertCell(8);
    const cell10 = newRow.insertCell(9);

    cell1.innerHTML = index + 1;
    cell2.innerHTML = `${requests.first_name} ${requests.last_name}`;
    cell3.innerHTML = requests.request_title;
    cell3.style.display = 'none';
    cell2.setAttribute("class", "requestDetail");
    cell4.innerHTML = requests.request_status;
  
    if (requests.request_status === 'processing') {
      cell5.innerHTML = `<select name="adminRequest" class="adminRequest"><option value="">select</option>
      <option value="approve">Approve</option>
      <option value="disapprove">Disapprove</option></select>`;
      cell6.innerHTML = '<i class="fa fa-check editRequest" style = "opacity:.4;"> <i>';
    } else if (requests.request_status === 'disapproved') {
      cell5.innerHTML = `<select name="adminRequest" class="adminRequest" disabled>
      <option value="disapprove">Disapprove</option>
      </select>`;
      cell6.innerHTML = '<i class="fa fa-check editRequest" style = "opacity:.4;"><i>';  
    } else if (requests.request_status === 'resolved') {
      cell5.innerHTML = `<select name="adminRequest" class="adminRequest" disabled>
      <option value="approve">Approve</option>
      </select>`
      cell6.innerHTML = '<i class="fa fa-check editRequest" style = "opacity:.4;"><i>';
    } else {
      cell5.innerHTML = `<select name="adminRequest" class="adminRequest" disabled>
      <option value="approve">Approve</option>
      </select>`
      cell6.innerHTML = '<i class="fa fa-check editRequest" ><i>';
    }
   
    cell7.innerHTML = '<i class="fa fa-trash deleteRequest"><i>';
    cell8.innerHTML = requests.request_body;
    cell8.style.display = 'none';
    cell9.innerHTML = requests.id;
    cell9.style.display = 'none';
    cell10.innerHTML = requests.date.slice(0, 10);
    cell10.style.display = 'none';
  };

  /**
 * @desc it displays a request when the request title is clicked
 *
 * 
 */
const viewARequest = () => {
    for (let i = 0; i < table.rows.length; i += 1) {
       table.rows[i].childNodes[1].addEventListener("click", () => {
       tableRowIndex = table.rows[i];
        reqTitle.innerHTML = tableRowIndex.childNodes[2].textContent
        reqBody.innerHTML = tableRowIndex.childNodes[7].textContent;
        reqStatus.innerHTML = tableRowIndex.childNodes[3].textContent;
        reqDate.innerHTML = tableRowIndex.childNodes[9].textContent;
        requestDetailModal.style.display = 'block';
        setTimeout(() => {
          requestDetailModal.style.display = 'none';
        }, 5000);
      });
    }
  };

  /**
 * @desc it get the  requestId when the edit icon is clicked
 *
 * 
 */
const getRequestId = (e) => {
    for (let i = 0; i < table.rows.length; i += 1) {
       table.rows[i].childNodes[4].addEventListener("click", () => {
       localStorage.setItem('userRequestId', table.rows[i].childNodes[8].textContent);
     });
     table.rows[i].childNodes[5].addEventListener("click", () => {
      localStorage.setItem('userRequestId', table.rows[i].childNodes[8].textContent);
    });
    }
  };
  
 /**
 * @desc it displays approve and disaprove confirmation
 *
 * 
 */
const processRequest = () => {
  for (let i = 0; i < selectedRequest.length ; i += 1) {
    selectedRequest[i].addEventListener("click", () => {
      if (selectedRequest[i].value === 'approve'){
        document.getElementById("modal_approve_request").style.display = 'block';
      } else if (selectedRequest[i].value === 'disapprove'){
        document.getElementById("modal_disapprove_request").style.display = 'block';
      }
    });
 }
};

 /**
 * @desc it displays a resolve request confrimation
 *
 * 
 */
const resolveOnclick = () => {
  for (let i = 0; i < table.rows.length; i += 1) {
    tableRowIndex = table.rows[i];
    if (table.rows[i].childNodes[3].textContent === 'pending'){
      table.rows[i].childNodes[5].addEventListener("click", () => {
        document.getElementById("modal_resolve_request").style.display = 'block';
     });
    }
  }
}

 /**
 * @desc it disable a check icon 
 *
 * 
 */
const disableButton = () => {
  const resolvedButton = document.getElementsByClassName("editRequest");
  for (let i = 0; i < resolvedButton.length; i += 1) {
    // cell6.innerHTML = '<i class="fa fa-check editRequest" style = "opacity:.4;"><i>';
    }
  }

const no = document.getElementsByClassName("no");
for (let i = 0; i< no.length ; i += 1){
  no[i].addEventListener("click", ()=> {
    document.getElementById("modal_disapprove_request").style.display = 'none';
    document.getElementById("modal_approve_request").style.display = 'none';
    document.getElementById("modal_resolve_request").style.display = 'none';
  });
}

 /**
 * @desc itapproves a request
 *
 * 
 */
const approveRequest = () => {
  fetch(`/api/v1/requests/${localStorage.getItem("userRequestId")}/approve`, {
    method: "PUT",
    headers: {
      Accept: "application/json,*/*",
      "Content-type": "application/json",
      "x-access-token": token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        window.location.reload();
        document.getElementById("modal_approve_request").style.display = 'none';
      } else {
        document.getElementById("modal_approve_request").style.display = 'none';
        requestExistMessage.innerHTML = data.message;
        requestExistModal.style.display = "block";
        setTimeout(() => {
          requestExistModal.style.display = "none";
        }, 4000);
      }
    });
}

 /**
 * @desc it  disaprove a request
 *
 * 
 */
const disapproveRequest = () => {
  fetch(`/api/v1/requests/${localStorage.getItem("userRequestId")}/disapprove`, {
    method: "PUT",
    headers: {
      Accept: "application/json,*/*",
      "Content-type": "application/json",
      "x-access-token": token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        window.location.reload();
        document.getElementById("modal_disapprove_request").style.display = 'none';
      } else {
        document.getElementById("modal_disapprove_request").style.display = 'none';
        requestExistMessage.innerHTML = data.message;
        requestExistModal.style.display = "block";
        setTimeout(() => {
          requestExistModal.style.display = "none";
        }, 4000);
      }
    });
}

 /**
 * @desc it  resolve a request
 *
 * 
 */
const resolveRequest = () => {
  fetch(`/api/v1/requests/${localStorage.getItem("userRequestId")}/resolve`, {
    method: "PUT",
    headers: {
      Accept: "application/json,*/*",
      "Content-type": "application/json",
      "x-access-token": token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        window.location.reload();
        document.getElementById("modal_resolve_request").style.display = 'none';
       // removeEventListener("click", disableButton);
      } else {
        document.getElementById("modal_resolve_request").style.display = 'none';
        requestExistMessage.innerHTML = data.message;
        requestExistModal.style.display = "block";
        setTimeout(() => {
          requestExistModal.style.display = "none";
        }, 4000);
      }
    });
}

document.getElementById("resolve").addEventListener("click", resolveRequest);
document.getElementById("approve").addEventListener("click", approveRequest);
document.getElementById("disapprove").addEventListener("click", disapproveRequest);
  window.onload = getAllRequest;