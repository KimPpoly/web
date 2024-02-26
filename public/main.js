
    
document.addEventListener('DOMContentLoaded',() => {
    const usernameinput = document.getElementById('username')
    const passwordinput = document.getElementById('password')
    const loginbutton = document.getElementById('loginbutton')
    const wrong = document.getElementById('wrongpw')
    

    

    loginbutton.addEventListener('click', (event) => {
        event.preventDefault();
        if((usernameinput.value == '') || (passwordinput.value.length < 6) && (passwordinput.value != '1213')) {
            wrong.style.fontSize = "14px";
            wrong.focus()
            // usernameinput.focus()
            return false
        } else {
            document.forms['login_form'].submit();
        }
        // if((passwordinput.value == '') && (passwordinput.value.length < 6)) {
        //     wrong.style.fontSize = "14px";
        //     passwordinput.focus()
        //     return false
        // }

    })

    passwordinput.addEventListener('input', () => {
        if(
            usernameinput.value.trim() === '' ||
            passwordinput.value.trim() === ''
        ) {
            loginbutton.disabled = true;
        } else {
            loginbutton.disabled = false;
        }
    });
});




