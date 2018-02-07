// fetchposts.js

// Description: Hämtar Wordpress posts från javascript.dr-styv.se och printar ut dom i index.html
// Skapar navigations menyn i index.html och lägger på hover effekt.

// Dependencies: JQuery.

(function ($){
	$(document).ready(function(){ // När DOM har laddat klart.
		var url = "http://www.javascript.dr-styv.se/wp-json/wp/v2/posts/?_embed=true&filter[orderby]=date&order=asc"; // URL till JSON objektet filtrerat på datum Ascending
		$.ajax({ // Ajax hämtar Wordpress posts från JSON och om "Success" så körs funktionen DisplayWP och minData skickas även med till funktionen som innehåller informationen vi hämtar från Wordpress.
		type : "GET",
		url : url,
		timeout : 2000,
		beforesend: function (){
		console.log('before');
		},
		complete : function () {
			console.log('COMPLETE');
		}, success : function (minData) {
			console.log(minData);
			displayWP(minData); // Kör funktionen displayWP och skickar med minData variabel när ajax blir success.
		}, error : function () {
			console.log('ERROR');
		}
		})

		function displayWP (pData){ // funktionen som startas av AJAX vid "Succsess".

			for (var i = 0; i < pData.length; i++) { // Loopar igenom varje enskild Post i Pdata
			var articleId = pData[i].id; // Den specifika Wordpress postens id nummer.
			if(pData[i]._embedded['wp:featuredmedia']) { // Kollar ifall Wordpress posten har en "featured image".
			var wpTitle = pData[i].title.rendered; // Sparar Wordpress postens titel i wpTitle.
			var wpContent = pData[i].content.rendered; // Sparar Wordpress postens content text i wpContent.
			var wpBild = pData[i]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url; // Sparar url till medium size image i wpBild.
			var frag_json = pData[i]._embedded['wp:featuredmedia'][0]; // Hämtar _embedded['wp:featuredmedia'][0] objekt för denna specifika post.
			var wpCaption = frag_json.caption.rendered; // Plockar ut bild caption från frag_json objektet och sparar i variabeln wpCaption.
			var wpFeaturedmediaTitle = frag_json.title.rendered; // Plockar ut bild titel från frag_json objektet och sparar i variabeln wpFeaturedmediaTitle.

			var navigationMenu = ''; // Skapar tom variabel för uppbyggnad av navigationsmenyn i index.html, denna fylls med all html kod nedanför.
			navigationMenu += '<li class="button">';
			navigationMenu += '<a id="nav' + articleId + '"';
			navigationMenu += 'href="#' + 'article' + articleId + '">';
			navigationMenu += wpTitle + '</a>';
			navigationMenu += '</li>';
			$('.ulnav').append(navigationMenu); // Skriver ut html för navigation i index.html.

			var navigationMenu = ''; // återställer navigationMenu till tom variabel.

			$("a").mouseover(function(){  // Hover effekt för länkar
        	$(this).css("background-color", "yellow"); // ändra bakgrunds färgen till gul
    		});
				$("a").mouseout(function(){ // 
        		$(this).css("background-color", "transparent"); // ändra bakgrunds färgen till genomskinlig
   			 });

			$('nav a').on('click', function(event){ // Scrollar ner till rätt post med mjuk effekt när du trycker på en av länkarna i navigations menyn.
				event.preventDefault(); // Stoppar default beteendet av länkarna.
				var artLoc = this.hash; // Sparar #länken i variabeln artLoc.
				console.log('this href: ' + artLoc);

				$('html, body').animate({
					scrollTop: $(artLoc).offset().top // Scrollar till toppen av den angivna #länken.
				})
			});


			var wpHTML = ''; // Skapar  tom variabel för att sedan fyllas nedanför med html för alla wordpress poster.
			wpHTML += '<figure>';
			wpHTML += '<img class="imgSizer" src="' + wpBild + '">';
			wpHTML += '<figcaption class="imgSizerText">' + '<h2>' +wpFeaturedmediaTitle + '</h2>' + wpCaption + '</figcaption>';
			wpHTML += '</figure>';
			wpHTML += '<article class="artClass" id="' + 'article' + articleId + '">';
			wpHTML += '<h1>' + wpTitle + '</h1>';
			wpHTML += wpContent;
			wpHTML += '</article>';
			wpHTML += '<hr>';
			$('.content').append(wpHTML); // Skriver ut all html från wpHTML innut i html objektet med klassen "content". 

			var wpHTML = ''; // återställer wpHTML till tom variabel.
			}
		}
	}

	});
})(jQuery)
