"use strict";

// Class definition
var KTAppUserProfile = function () {

	// Private functions
	var initAside = function () {
		// Mobile offcanvas for mobile mode
		var offcanvas = new KTOffcanvas('kt_user_profile_aside', {
			overlay: true,  
			baseClass: 'kt-app__aside',
			closeBy: 'kt_user_profile_aside_close',
			toggleBy: 'kt_subheader_mobile_toggle'
		}); 
	}

	return {
		// public functions
		init: function() {
			initAside();
		}
	};
}();

$("#updateUtente").click(function () {
	$.ajax({
		url: 'User/UpdateUtente',
		data: { nome: $("#nome").val(), cognome: $("#cognome").val(), email: $("#email").val(), citta: $("#citta").val(), cellulare: $("#cellulare").val(), data: $("#data").val(), sesso: $("#sesso").val()},
		success: function (response) {
			swal.fire({
				title: "Successo!",
				text: "Il Titolo e' stato aggiunto!",
				type: "success",
				timer: 2000,
				showConfirmButton: false
			});
			window.setTimeout(function () {
				location.reload();
			}, 2000);

		}
	});
});
KTUtil.ready(function() {	
	KTAppUserProfile.init();
});