console.log("app.js is loaded");

const movieInput = $('#movie-search');
const searchButton = $('#search-button');
const results = $('#results');

searchButton.on('click', function(){
  console.log('clicked')
  var requestSettings = {
    method: 'get',
    url: '/search/'+ movieInput.val()
  }
  function callback(data){
    console.log(data.results[0].overview)
    overview = data.results[0].overview
    results.append(overview)
  }
  $.ajax(requestSettings).done(callback)
});
