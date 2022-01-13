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
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      window.location.href = "index.html";
    }
  });



const ratyOptions = {
    starHalf: "https://cdnjs.cloudflare.com/ajax/libs/raty/3.1.1/images/star-half.png",
    starOff: "https://cdnjs.cloudflare.com/ajax/libs/raty/3.1.1/images/star-off.png",
    starOn: "https://cdnjs.cloudflare.com/ajax/libs/raty/3.1.1/images/star-on.png"
}
$('#rating').raty({ ...ratyOptions });
const filmReview = db.collection('rate');

$('#send').on('click', addReview);

async function addReview(event) {
  event.preventDefault();
  const user1 = firebase.auth().currentUser;
  const user2 = user1.email;
  const rate = $('#rating').data('raty').score();
  // $('div').raty({ score: 3 });
  await filmReview.add({
    user2,
    rate,
  });
  // const filmReviewDocs = await filmReview.get();
  // filmReviewDocs.forEach(element => {
  //   if(element.user2 === user2){
  //     console.log("test");
  //     alert("你填過了哦");
  //     window.location.reload();
  //   }
  // });
  window.location.reload();
  alert("愛妳呦~~");
}