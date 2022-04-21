import { setToken } from '../store/state.js'

(() => {
    const btnLogin = document.getElementById('btn-login')

    const eventLoginBtn = () => {

        const user     = document.getElementById('username').value
        const password = document.getElementById('password').value
        const token    = document.getElementById('token').value

        if (token) {
            setToken(token)
            alert(`User added to socket : ${token}`)
        } else {
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': true,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user,
                    password
                })
            }
    
            fetch(`${baseApiUrl}/login`, options)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log("error");
                })
        }
    }

    btnLogin.addEventListener('click', eventLoginBtn)
})();