let message = document.getElementById("message");
let modal = document.getElementById("modal_make_request");

/**
 * @desc sign in a user
 * 
 * params {string} e
 * 
 */
const signin = (e)=> {
const email= document.getElementById('email').value;
const password= document.getElementById('password').value;

    e.preventDefault();

    fetch('https://maintaintracker.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json,*/*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => res.json())
    .then((data) => {
         if (data.status === 'success') {  
            localStorage.setItem('token', data.data.token);
            const token =  localStorage.getItem('token');
            console.log(token);
            window.location.href= './../UI/request.html';

   } else if (data.message) {
    message.innerHTML = data.message;
    modal.style.display = "block";
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.display = "none";
      modal.style.display = "none";
    }, 3000);
  } else {
     document.getElementById("emailError").innerHTML = data.data.error.email || '';
     document.getElementById("passwordError").innerHTML = data.data.error.password || '';
   }
    });
}


document.getElementById('signinUser').addEventListener('submit', signin);