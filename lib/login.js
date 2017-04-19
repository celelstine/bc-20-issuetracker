$(document).ready(function(){
	alert("test");
	// When the user clicks on <span> (x), close the modal
	$("#googlesignin").click(function() {
		alert("test");
	var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      setSession();

      
      console.log(token)
      console.log(user)

    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      res.redirect('/signup');
      console.log(error.code)
       console.log(error.message)
    }); 
	});
});