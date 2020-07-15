const db = firebase.firestore();
const users_db = db.collection("Orders");
const uuid = localStorage.getItem('uuid');

function onLoad(){

    users_db.where("uuid", "==", uuid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}



/*Dynamic Card*/
$("#orderList").append(
    `<li><div class="card">
        <div class="card-content">
        <span class="card-title" id="name">Order Name</span>
        <p id="order_number">Order Number : </p>
        <p>Quantity : </p>
        <p>Price paid : <span class="price">Price Here</span></p>
        <p>Date : <span class="date">Date Here</span></p>
        </div>
    </div></li>`
);



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