let message = document.getElementById("message");
let modal = document.getElementById("modal_make_request");

/**
 * @desc sign in an admin
 * 
 * params {string} e
 * 
 */
const adminSignin = (e)=> {
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
    
        e.preventDefault();
    
        fetch('/api/v1/auth/login', {
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
                window.location.href= './../../client/admin.html';
    
       } else if (data.message) {
        message.innerHTML = data.message;
        modal.style.display = "block";
        setTimeout(() => {
          modal.style.display = "none";
        }, 3000);
      } else {
         document.getElementById("emailError").innerHTML = data.data.error.email || '';
         document.getElementById("passwordError").innerHTML = data.data.error.password || '';
       }
        });
    }


document.getElementById('signin_admin').addEventListener('submit', adminSignin);