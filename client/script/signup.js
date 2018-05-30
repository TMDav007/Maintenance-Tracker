const removeElement = (id) => {
    const element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

const signup = (e)=> {
const firstName= document.getElementById('firstName').value;
const lastName= document.getElementById('lastName').value;
const phoneNumber= document.getElementById('phoneNumber').value;
const email= document.getElementById('email').value;
const password= document.getElementById('password').value;
const password_confirmation= document.getElementById('passwordConfirmation').value;

console.log(password_confirmation);
    e.preventDefault();

    fetch('http://localhost:8000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json,*/*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, phoneNumber, email, password, password_confirmation})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.data.error);
         if (data.status === 'success') {  
            removeElement('firstNameError');
            document.getElementById("lastNameError").innerHTML = `* ${data.data.error.lastName}`;
            document.getElementById("emailError").innerHTML = `* ${data.data.error.email}`;
            document.getElementById("phoneNumberError").innerHTML = `* ${data.data.error.phoneNumber}`;
            document.getElementById("passwordError").innerHTML = `* ${data.data.error.password}`;
            document.getElementById("confirmPasswordError").innerHTML = `* ${data.data.error.password_confirmation}`;
         window.location.href= './../UI/signin.html';

   } else {
       
     document.getElementById("firstNameError").innerHTML = `* ${data.data.error.firstName}`;
     document.getElementById("lastNameError").innerHTML = `* ${data.data.error.lastName}`;
     document.getElementById("emailError").innerHTML = `* ${data.data.error.email}`;
     document.getElementById("phoneNumberError").innerHTML = `* ${data.data.error.phoneNumber}`;
     document.getElementById("passwordError").innerHTML = `* ${data.data.error.password}`;
     document.getElementById("confirmPasswordError").innerHTML = `* ${data.data.error.password_confirmation}`;
    
   }
    });

}


document.getElementById('signupUser').addEventListener('submit', signup);



