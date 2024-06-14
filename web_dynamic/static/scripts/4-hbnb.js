/*
Listen for changes on each input checkbox tag:
if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
if the checkbox is unchecked, you must remove the Amenity ID from the variable
update the h4 tag inside the div Amenities with the list of Amenities checked

*/


window.addEventListener('load', function () {
  $.ajax('http://127.0.0.1:5001/api/v1/status').done(function (data) {
    if (data.status === 'OK') {
       $('#api_status').addClass('available');
  } else {
       $('#api_status').removeClass('available');
    }
    });

 const amenityIds = {};
 $('input[type=checkbox]').click(function () {
   if ($(this).prop('checked')) {
      amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
 } else if (!$(this).prop('checked')) {
   delete amenityIds[$(this).attr('data-id')];
   }
   if (Object.keys(amenityIds).length === 0) {
      $('div.amenities h4').html('&nbsp;');
   } else {
       $('div.amenities h4').text(Object.values(amenityIds).join(', '));
     }
  });

  $('.filters button').click(function () {
    $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({ amenities: Object.keys(amenityIds) })
  }).done(function (data) {
     $('section.places').empty();
        for (const place of data) {
          const html_place =
          '<article>' +
          '<div class="title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">' + place.price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +
          '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest > 1 ? 's' : '')+'</div>' +
          '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms > 1 ? 's' : '') + '</div>' +
          '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' +(place.number_bathrooms > 1 ? 's' : '') + '</div>' +
	  '</div>' +

	  "<div class='owner'>" +
	         "<b>Owner: </b>" +
	  "</div>" +

          '<div class="description">' + place.description + '</div>' +
          '</article>';

    $('.places').append(html_place);

    $.get('http://127.0.0.1:5001/api/v1/users/' + place.user_id, function (user) {
      $('.owner').last().append(user.first_name + " " + user.last_name);
		    });
         
																			            }
        });
     });
});










