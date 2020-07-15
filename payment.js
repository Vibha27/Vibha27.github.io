const db = firebase.firestore();
document.getElementById('rzp-button1').onclick = function(e){
    // alert(document.getElementById("total").innerHTML);
    var options = {
        "key": "rzp_test_rFCJhKj1DnF5dO", // Enter the Key ID generated from the Dashboard
        "amount": parseFloat(document.getElementById("total").innerHTML)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
         //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
                db.collection("Orders").doc(response.razorpay_payment_id).set({
                    First_name: "Kashish",
                    Last_name:  "Jain",
                    Email_id: "jainkashish37@gmail.com",
                    Address: " Borivali-west",
                    Order_id: response.razorpay_payment_id,
                    Payment_method: "RazorPay",
                    Pnone_no: "9022680671",

        
                });
                db.collection("Orders").doc(response.razorpay_payment_id).collection("Items").doc("Apple").set({
                    Name: "Apple",
                    Price:  "1",
                    Category: "Fruits"
                });
                
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999",
            "address": "Borivali"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#F37254"
        },
        
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    // alert("done");
    e.preventDefault();
   
}


	

	