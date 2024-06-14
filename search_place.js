/*
$.ajax({
  url: 'https://127.0.0.1:5001/api/v1/places_search',
  type: 'POST',
  headers: { 'Content-Type': 'application/json' },
  data: JSON.stringify({}),
  success: function (data) {
    for (const place of data) {
      console.log(place.name);
	     console.log(place.max_gust);
	      console.log(place.price_by_night);
	    }
	  }
})
;
*/

const axios = require('axios');

axios.post('http://127.0.0.1:5001/api/v1/places_search', {"amenities":[]})
  .then(function (response) {
		      const data = response.data;
		          for (const place of data) {
			     console.log(data);
			      if (place.name) {
			        console.log(place.name);
				}
				if (place.max_guest) {
				      console.log(place.max_guest);
				      }
				if (place.price_by_night) {
				    console.log(place.price_by_night);
				    }
				  }
						  })
  .catch(function (error) {
		      console.error('Error:', error);
		        });
