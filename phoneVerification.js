const phoneNumberField = document.getElementById('mob-no');
const generateOtp = document.getElementById('otp-btn');
const otp = document.getElementById('otp');
const loginBtn = document.getElementById('login-btn');

const db = firebase.firestore();
const users_db = db.collection("users");

// uuid
function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}


$( document ).ready(function(){


  $("#next-btn").click(function(e){
    var firstname = $('#first_name').val();
    var lastname = $('#last_name').val();
    var email = $('#email').val();
    var address = $('#textarea1').val();
    var area = $('#textarea2').val();
    var pin = $('#pin_code').val();
    // var city = $("#city option:selected").text();
    var city = $('#city').val();
    var state = $("#state option:selected").text();
    var phoneNumber = '+91' + $('#mob-no').val();
    var uuid = create_UUID();

    e.preventDefault();
    $("#next-content").show();
    $("#before-next").hide();
    console.log(firstname,lastname,email,address,city,state,phoneNumber);
    
    users_db.doc(phoneNumber).set({
      first_name : firstname,
      last_name: lastname,
      address :  address,
      area: area,
      pin: pin,
      city:city,
      state:state,
      email : email,
      admin: false,
      phone_no : phoneNumber,
      uuid: uuid
    })
    .then((resp) => {
      localStorage.setItem("phone", phoneNumber);
      localStorage.setItem("uuid",uuid)
      
      window.location.assign('./index.html');
      
    })
    .catch(error => console.error(error))
  });
});

firebase.auth().useDeviceLanguage();

// Generating recaptcha
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button',{
  'size': 'invisible',
  'callback': function(response) {
    // reCAPTCHA solved
    sendVerificationCode();
  } 
});

recaptchaVerifier.render().then(function(widgetId) {
  window.recaptchaWidgetId = widgetId;
});

// sent sms
function sendVerificationCode() {

    const phoneNumber = '+91' + phoneNumberField.value;
    const appVerifier = window.recaptchaVerifier;

    console.log(phoneNumber);

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then( confirmationResult => {
      // SMS sent. 
      document.getElementById('otp-input').style.display = "block";
      document.getElementById('sign-in-button').style.display = 'none';
      const sentCodeId = confirmationResult.verificationId;
      loginBtn.addEventListener('click',() => signInWithPhone(sentCodeId,phoneNumber));
  })
  .catch(function (error) {
    console.error("SMS not sent", error);
    alert('SMS not sent')
  });
}
  
// signin if otp entered and otp send are same  
function signInWithPhone(sentCodeId,phoneNumber) {
    const code = otp.value;
    const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
    firebase.auth().signInWithCredential(credential)
    .then((cred) => {
        
      users_db.doc(phoneNumber).get()
        .then((snapshot) => {

          if(snapshot.exists) {
            localStorage.setItem("phone", phoneNumber);
            localStorage.setItem("uuid",snapshot.data().uuid)

            window.location.assign('./index.html');

          }
          else{
            alert('You are logging in for first time please enter details.');
                
            document.getElementById("signup-content").style.display = "block";
            document.getElementById("signin-content").style.display = "none";
        }
        })
        .catch((error) => console.error(error))
      
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    })
  }

