const firebaseConfig = {
    apiKey: "AIzaSyDOE5cr0k9818IXDnkIeYUMuf-_RbwrUxQ",
    authDomain: "finally-59ead.firebaseapp.com",
    projectId: "finally-59ead",
    storageBucket: "finally-59ead.appspot.com",
    messagingSenderId: "831861025589",
    appId: "1:831861025589:web:6917e25ed2833451b4ba7c"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function login(username) {
    const userQuery = db.collection("user_manage").where('username2', '==', username);
    const userSnapshot = await userQuery.get();

    const user = userSnapshot.docs[0].data();

    console.log(user);

    console.log("test");

    
    if(user.role === 0){
        window.location.href = "content.html";
    } else {
        window.location.href = "addmit.html";
    }
    console.log(user);
}

firebase.auth().onAuthStateChanged((user) => {
    console.log(1);
    if (user) {
        console.log(user);
        login(user.email);
    }
  });
  

const creatTodoButton = document.querySelector('#sign_sect');
creatTodoButton.addEventListener('click', addTodo);
async function addTodo(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
        await firebase.auth().signInWithEmailAndPassword(username, password);

        await login(username);
    } catch (error) {
        console.log(error);
        alert('你真棒');
        window.location.reload();
    }
}
const SignOut = document.querySelector('#out_sign');
SignOut.addEventListener('click',SIGNOUT);
async function SIGNOUT(event){
    event.preventDefault();
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
