const db = firebase.firestore();
const users_db = db.collection("Orders");
const uuid = localStorage.getItem('uuid');

function onLoad(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            // No user is signed in.
            console.log("not signed in");
              window.location.assign('./signin.html');
          
        }
        else{
            users_db.where("uuid", "==", uuid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // items collection
            users_db.doc(doc.id).collection('Items')
            .get()
            .then(function(subQuerySnapshot) {
                subQuerySnapshot.forEach(function(itemDoc) {
                    $("#orderList").append(
                        `<li><div class="card">
                            <div class="card-content">
                            <span class="card-title" id="name">${itemDoc.data().Name}</span>
                            <p id="order_number">Order no: ${doc.id} </p>
                            <p>Quantity :${itemDoc.data().Product_Quantity} </p>
                            <p>Price paid : <span class="price">${itemDoc.data().Product_Price}</span></p>
                            <p>Date : <span class="date">Date Here</span></p>
                            </div>
                        </div></li>`
                    );
                })
            })
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

        }
    })
}



//Filtering functions
function sort(list, key) {
    console.log("In sort function");
    $($(list).get().reverse()).each(function(outer) {
        var sorting = this;
        console.log("Hi from inside");
        console.log(sorting);
        $($(list).get().reverse()).each(function(inner) {
            if(parseInt($(key, this).text()) > parseInt($(key, sorting).text())) {
            //if($(key, this).text().localeCompare($(key, sorting).text()) > 0) {
                this.parentNode.insertBefore(sorting.parentNode.removeChild(sorting), this);
            }
        });
    });
    console.log("Exiting sort function");
}

function sortReverse(list, key) {
    console.log("In sort function");
    $($(list).get().reverse()).each(function(outer) {
        var sorting = this;
        console.log("Hi from inside");
        console.log(sorting);
        $($(list).get().reverse()).each(function(inner) {
            if(parseInt($(key, this).text()) < parseInt($(key, sorting).text())) {
            //if($(key, this).text().localeCompare($(key, sorting).text()) > 0) {
                this.parentNode.insertBefore(sorting.parentNode.removeChild(sorting), this);
            }
        });
    });
    console.log("Exiting  reverse sort function");
}