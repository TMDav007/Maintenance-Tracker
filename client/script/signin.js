const removeElement = (id) => {
    const element = document.getElementById(id);
    element.parentNode.removeChild(element);
}
const signin = (e)=> {
const email= document.getElementById('email').value;
const password= document.getElementById('password').value;

    e.preventDefault();

    fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json,*/*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.data);
         if (data.status === 'success') {  
            localStorage.setItem('token', data.data);
            window.location.href= './../UI/request.html';

   } else {
     document.getElementById("emailError").innerHTML = data.data.error.email || '';
     document.getElementById("passwordError").innerHTML = data.data.error.password || '';
   }
    });

}


document.getElementById('signinUser').addEventListener('submit', signin);