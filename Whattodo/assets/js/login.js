let serverUrl = 'http://dev.thanqminh.com:3001/';
var user = null;

const login = async () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const response = await fetch(`${serverUrl}//auth/sign_in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    });

    if (response.ok) {
        user = {
            'access-token': response.headers.get('access-token'),
            uid: response.headers.get('uid'),
            client: response.headers.get('client')
        };
        localStorage.setItem('user',JSON.stringify(user));

        alert("Login successfully")
        window.location.assign("home_page.html")
    } else {
        alert("Wrong email or password. Please login again")
    }
}
