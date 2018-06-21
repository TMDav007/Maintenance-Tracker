let token, tableRowIndex, requestBodyCell, requestId;
const message = document.getElementById("message");
const requestExistMessage = document.getElementById("requestExistMessage");
const requestExistModal = document.getElementById("requestExistModal");
const modifyRequestModal = document.getElementById("modal_modify_request");
const modifyRequestContent = document.getElementById("modify_request_content");
const modal = document.getElementById("message_modal");
let table = document.getElementById("table");
const reqTitle = document.getElementById("reqTitle");
const reqBody = document.getElementById("reqBody");
let requestTitle = document.getElementById("requestsTitle");
let requestBody = document.getElementById("requestsBody");
let date = document.getElementById("requestsDate");
const reqStatus = document.getElementById("reqStatus");
const reqDate = document.getElementById("reqDate");
const requestDetailModal = document.getElementById("modal_request_details");
const deleteRequestModal = document.getElementById("modal_delete_request");
/**
 * @desc sign in a user
 *
 * params {string} e
 *
 */
const getAllRequest = e => {
  token = localStorage.getItem("token");
  e.preventDefault();
  fetch("/api/v1/users/requests", {
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
        }, 5000);
        window.location.href = "./../../client/signin.html";
      }
      return res.json();
    })
    .then(data => {
      if (data.status === "success") {
        data.data.requests.forEach((request, index) => {
          addTableRow(request, index);
        });
        viewARequest();
        getRequestId();
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

  cell1.innerHTML = index + 1;
  cell2.innerHTML = requests.request_title;
  cell2.setAttribute("class", "requestDetail");
  cell3.innerHTML = requests.request_status;
  cell4.innerHTML = requests.date.slice(0, 10);
  cell5.innerHTML = '<i class="fa fa-edit editRequest"><i>';
  cell5.setAttribute("id", `request_body${index + 1}`);
  cell6.innerHTML = '<i class="fa fa-trash deleteRequest"><i>';
  cell7.innerHTML = requests.request_body;
  cell7.style.display = 'none';
  cell8.innerHTML = requests.id;
  cell8.style.display = 'none';

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
      reqTitle.innerHTML = tableRowIndex.childNodes[1].textContent
      reqBody.innerHTML = tableRowIndex.childNodes[6].textContent;
      reqStatus.innerHTML = tableRowIndex.childNodes[2].textContent;
      reqDate.innerHTML = tableRowIndex.childNodes[3].textContent;
      requestDetailModal.style.display = 'block';
      setTimeout(() => {
        requestDetailModal.style.display = 'none';
      }, 3000);
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
     localStorage.setItem('requestId', table.rows[i].childNodes[7].textContent);
     requestTitle.value = table.rows[i].childNodes[1].textContent;
     requestBody.value = table.rows[i].childNodes[6].textContent;
     date.value = table.rows[i].childNodes[3].textContent;
     modifyRequestModal.style.display = 'block';
     modifyRequestContent.style.display = 'block';
   });

   table.rows[i].childNodes[5].addEventListener("click", () => {
    localStorage.setItem('requestIdToDelete', table.rows[i].childNodes[7].textContent);

    deleteRequestModal.style.display = 'block';
    // modifyRequestContent.style.display = 'block';
  });
  }
};


/**
 * @desc it modify a requests
 *
 * @param {string} e
 */
const modifyRequest = e => {
  requestId = localStorage.getItem("requestId");
  e.preventDefault();
  const requestTitle = document.getElementById("requestsTitle").value;
  const requestBody = document.getElementById("requestsBody").value;

  fetch(`/api/v1/users/requests/${requestId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json,*/*",
      "Content-type": "application/json",
      "x-access-token": token
    },
    body: JSON.stringify({
      request_title: requestTitle,
      request_body: requestBody
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
      }
    });
};

/**
 * @desc it delete a request
 *
 * @param {string} e
 */
const deleteRequest = e => {
  requestId = localStorage.getItem("requestIdToDelete");
  e.preventDefault();
  const requestTitle = document.getElementById("requestsTitle").value;
  const requestBody = document.getElementById("requestsBody").value;

  fetch(`/api/v1/users/requests/${requestId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json,*/*",
      "Content-type": "application/json",
      "x-access-token": token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        document.getElementById("modal_delete_request").style.display = 'none';
        window.location.reload();
      } else {
        requestExistMessage.innerHTML = data.message;
        requestExistModal.style.display = "block";
        setTimeout(() => {
          requestExistModal.style.display = "none";
        }, 3000);
      }
    });
};

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
      "x-access-token": token
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
      }
    });
};

document.getElementById("make_request_content").addEventListener("submit", createRequest);
document.getElementById("modify_request_content").addEventListener("submit", modifyRequest);
document.getElementById("yes").addEventListener("click", deleteRequest);
document.getElementById("no").addEventListener("click", ()=> {
  document.getElementById("modal_delete_request").style.display = 'none';
});
window.onload = getAllRequest;
