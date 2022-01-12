// function show_hide() {
//     var login = document.getElementById("container1");
//     var signup = document.getElementById("container2");
  
//     if (login.style.display === "none") {
//         login.style.display = "block";  //login出現
//         document.getElementById("username").value="";
//         document.getElementById("password").value="";
//         signup.style.display = "block";  //signup消失
//     } 
//     else {
//         login.style.display = "none";   //login消失
//         signup.style.display = "block"; //signup出現
//         signup.style.visibility="visible";
     
//         document.getElementById("fullname").value="";
//         document.getElementById("username2").value="";
//         document.getElementById("password2").value="";
//         document.getElementById("comfirm_password").value="";
//     }
// }
// Your web app's Firebase configuration
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

// db 
//     .collection("user_manage")
//     .get()
//     .then(doclist => {
//         doclist.forEach(element => {
//             const user = element.data();
//             const col = `<li class="list-group-item">
//                             <span class="box bg-${user.color}"></span>
//                             ${user.title}
//                         </li> `
//             $("#listGroup").append(col);
//         });
//     })

const creatTodoButton = document.querySelector('button');
creatTodoButton.addEventListener('click', addTodo);
async function addTodo(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await firebase.auth().signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    console.log("test");
    alert("sign in finish.");
    window.location.replace("game.html");
}