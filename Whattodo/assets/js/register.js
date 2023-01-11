let serverUrl = 'http://dev.thanqminh.com:3001';
const register = async () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('pwd').value;
    let conPassword = document.getElementById('con_pwd').value;

    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;

    if (conPassword != password) {
        alert("Your confirm password does not match your password. Please enter again");
    } else {
        const response = await fetch(`${serverUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                fname,
                lname
            })
        });

        if (response.ok) {
            alert("Register successfully. Please login your account!");
            window.location.assign("login.html")
        } else {
            alert("Fail sign-up. Please check your information")
        }
    }
}
