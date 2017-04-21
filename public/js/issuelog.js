$(document).ready(function(){ 
 	let uid= $('#uid').val(),
 			Issueref = firebase.database().ref('ist/issue'),
 			curissue;
 	var issuecount=0;
 	Issueref.orderByChild('raisedby').equalTo(uid).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
     	curissue = data.val();
     displayIssue(data.key,curissue.priority,curissue.raisedby,curissue.subject,curissue.dateraised,curissue.description,
    							curissue.department,curissue.status,curissue.lastupdate);
     	issuecount += 1;
     	console.log(issuecount);

     });
	  if (issuecount == 0) {
			showresult("There is no ticket in log");
		} else {
		 	showresult("There " + ((issuecount == 1) ? "is ":"are " )+ issuecount + " ticket");
		}
  });
 	

});
 

var displayIssue = function(key,priority,raisedBy,subject,dateraise,description,department,status,lastupdatedDate) {
		getUsername(raisedBy,function(username) {
			let issuetag = '<tr id ="' +key + '" class="';
			if (priority == 'Critical') {
				issuetag += 'danger"';
			}else if (priority == 'High') {
				issuetag += 'warning"';
			}else if (priority == 'Medium') {
				issuetag += 'info"';
			}else if (priority == 'Low') {
				issuetag += 'active"';
			}
			issuetag += '>' +
	        '<td>' + username + '</td>' +
	        '<td>' + department + '</td>' +
	        '<td>' + subject + '</td>' +
	        '<td>' + priority + '</td>' +
	        '<td>' + todate(dateraise) + '</td>' +
	        '<td>' + status + '</td>' +
	        '<td>' + todate(lastupdatedDate) + '</td>' +
	        '<td> <button type="button" style="font-size:12px;padding-top:-2px" class="btn" data-toggle="modal" data-target="#description" onclick=\'viewdescription("'+description+ '")\'>View Description</button> </td>' +
	        '</tr>';
	    $('#issues tr:last').after(issuetag);
		});
		
}

var getUsername = function(uid,cb) {
	let Userref = firebase.database().ref('ist/user'),
			user;
   Userref.orderByChild('uid').equalTo(uid).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
      	user = data.val().name;
       // console.log(user);
        cb(user);
      });
    });
}

var viewdescription = function(description) {
	$('#descvalue').text=description;
	 document.getElementById("descvalue").innerHTML = description;
}
