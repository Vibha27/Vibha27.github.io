const db = firebase.firestore();

var Subtotal = 0;
var Delivery  = 0;

function Logout(){
  const db = firebase.firestore();
  const auth = firebase.auth();
  firebase.auth().signOut().then(function() {
      window.location.href ="index.html";
}).catch(function(error) {

});

}



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("script login");
    db.collection("users").doc(user.phoneNumber).collection("Cart").onSnapshot(function(querySnapshot) {
      $("#all-products").empty();
      Subtotal = 0;
      querySnapshot.forEach(function(doc){
        var x = doc.data()['Product_Name'];
        x= x.replace(/\s/g,'');
        Subtotal = Subtotal + parseFloat(doc.data()['Product_Price'])*parseFloat(doc.data()['Product_Quantity']);
        console.log("real Subtotal", Subtotal);
        $("#all-products").append(
            `<div class="basket-product">
                <div class="item"> 
                  <div class="product-details">
                    <h1><strong>${doc.data()['Product_Name']}</strong></h1>  
                  </div>
                </div>
                <div class="price">${doc.data()['Product_Price']}</div>
                  <div class="quantity">
                    <input type="number"  onchange = "update('${x}',value)" value="${doc.data()['Product_Quantity']}" min="1" class="quantity-field">
                </div>
                <div class="subtotal">${parseFloat(doc.data()['Product_Quantity']) * parseFloat(doc.data()['Product_Price'])}</div>
                  <div class="remove">
                    <button onclick="remove('${doc.data()['Product_Name']}')">Remove</button>
                  </div>
                </div>
        `)
      });
      console.log("Subtotal", Subtotal);
    });
  }
  else{
    window.location.href = "index.html";
  }
});



function remove(item){
  item = item.replace(/\s/g,'');
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("users").doc(user.phoneNumber).collection("Cart").doc(item).delete()  
    }
    else{
      window.location.href = "index.html";
    }
  });
}


function update(a,b){
  if(b>0){
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        db.collection("users").doc(user.phoneNumber).collection("Cart").doc(a).set({
          Product_Quantity: b,
        }, { merge: true });
      }
      else{
        window.location.href = "index.html";
      }
    });
  }
  else{
    alert("Q negative daal raha hai sab check kiya hai.");
  }  
}


$( "#cartP" ).click(function() {
  if (Subtotal >  0){
  $('#cartD').hide();
  $('#deliv').show();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("users").doc(user.phoneNumber).get().then(function(doccc){
        document.getElementById("first_name").value = doccc.data()['first_name'];
        $('#first_name').select();
        document.getElementById("last_name").value = doccc.data()['last_name'];
        $('#last_name').select();
        document.getElementById("p_number").value = user.phoneNumber;
        $('#p_number').select();
        document.getElementById("textarea1").value = doccc.data()['address'];
        $('#textarea1').select();
        document.getElementById("textarea2").value = doccc.data()['area'];
        $('#textarea2').select();
        document.getElementById("pin_code").value = doccc.data()['pin'];
        $('#pin_code').select();
        $('#pin_code').blur();
      });
    }
    else{
      window.location.href = "index.html";
    }
  
  });
}
else{
  alert("Cart is Empty");
}
});



$( "#Prev" ).click(function() {
  $('#deliv').hide();
  $('#cartD').show();
});


var area;
$( "#dddsave" ).click(function(event) {
  event.preventDefault();
  area = document.getElementById("textarea1").value + "," + document.getElementById("textarea2").value + "," + document.getElementById("pin_code").value + "Mumbai,Maharashtra"; 
  console.log("area", area);
  Delivery = calculateD(area);
});


function calculateD(area){
  var x = new XMLHttpRequest();
  x.open("GET", "https://geocoder.ls.hereapi.com/6.2/geocode.xml?apiKey=gBtUA6HNv23XXvrblwLZZRAScPiyxizR1Eqyk91dbzw&searchtext="+area, true);
  x.onreadystatechange = function () {
    if (x.readyState == 4 && x.status == 200)
      {
  	    var lat = x.responseXML.getElementsByTagName("Latitude")[0].childNodes[0].nodeValue;
  	    var long = x.responseXML.getElementsByTagName("Longitude")[0].childNodes[0].nodeValue;
        var dis = distance(lat,long,"19.21068","72.84163","K");
        console.log("dis",dis);
            if (dis>20){
              Delivery = 100;
            }
            else if( dis>15){
              Delivery = 80;
            }
            else if( dis>10){
              Delivery = 50;
            }
            else if( dis>5){
              Delivery = 30;
            }
            else if( dis>1){
              Delivery = 10;
            }
            else{
              Delivery = 0;
            }
          }
        };
        x.send(null);   
        if( document.getElementById("first_name").value != "" && document.getElementById("last_name").value != "" &&  document.getElementById("p_number").value != "" 
          && document.getElementById("textarea1").value != "" && document.getElementById("textarea2").value != "" && document.getElementById("pin_code").value != ""){
          $('#deliv').hide();
          $('#summi').show();
          document.getElementById('basket-delivery').innerHTML = Delivery;
          document.getElementById('basket-subtotal').innerHTML = Subtotal;
          document.getElementById('basket-total').innerHTML = Subtotal + Delivery;
        }
        else{
          alert("Please fill delivery details");
        } 
}



