<?php 
/*
* Plugin Name: edit frontend via rest API
* Description: To add JS frontend editing via rest API
* Author: Lasse Hall
*/
function editFrontEndViaRest() { // Funktion som möjliggör editering av poster i databasen.

	$user = wp_get_current_user();
	$allowed_roles = array('editor', 'administrator', 'author');

	//if((is_super_admin() || is_admin()) && is_single()) { // Kollar om användaren har super-admin, editor eller administrations/redaktörs rättigheter kollar så att det är en single post.
	if(array_intersect($allowed_roles, $user->roles ) && is_single()) { 
		wp_enqueue_script('edit-Front-End-Via-Rest', plugin_dir_url(__FILE__).'js/edit-Front-End-Via-Rest.js', array('jquery'), 0.1, true); // Registrerar scriptet edit-Front-End-Via-Rest.js och enqueuear det. Hittar rätt directory med plugin_dir_url(__FILE__) vilket ger "url" till där vi är just ni i denna fil och sen konkatenerar vi det med js/edit-Front-End-Via-Rest.js för att få addressen till vårt Javascript. Säger till att edit-Front-End-Via-Rest.js ska laddas in i Body. array('jquery') säger att detta script kräver JQuery.

		wp_localize_script('edit-Front-End-Via-Rest', 'WPsettings', array( // Arrayn innehåller datan vi ska använda i vårt Javascript. wp_localize_script hämtar data genom PHP och gör det tillgängligt i vårt Javascript.
		'root' => esc_url_raw(rest_url()), // URL till REST.
		'nonce' => wp_create_nonce('wp_rest'), // Skapar en kryptisk token för den specifika "händelsen"/"action" bunden till användaren.
		'current_ID' => get_the_ID() // Hämtar id för den specifika wordpress posten.
		));
	}
}

add_action('wp_enqueue_scripts', 'editFrontEndViaRest'); // När wp_enqueue_scripts hooken blir startad så körs funktionen editFrontEndViaRest.
?>