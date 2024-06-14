/*
Listen for changes on each input checkbox tag:
if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
if the checkbox is unchecked, you must remove the Amenity ID from the variable
update the h4 tag inside the div Amenities with the list of Amenities checked

*/

$(document).ready(function () {
  const selectedAmenityId = [];

  $('input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const checked = $(this).is(':checked');

    if (checked) {
      const amenity = { id, name };
      selectedAmenityId.push(amenity);
    } else {
      const idx = selectedAmenityId.findIndex((amenity) => amenity.id === id);
      if (idx > -1) {
        selectedAmenityId.splice(idx, 1);
      }
    }
    const listSelectedNames = selectedAmenityId.map((amenity) => amenity.name);
    $('div.amenities h4').text(listSelectedNames.join(', '));

  });
});

$(document).ready(function () {
  $.getJSON('http://127.0.0.1:5001/api/v1/status/')
    .done(function (data, status) {
       if (data.status === 'OK' && status === "success") {
          $('#api_status').addClass('available');
     } else {
          $('#api_status').removeClass('available');
       }
    })
    .fail(function (jqXHR, textStatus, error) {
      console.error(error);
    });
 });



$(document).ready(function() {
  const url = 'http://127.0.0.1:5001/api/v1/places_search';
  $.ajax({
    url: url,
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({}),
    success: function(data) {
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
  }
 });
});