function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }


  $( "#shop-more" ).click(function(event) {
    event.preventDefault();
    $('#summi').hide();
    $('#deliv').show();

  });





// var Subtotal=0;
// var delivery;
// var fname,lname,emailid,address;


// function calculateD(area){
//     var city = "mumbai";
//       var x = new XMLHttpRequest();
//       x.open("GET", "https://geocoder.ls.hereapi.com/6.2/geocode.xml?apiKey=gBtUA6HNv23XXvrblwLZZRAScPiyxizR1Eqyk91dbzw&searchtext="+area+"+"+city, true);
//       x.onreadystatechange = function () {
//         if (x.readyState == 4 && x.status == 200)
//         {
// 	        console.log(x.responseXML);
//           var lat = x.responseXML.getElementsByTagName("Latitude")[0].childNodes[0].nodeValue;
// 	        var long = x.responseXML.getElementsByTagName("Longitude")[0].childNodes[0].nodeValue;
// 	        console.log(lat);
// 	        console.log(long);
// 	        var dis = distance(lat,long,"19.21068","72.84163","K");
//           console.log(dis);    // …
//           if (dis>20){
//             delivery = 100;
//           }
//           else if( dis>15){
//             delivery = 80;
//           }
//           else if( dis>10){
//             delivery = 50;
//           }
//           else if( dis>5){
//             delivery = 30;
//           }
//           else if( dis>1){
//             delivery = 10;
//           }
//           else{
//             delivery = 0;
//           }
//           console.log("delivery",delivery);
//           document.getElementById('basket-delivery').innerHTML = delivery;
//         }
//       };
//       x.send(null);    
// }

