
$(document).ready(function(){
  var absURL = document.URL;
  if (localStorage.uid ) {
    $(".menubar").show();
  } else{
    if (absURL.includes('signup')) {
      $(".menubar").hide()
    } else {
      $(".menubar").hide();
    window.location.href = '/login'
    }
  }

	// When the user clicks on <span> (x), close the modal
	$("#raiseissue").click(function() {
	    window.location.href = '/issue';
	});

  $("#todolist").click(function() {
      window.location.href = '/todo';
  });
  $("#issuelog").click(function() {
      window.location.href = '/issuelog';
  });
   $("#openissue").click(function() {
      window.location.href = '/openissue';
  });
    $("#closeissue").click(function() {
      window.location.href = '/closeissue';
  });

  
});