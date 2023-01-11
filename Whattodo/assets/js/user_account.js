let serverUrl = 'http://dev.thanqminh.com:3001/';
var user = null;

async function onLoadInit(){
    if (user == null) {
        try {
            const savedLogin = await checkToken();
            if (savedLogin) {
                document.getElementById('email').setAttribute("value", user.uid);
                document.getElementById('firstname').setAttribute("value", user.name);

                // document.getElementById('fname').setAttribute("value", user.fname);
                // document.getElementById('lname').setAttribute("value", user.lname);
            }
        } catch {
        }
    }
}

const checkToken = async () => {
    user = JSON.parse(await localStorage.getItem('user'));
    try {
        const response = await fetch(`${serverUrl}/profile`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...user
            },
        });

        localStorage.setItem('user',JSON.stringify(user));
        const body = await response.json();
        user.name = body.name;

        // user.fname = body.fname;
        // user.lname = body.lname;

        return true;
    } catch {
        return false;
    }
}

async function updateUserName() {
    if (user != null) {
        let name = firstname.value;
        // let fname = firstname.value;
        // let lname = lastname.value;

        const response = await fetch(`${serverUrl}/auth`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...user
            },
            body: JSON.stringify({
                name
                // fname,
                // lname
            })
        });

        user.name = name;
        // user.fname = fname;
        // user.lname = lname;

        if (response.ok) {
            alert("Yepp!")
        } else {
            alert("Fail!")
        }
    }
}