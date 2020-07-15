const product_name = document.location.href.split('?')[1].split('=')[1];
const url = document.location.href + localStorage.getItem('uuid');
// console.log(product_name);
const db = firebase.firestore();
var storageRef = firebase.storage().ref();
var docRef = db.collection("Products").doc(product_name);
var data = {}
docRef.onSnapshot(function(doc) {
    if (doc.exists) {
        // data = doc.data();
        // console.log("Document data:", doc.data()['Product_Name']);
        var imge = document.getElementById("img-main");
        imge.setAttribute('src',doc.data()["Product_URL"]);
        document.getElementById("productname").innerHTML = doc.data()['Product_Name'];
        // var price = document.getElementById("price");
        document.getElementById("price").innerHTML = doc.data()['Product_Price'];
        var description = document.getElementById("description");
        document.getElementById("description").innerHTML = doc.data()['Product_Discription'];
        var b = document.getElementById("btt");
      
        b.setAttribute("onclick","onclick="+"buys('"+doc.data()['Product_Name']+"')");
        var quantity =  parseInt(doc.data()['Product_Quantity']);
        console.log(quantity);
        var x = 1;
        var price = [];
        var qty = [];
        var count = 0;
       
        var a = "CheckPointQuantity" + x.toString();
       
        while(doc.data()[a]!=""){
            count++;
            if (count==5){
                break;
            }
            x++;
            a = "CheckPointQuantity" + x.toString();
        }
        // console.log(count);
     
            // document.getElementById("numcheckpoint").innerHTML=count;
            document.getElementById("soll").innerHTML= doc.data()['Quantity_Sold']+  doc.data()['Product_Unit'];
            var sell = parseInt(doc.data()['Quantity_Sold']);
      
        console.log(count);
       

        if(count>0){

            $("checkpoint-details").show();
            var x = 0;
            $("#checkpoint").empty();
            $("#cpqty").empty();
            $("#cpprice").empty();
            for(i=count;i>=1;i--){
                a = "CheckPointQuantity" + i.toString();
                var b = "CheckPointPrice" + i.toString();
                if ( parseFloat(sell) >= parseFloat(doc.data()[a]) ){
                    document.getElementById("price").innerHTML = doc.data()[b];
                    db.collection('Products').doc(product_name).set({
                        Product_Price:  doc.data()[b]
                    }, { merge: true });
                    break;
                }
            }
            
            for(i=1;i<=count;i++){
                a = "CheckPointQuantity" + i.toString();
                var b = "CheckPointPrice" + i.toString();
                var c = (doc.data()[a]/quantity) *100;
                console.log("c",c);
                console.log("x",x);
                $("#checkpoint").append(
                    `<div class = "cp" style=" min-width:${c-x}%;"><i class="fa fa-location-arrow fa-rotate-90" style="color:orange;" ></i></div><!--`
                );
                $("#cpqty").append(
                    `<div class = "cp" style=" min-width:${c-x}%;">${doc.data()[a]}${doc.data()['Product_Unit']}</div><!--`
                );
                $("#cpprice").append(
                    `<div class = "cp" style=" min-width:${c-x}%;">&#8377;${doc.data()[b]}</div><!--`
                );
                x =c;
            }
            console.log("sell",sell);
            console.log("quantity",quantity);
            x = (sell/quantity) *100;
            console.log("x",x);
            $("#bar").css("width",x+"%");
		    
        }else{
            $("#checkpoint-details").hide();
            document.getElementById("price").innerHTML = doc.data()['Product_Price'];
            // $("#no-check").hide();
        }
        
        












        db.collection("Products").where("Product_Category", "==",doc.data()['Product_Category']).get()
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(docc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(" => ", docc.data());
            if(docc.data()['Product_Name'] != doc.data()['Product_Name']){
                var x =docc.data()['Product_Name'];
                x = x.replace(/\s/g,'');
                $("#sugg").append(
                    `<div class="col s6 m2">
					<div class="card hoverable">
						<div class="product-image">
                        <a href="productdetail.html?product_name=${x}"><img class="img-suggestions" src="${ docc.data()['Product_URL']}" alt="img" /></a>
						</div>
						<div class="card-content">
							<div class="title-offer">
								<span>${docc.data()['Product_Name']}</span>
								
							</div>
							<div class="qty-sugg">${docc.data()['Product_Quantity']}${docc.data()['Product_Unit']}</div>
							<div class="sell-price-sugg">
								<strong><a class="fa fa-inr"></a>${docc.data()['Product_Price']}</strong>
								<span class="right"><a  class="waves-effect waves-light btn-small orange" onclick="buy('${x}')"><i class="material-icons right">shopping_basket</i>Add</a></span>
							</div>
							
						</div>
					</div>
				</div>`

                
                )
            //     var element1 = document.getElementById("sugg");
            //     var a9 = document.createElement("a");
            //     var div1 = document.createElement("div");
            //     div1.setAttribute("class","col s6 m2");
            //         var div2 = document.createElement("div");
            //         div2.setAttribute("class","card hoverable");
            //             var div3 = document.createElement("div");
            //             div3.setAttribute("class","product-image");
            //                 var img1 = document.createElement("img");
            //                 img1.setAttribute("class","img-suggestions");
            //                 img1.setAttribute("src", docc.data()['Product_URL']);
            //                 img1.setAttribute("alt", "img");
            //                 var x =docc.data()['Product_Name'];
            //                 x = x.replace(/\s/g,'');
            //                 a9.setAttribute("href","productdetail.html?product_name="+x);
            //                 a9.appendChild(img1);
            //                 div3.appendChild(a9);
                           
                        
            //             var div4 = document.createElement("div");
            //             div4.setAttribute("class","card-content");
            //                 var div5 = document.createElement("div");
            //                 div5.setAttribute("class","title-offer");
            //                     var span1 = document.createElement("span");
            //                         var txt = document.createTextNode(docc.data()['Product_Name']);
            //                         span1.appendChild(txt);
            //                     div5.appendChild(span1);
            //                 var div6 = document.createElement("div");
            //                 div6.setAttribute("class","qty-sugg");
            //                     var txt1 = document.createTextNode(docc.data()['Product_Quantity']+ docc.data()['Product_Unit']);
            //                     div6.appendChild(txt1);
            //                 var div7 = document.createElement("div");
            //                 div7.setAttribute("class","sell-price-sugg");
            //                     var str = document.createElement("strong");
            //                         var i3 = document.createElement("i");
            //                         i3.setAttribute("class","fa fa-inr");
            //                         var txt2 = document.createTextNode(docc.data()['Product_Price']);
            //                         str.appendChild(i3);
            //                         str.appendChild(txt2);
            //                     var span1 = document.createElement("span");
            //                     span1.setAttribute("class","right");
            //                         var a1 = document.createElement("a");
            //                         // a1.setAttribute("id","");
            //                         a1.setAttribute("class","waves-effect waves-light btn-small btn-sugg orange");
                                    
            //                         a1.setAttribute("onclick","buy('docc.data()['Product_Name'].replace(/\s/g,'')')");
            //                             var i1 = document.createElement("i");
            //                             i1.setAttribute("class","material-icons right");
            //                                 var txt3 = document.createTextNode("shopping_basket");
            //                                 i1.appendChild(txt3);
            //                                 a1.appendChild(i1);
            //                             var txt4 = document.createTextNode("Add");
            //                             a1.appendChild(txt4);
            //                         span1.appendChild(a1);
            //                 div7.appendChild(str);
            //                 div7.appendChild(span1);
            //             div4.appendChild(div5);
            //             div4.appendChild(div6);
            //             div4.appendChild(div7);
            //         div2.appendChild(div3);
            //         div2.appendChild(div4);
            //     div1.appendChild(div2);
                
                
            // element1.appendChild(div1);
            // element1.appendChild(a9);
            $("#sugg2").append(
                `<div class="col s12 m4">
					<div class="card hoverable">
						<div class="product-image">
                        <a href="productdetail.html?product_name=${x}"><img class="img-suggestions" src="${ docc.data()['Product_URL']}" alt="img" /></a>
						</div>
						<div class="card-content">
							<div class="title-offer">
								<span>${docc.data()['Product_Name']}</span>
								
							</div>
							<div class="qty-sugg">${docc.data()['Product_Quantity']}+${docc.data()['Product_Unit']}</div>
							<div class="sell-price-sugg">
								<strong><a class="fa fa-inr"></a>${docc.data()['Product_Price']}</strong>
								<span class="right"><a  class="waves-effect waves-light btn-small orange" onclick="buy('${x}')"><i class="material-icons right">shopping_basket</i>Add</a></span>
							</div>
							
						</div>
					</div>
				</div>`
            );
            


            }
            
                                    
                                        


                                    

                                    

                                        

                                





                // var div2 = document.createElement("div");

        });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });


        // console.log(data['Product_Name']);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
});


