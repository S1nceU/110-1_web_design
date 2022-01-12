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
    .collection("user_manage")
    .get()
    .then(doclist => {
        doclist.forEach(element => {
            const user = element.data();
            if(user.role===0){
                const col = `<li>
                            useremail : ${user.username2} password : ${user.password2}
                        </li> `
            $("#listGroup").append(col);
            }
        });
    })