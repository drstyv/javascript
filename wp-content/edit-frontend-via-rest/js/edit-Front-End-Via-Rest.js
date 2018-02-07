// edit-Front-End-Via-Rest.js

// Description: Javascript för att editera single posts titlar.

// Dependencies: JQuery

(function($) {
	
	$(document).ready(function () {
		console.log('Javascriptet fungerar!');

		// root till RESY
		// id till posten
		// nonce
		console.log('WPsettings.root', WPsettings.root);
		console.log('WPsettings.nonce', WPsettings.nonce);
		console.log('WPsettings.current_ID', WPsettings.current_ID);
		
		var $entryTitle = $('.entry-title'); // Hämtar innehållet i html objektet med klassen entry-title och sparar det i $entryTitle.

		$entryTitle.after('<button class="edit-button edit-title">Redigera Rubriken</button><button class="edit-title save" style="display: none">Spara Rubriken</button>'); // Lägger till html kod i slutet av $entryTitle.

		function runAjax(newTitle) { // Ändrar titeln i databasen med det som står i variabeln newTitle.
			$.ajax({
				url: WPsettings.root + 'wp/v2/posts/' + WPsettings.current_ID, // Url till den specifika Wordpress posten.
				method: 'POST', // Metoden som ska användas är POST
				beforeSend: function(xhr) {
					xhr.setRequestHeader('X-WP-Nonce', WPsettings.nonce); // Sätter header informationen som skickas mellan användaren och servern.
				}, 
				data: {
					'title': newTitle // Datan i newTitle ska läggas i title.
				}
			})
		}

		$('.edit-title.edit-button').on('click', function() { // Vid klick på edit titel knappen.
			var $originalTitle = $('.entry-title').text(); // sparar orginal titeln i $originalTitle från .entry-title.
			//console.log($originalTitle);
			$entryTitle.toggle(); // gömmer själva orginal titeln.
			$entryTitle.after('<input id="title-input" type="text">'); // Lägger till html i slutet av $entryTitle.
			$('#title-input').val($originalTitle); // Lägger in orginal titeln i det nya text fältet #title-input.
			$(this).toggle(); // Gör edit-title knappen osynlig.
			$('.edit-title.save').toggle(); // Gör Spara Rubriken knappen synlig.
		})

		$('.save').on('click', function() { // Vid klick på spara titel knappen.
			var newTitle = $('#title-input').val(); // Sparar texten från #title-input i newTitle.
			$entryTitle.text(newTitle); // skriver över $entryTitle med texten i newTitle.
			$entryTitle.toggle(); // Gör sjävla titeln synlig igen.
			$('#title-input').toggle(); // gör #title-input osynlig
			$('.edit-title.edit-button').toggle(); // gör Redigera Rubriken knappen synlig.
			$(this).toggle(); // // Gör Spara Rubriken knappen osynlig.

			runAjax(newTitle); // startar funktionen runAjax och skickar med variabeln newTitle.
		})

		//WPsettings.root
		//WPsettings.nonce
		//WPsettings.current_ID

	});

	})(jQuery)