function buys(valuee){
    console.log(valuee);
    valuee = valuee.replace(/\s/g,'');
    var user = firebase.auth().currentUser;
    // console.log(user);
    if (user) {
      console.log(user);
      console.log("log in hai");
      console.log(user.phoneNumber);
      console.log(document.getElementById("count").innerHTML);
      db.collection("Products").doc(valuee).get().then(function(doccc){
        db.collection("users").doc(user.phoneNumber).collection("Cart").doc(valuee).set({
          Product_Name:  doccc.data()['Product_Name'],
          Product_Price: doccc.data()['Product_Price'],
          Product_Quantity: document.getElementById("count").innerHTML,
          Product_Unit:  doccc.data()['Product_Unit']
        });
        alert(valuee+" has been added to your cart");
  
      });
     
      // User is signed in.
    } else {
        window.location.href("signin.html");
    }
  
  }









  function buy(value){
    console.log(value);
    value = value.replace(/\s/g,'');
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


//   share

document.getElementById('social-button').innerHTML = `<input type="text" value=${url} id="myInput"><button onclick="copyLink()">Copy text</button>
<br><button class='btn btn-success btn-lg' data-sharer='whatsapp' data-title='Buy product' data-web='https://web.whatsapp.com/' data-url='${url}'>Whatsapp</button>&nbsp; <button class='btn btn-primary btn-lg' data-sharer='facebook' data-hashtag='hashtag' data-url='${url}'>Facebook</button>`


function copyLink() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
  }
