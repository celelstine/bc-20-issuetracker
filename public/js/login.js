$(document).ready(function(){

  $("#signup").click(function() {
      window.location.href = '/signup';
  });

  $("#googlesignin").click(function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
   .signInWithPopup(provider)
   .then(function(result) {
      var token = result.credential.accessToken;
      var curuser = result.user;
      //console.log(result.user);
      console.log(curuser.displayName + '-' + curuser.email + '- ' + curuser.photoURL + '' +curuser.uid );
      //check if user exist in db
      let Userref = firebase.database().ref('ist/user');
      Userref.orderByChild("uid").equalTo(curuser.uid).once("value", function(snapshot) {
        var value = snapshot.val();
        var keys = Object.keys(value);
        var userinfo =value[keys[0]];
        if (userinfo){
          $.post("/setsession", {uid: curuser.uid}, function(responseData){ 
            console.log(responseData, 'responseData'); 
            if(responseData) {
              if(userinfo.role) {
               window.location.href = '/openissue';
              } else {
                window.location.href = '/issuelog';
              }
            }
          });
        } else {
          // create new user
          var  newuser = {
            "name" : curuser.displayName,
            "departments" : "",
            "uid" : curuser.uid ,
            "email" : curuser.email,
            "phone" :"",
            "pic" : curuser.photoURL
          };
          //console.log(localStorage.uid);
          userRef.push(newuser).then(function(user) {
            //set session 
             $.post("/setsession", {uid: curuser.uid}, function(responseData){ 
                console.log(responseData, 'responseData'); 
                if(responseData) {
                  window.location.href = '/profile';
                }
              });
            // direct user to profile
            
          }). catch(function(error) {
            showresult("Error occures, please try again");
            //$("#result").text = "Error occures, please try again";
            //console.error('Sign Out Error', error);
            
          });
        }
      });
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
     // res.redirect('/signup');
     // console.log(error.code)
       //console.log(error.message)
      showresult("Error occures, please try again");
    }); 
  });
  
  $("#signin").submit(function(event) {
    /* stop form from submitting normally */
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword($('#email').val(), $('#password').val())
    .then(function(user) {
      let curuser = firebase.auth().currentUser;
      if (curuser) {
        let Userref = firebase.database().ref('ist/user');
        Userref.orderByChild("uid").equalTo(curuser.uid).once("value", function(snapshot) {
          var value = snapshot.val();
          var keys = Object.keys(value);
          var userinfo =value[keys[0]];
          $.post("/setsession", {uid: curuser.uid}, function(responseData){ 
            console.log(responseData, 'responseData'); 
              if(responseData) {
                if (data.val().role) {
                  window.location.href = '/openissue';
                  console.log('isadmin');
                 } else {
                    window.location.href = '/issuelog';
                    }
              }
          });
        });
        
      } else {
        showresult("Wrong email or password");
           // $("#result").text = "Wrong email or password";
      }
    })
    .catch(function(error) {
    // Handle Errors here.
      errorCode = error.code;
      errorMessage = error.message;
      console.log('errorCode = ' + errorCode + ', errorMessage= ' + errorMessage);
      showresult("Wrong email or password");
      //$("#result").text = "Wrong email or password";
    });
  });

});