const Category = document.location.href.split('?')[1].split('=')[1];
console.log(Category);
const db = firebase.firestore();
var storageRef = firebase.storage().ref();
var docRef = db.collection("Products").where("Product_Category","==",Category);
document.getElementById("Catname").innerHTML = Category;
















docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(" => ", doc.data());
            var x =doc.data()['Product_Name'];
             x = x.replace(/\s/g,'');
            $("#prod").append(
                `<div class="col s12 m6 l3">
                <div class="card">
                  <div class="card-image">
                  <a href="productdetail.html?product_name=${x}"><img src="${ doc.data()['Product_URL']}"></a>
                  </div>
                  <div class="card-content">
                    <span class="card-title">${doc.data()['Product_Name']}</span><hr>
                    <p>500kg</p>
                    <p>Selling Price: <span><a class="fa fa-inr" style="color:black;"></a>${doc.data()['Product_Price']}</span><a  onclick="buy('${x}')" class="waves-effect waves-light btn-small right orange"><i class="material-icons right">shopping_basket</i>Add</a></p>
                  </div>
                  <div class="card-action"><a href="productdetail.html?product_name=${x}">View Details</a> </div>
                </div>
              </div>
              
      `
            )
        });
});


function Logout(){
  const db = firebase.firestore();

// firebase authentication reference
  const auth = firebase.auth();
  firebase.auth().signOut().then(function() {
      window.location.href ="index.html";
// Sign-out successful.
}).catch(function(error) {
// An error happened.
});

}


function buy(value){
  // console.log(value);
  var user = firebase.auth().currentUser;
  // console.log(user);
  if (user) {
    console.log(user);
    console.log("log in hai");
    console.log(user.phoneNumber);
    db.collection("Products").doc(value).get().then(function(doccc){
      db.collection("users").doc(user.phoneNumber).collection("Cart").doc(value).set({
        Product_Name:  doccc.data()['Product_Name'],
        Product_Price: doccc.data()['Product_Price'],
        Product_Quantity: "1",
        Product_Unit:  doccc.data()['Product_Unit']
      });
      alert(value+" has been added to your cart");

    });
   
    // User is signed in.
  } else {
      window.location.href = "signin.html";
  }

}