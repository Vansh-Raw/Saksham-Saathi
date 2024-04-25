//Quotes generation
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const quotes = [
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "The only way to do great work is to love what you do.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The best way to predict the future is to invent it.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only impossible journey is the one you never begin.",
  "Believe you can and you're halfway there.",
"The only way to do great work is to love what you do.",
"Success is not final, failure is not fatal: It is the courage to continue that counts.",
"Your limitation—it's only your imagination.",
"Push yourself, because no one else is going to do it for you.",
"The harder you work for something, the greater you'll feel when you achieve it.",
"Don't stop when you're tired. Stop when you're done.",
"The only person you should try to be better than is the person you were yesterday.",
"You are capable of more than you know.",
"Dream it. Believe it. Build it.",
"It's not about how bad you want it, it's about how hard you're willing to work for it.",
"Success doesn’t just find you. You have to go out and get it.",
"The only limit to our realization of tomorrow will be our doubts of today.",
"The future belongs to those who believe in the beauty of their dreams.",
"Difficult roads often lead to beautiful destinations."
];

const quoteElement = document.getElementById("quote");
const quote = quotes[Math.floor(Math.random() * quotes.length)];
quoteElement.textContent = quote;

//Search bar 
const searchTerms = {
  "drug abuse": "drug_abuse.html",
  "cyber crime": "cyber_crime.html",
  "bullying": "bullying.html",
  "help": "help.html",
  "user stories": "userStories.html"
};
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const pageUrl = searchTerms[searchTerm];
  if (pageUrl) {
    window.location.href = pageUrl;
  }
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const pageUrl = searchTerms[searchTerm];
    if (pageUrl) {
      window.location.href = pageUrl;
    }
  }
});

//Drug Abuse
// Initialize the Google Maps API
// firstly we  rquire API to implement this and we require domain for that
function initMap() {
  var options = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  };

  var map = new google.maps.Map(document.getElementById('map'), options);

  // Get the user's location input
  document.getElementById('findHelpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var location = document.getElementById('location').value;

    // Geocode the user's location input
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': location }, function(results, status) {
      if (status === 'OK') {
        // Get the user's location coordinates
        var userLocation = results[0].geometry.location;

        // Find the nearest rehabilitation center
        var request = {
          location: userLocation,
          radius: '5000',
          query: 'rehabilitation center'
        };

        var service = newgoogle.maps.places.PlacesService(map);
        service.textSearch(request, function(results, status) {
          if (status === 'OK') {
            // Display the nearest rehabilitation center
            var rehabCenter = results[0];
            var rehabCenterMarker = new google.maps.Marker({
              position: rehabCenter.geometry.location,
              map: map,
              title: rehabCenter.name
            });

            // Display the rehabilitation center's details
            var rehabCenterInfoWindow = new google.maps.InfoWindow({
              content: '<h3>' + rehabCenter.name + '</h3>' +
                       '<p>' + rehabCenter.formatted_address + '</p>' +
                       '<p><a href="https://www.google.com/maps/dir/' + userLocation.lat() + ',' + userLocation.lng() + '/' + rehabCenter.geometry.location.lat() + ',' + rehabCenter.geometry.location.lng() + '/data=!3m1!4b1!4m2!4m1!3e0">Get Directions</a></p>'
            });

            rehabCenterMarker.addListener('click', function() {
              rehabCenterInfoWindow.open(map, rehabCenterMarker);
            });

            // Display the results
            var resultsDiv = document.getElementById('results');
            resultsDiv.classList.remove('hidden');
            var rehabCentersList = document.getElementById('rehabCentersList');
            rehabCentersList.innerHTML = '';
            rehabCentersList.innerHTML += '<li><a href="https://www.google.com/maps/dir/' + userLocation.lat() + ',' + userLocation.lng() + '/' + rehabCenter.geometry.location.lat() + ',' + rehabCenter.geometry.location.lng() + '/data=!3m1!4b1!4m2!4m1!3e0">' + rehabCenter.name + '</a></li>';
          } else {
            alert('No rehabilitation centers found near your location.');
          }
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  });
}



//language change
// Initialize the Google Translate API

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'hi,te,ta,ml,gu,bn,as,kn,pa,or,ur,mr,ne,si',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}