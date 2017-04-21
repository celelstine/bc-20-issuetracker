function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

$(document).ready(function(){ 
   $(':input[type="submit"]').prop('disabled', true);
  //password strength
  $('#password').keyup(function(e) {
     var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
     var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
     var enoughRegex = new RegExp("(?=.{6,}).*", "g");
     if (false == enoughRegex.test($(this).val())) {
             $('#passstrength').html('More Characters');
     } else if (strongRegex.test($(this).val())) {
             $('#passstrength').className = 'ok';
             $('#passstrength').html('Strong!');
     } else if (mediumRegex.test($(this).val())) {
             $('#passstrength').className = 'alert';
             $('#passstrength').html('Medium!');
     } else {
             $('#passstrength').className = 'error';
             $('#passstrength').html('Weak!');
     }
     return true;
  });
  ///////////////
  $("#confirm_password").change(function() {
    if($("#password").val() != $("#confirm_password").val() ) {
      $('#passmatch').html('Password does not match');
      $(':input[type="submit"]').prop('disabled', true);
    } else {
       $(':input[type="submit"]').prop('disabled', false);
    }
  });


  $("#registration").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();
  //create user 
  let  currentUser;
  firebase.auth().createUserWithEmailAndPassword($('#email').val(), $('#password').val())
  .then(function(user){
   currentUser = firebase.auth().currentUser;
    if(currentUser) {
       $.post("/setsession",{uid: currentUser.uid},function(data, status){ console.log(status); });
    }

  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  });
  userRef = firebase.database().ref('ist/user');

  var  newuser = {
    "name" : $('#name').val(),
    "departments" : $('#department').val(),
    "uid" : currentUser.uid,
    "email" : $('#email').val(),
    "phone" :$('#phone').val()
  };
  userRef.push(newuser).then(function(user) {
    window.location.href = '/myreport';
  }). catch(function(error) {
    showresult("Error occured, please try again");
   // $("#result").text = "Error occures, please try again";
    //console.error('Sign Out Error', error);
    
  });
    });
});
  
