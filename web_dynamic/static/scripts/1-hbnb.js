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
