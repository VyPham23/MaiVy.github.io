let serverUrl = 'http://dev.thanqminh.com:3001';
var user = null;

function onLoadInit() {
    if (user == null) {
        try {
            user = JSON.parse(localStorage.getItem('user'));
            document.getElementById('currentUser').innerHTML = user.uid;
        } catch {

        }
    }
}

async function updateUserPassword() {
    if (user != null) {
        let password = newPass.value;
        let confirmNewPass = confNewPass.value;

        if (password == confirmNewPass) {
            const response = await fetch(`${serverUrl}/auth`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...user
                },
                body: JSON.stringify({
                    user: {
                        password,
                        password_confirmation: password
                    }
                })
            });

            if (response.ok) {
                alert("Change password successfully.")
                window.location.assign("home_page.html")
            } else {
                alert("Cannot change your password.")
            }
        } else {
            alert("Your confirm password and new password do not match")
        }
    }
}