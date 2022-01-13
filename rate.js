const firebaseConfig = {
    apiKey: "AIzaSyDOE5cr0k9818IXDnkIeYUMuf-_RbwrUxQ",
    authDomain: "finally-59ead.firebaseapp.com",
    projectId: "finally-59ead",
    storageBucket: "finally-59ead.appspot.com",
    messagingSenderId: "831861025589",
    appId: "1:831861025589:web:6917e25ed2833451b4ba7c"
  };

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const SignOut = document.querySelector('#out_sign');
SignOut.addEventListener('click',SIGNOUT);
async function SIGNOUT(event){
    event.preventDefault();
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("sign out successful.");
        window.location.href = "index.html";
    }).catch((error) => {
        // An error happened.
        console.log("sign out error.");
    });
}
db 
    .collection("rate")
    .get()
    .then(doclist => {
        doclist.forEach(element => {
            const user = element.data();
            const col = `<tr>
                                <td align="center" valign="center">${user.user2}</td>
                                <td align="center" valign="center">${user.rate}</td>
                        </td> `
            $("#listGroup").append(col);
            
        });
    })
const list = db.collection("user_manage")
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("i want to do something bad.");
        console.log(user);
        if(user.uid === "bPOhasJCwSS7TCqHOunEgZozNaa2"){
        }
        else{
            window.location.href = "index.html";
            alert("你壞壞!!");
        }
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
    } else {
        // User is signed out
        window.location.href = "index.html";
        alert("你壞壞!!");
    }
});