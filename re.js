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
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
// db 
//     .collection("user_manage")
//     .get()
//     .then(doclist => {
//         // doclist.forEach(element => {
//         //     const user = element.data();
//         //     const col = `<li class="list-group-item">
//         //                     <span class="box bg-${user.color}"></span>
//         //                     ${user.title}
//         //                 </li> `
//         //     $("#listGroup").append(col);
//         // });
//     })
const creatTodoButton = document.querySelector('button');
creatTodoButton.addEventListener('click', addTodo);
async function addTodo(event) {
    event.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const username2 = document.getElementById("username2").value;
    const password2 = document.getElementById("password2").value;
    const comfirm_password = document.getElementById("comfirm_password").value;
    await firebase.auth().createUserWithEmailAndPassword(username2, password2)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            console.log("i want to sign up account.");
            db.collection('user_manage').add({
                fullname,
                username2,
                password2,
                comfirm_password
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("sign up error.");
            window.location.reload();
        });
    console.log("test");
    alert("sign up finish.");
    window.location.href = "index.html";

}