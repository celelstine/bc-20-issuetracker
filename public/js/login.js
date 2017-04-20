function saveUserID(uid) {
   localStorage.uid = uid;
}
$(document).ready(function(){

  $("#signup").click(function() {
      window.location.href = '/signup';
  });

	$("#googlesignin").click(function() {
	var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user.uid;
      //console.log(token)
      console.log(user);
      saveUserID(user);
      $.post("/setsession",
      {
        uid: user,
      },
      function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
      });
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
     // res.redirect('/signup');
      console.log(error.code)
       console.log(error.message)
    }); 
	});

  $("#facebooksignin").click(function() {
    
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
     .signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user.uid;

        
        //console.log(token)
        console.log(user)

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
       // res.redirect('/signup');
        console.log(error.code)
         console.log(error.message)
      }); 
  });

  $("#twittersigin").click(function() {
    
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth()
     .signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;        
        //console.log(token)
        console.log(user)

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
       // res.redirect('/signup');
          console.log(error.code)
         console.log(error.message)
      }); 
  });

  $("#gitsignin").click(function() {
    
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth()
     .signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;        
        //console.log(token)
        console.log(user)

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
       // res.redirect('/signup');
          console.log(error.code)
         console.log(error.message)
      }); 
  });
  
});