// function distance(lat1, lon1, lat2, lon2, unit) {
//   if ((lat1 == lat2) && (lon1 == lon2)) {
//     return 0;
//   }
//   else {
//     var radlat1 = Math.PI * lat1/180;
//     var radlat2 = Math.PI * lat2/180;
//     var theta = lon1-lon2;
//     var radtheta = Math.PI * theta/180;
//     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     if (dist > 1) {
//       dist = 1;
//     }
//     dist = Math.acos(dist);
//     dist = dist * 180/Math.PI;
//     dist = dist * 60 * 1.1515;
//     if (unit=="K") { dist = dist * 1.609344 }
//     if (unit=="N") { dist = dist * 0.8684 }
//     return dist;
//   }
// }
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     db.collection("users").doc(user.phoneNumber).get().then(function(doccc){
//       fname = doccc.data()['first_name'];
//       document.getElementById("first_name").value = fname;
//       $('#first_name').select();
//       lname = doccc.data()['last_name'];
//       document.getElementById("last_name").value = lname;
//       $('#last_name').select();
//       document.getElementById("p_number").value = user.phoneNumber;
//       $('#p_number').select();
//       document.getElementById("textarea1").value = doccc.data()['address'];
//       $('#textarea1').select();
 
//       document.getElementById("textarea2").value = doccc.data()['area'];
//       $('#textarea2').select();
 
//       document.getElementById("pin_code").value = doccc.data()['pin'];
//       $('#pin_code').select();
//       $('#pin_code').blur();
//       emailid = doccc.data()['email'];
//       address = doccc.data()['address']+"," +  doccc.data()['area'] + "," + doccc.data()['pin'];
//       // var request = new XMLHttpRequest();
//       var area = document.getElementById("textarea2").value;
//       delivery = calculateD(area);
    
//       db.collection("users").doc(user.phoneNumber).collection("Cart").onSnapshot(function(querySnapshot) {
//         $("#all-products").empty();
//         Subtotal = 0;
//         querySnapshot.forEach(function(doc) {
//           var x = doc.data()['Product_Name'];
//           x= x.replace(/\s/g,'');
//           // nam.add(doc.data()['Product_Name']);
//           // console.log(doc.data());
//           Subtotal = Subtotal + parseFloat(doc.data()['Product_Price'])*parseFloat(doc.data()['Product_Quantity']);
//           console.log("Subtotal:",Subtotal);
//           $("#all-products").append(
//             `<div class="basket-product">
//             <div class="item"> 
//             <div class="product-details">
//               <h1><strong>${doc.data()['Product_Name']}</strong></h1>  
//             </div>
//             </div>
//             <div class="price">${doc.data()['Product_Price']}</div>
//             <div class="quantity">
//               <input type="number"  onchange = "update('${x}',value)" value="${doc.data()['Product_Quantity']}" min="1" class="quantity-field">
//             </div>
//             <div class="subtotal">${parseInt(doc.data()['Product_Quantity']) * parseFloat(doc.data()['Product_Price'])}</div>
//             <div class="remove">
//               <button onclick="remove('${doc.data()['Product_Name']}')">Remove</button>
//             </div>
//             </div>
//           `)
//           });
       
//       document.getElementById('basket-subtotal').innerHTML = Subtotal;
//         console.log("delivery",delivery);
//       // document.getElementById('basket-delivery').innerHTML = delivery;
//       if (Subtotal>0){
//         document.getElementById('basket-total').innerHTML = Subtotal + delivery;
//         $("#rzp-button1").show();
//       }
//       else{
//         document.getElementById('basket-total').innerHTML = 0;
//         document.getElementById('basket-delivery').innerHTML = 0;
//         $("#rzp-button1").hide();
//       }
    
//       console.log("element ke baad",Subtotal);
//     });
//     });

//   }
// });




// function update(a,b){
//   console.log("a",a);
//   console.log("b",b);
//   firebase.auth().onAuthStateChanged(function(user) {
//     if(user){
//       db.collection("users").doc(user.phoneNumber).collection("Cart").doc(a).set({
//         Product_Quantity: b,
//       }, { merge: true });
//     }
//   });
// }



  



// function Logout(){
//   const db = firebase.firestore();

// // firebase authentication reference
//   const auth = firebase.auth();
//   firebase.auth().signOut().then(function() {
//       window.location.href ="index.html";
// // Sign-out successful.
// }).catch(function(error) {
// // An error happened.
// });

// }


// function remove(item){
//   item = item.replace(/\s/g,'');
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       db.collection("users").doc(user.phoneNumber).collection("Cart").doc(item).delete()  
//     }
//     else{

//     }
  
//   console.log(item);
//   });
//   console.log("bahar kidar bhi",Subtotal);
// }


  


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {   
    document.getElementById('rzp-button1').onclick = function(e){
      var options = {
        "key": "rzp_test_rFCJhKj1DnF5dO", 
        "amount": (Subtotal + Delivery)*100, 
        "currency": "INR",
        "name": "Codellion",
        "description": "Software building Company",
        "handler": function (response){
            db.collection("Orders").doc(response.razorpay_payment_id).set({
                  First_name: document.getElementById("first_name").value,
                  Last_name:  document.getElementById("last_name").value,
                  Address: area,
                  Order_id: response.razorpay_payment_id,
                  Payment_method: "RazorPay",
                  Pnone_no: document.getElementById("p_number").value,
                  uuid: localStorage.getItem("uuid"),
                  Total: Subtotal + Delivery,
                  Delivery: Delivery,
                  Subtotal: Subtotal,
                  Delivered: "0" 
              });
              db.collection("users").doc(user.phoneNumber).collection("Cart").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  db.collection("Orders").doc(response.razorpay_payment_id).collection("Items").doc(doc.id).set({
                    Name: doc.data()['Product_Name'],
                    Price: doc.data()['Product_Price'],
                    Product_Quantity: doc.data()['Product_Quantity'],
                    Product_Price: doc.data()['Product_Price'],
                    Product_Subtotal: parseFloat(doc.data()['Product_Quantity'] * doc.data()['Product_Price'] )
                  });
                }); 
              });
             
          


              db.collection("users").doc(user.phoneNumber).collection("Cart").get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                    console.log("delete", doc.id);
                    db.collection("users").doc(user.phoneNumber).collection("Cart").doc(doc.id).delete();
                });
              });
                          
              alert("Payment Successful. You will soon receive a whatsapp message related to your order.");
      },
      "prefill": {
          "name":  document.getElementById("first_name").value +   document.getElementById("last_name").value,
          "contact": document.getElementById("p_number").value,
          "address": area
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "orange"
      },
      
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
  // alert("done");
  e.preventDefault();
 
}
  }
});



