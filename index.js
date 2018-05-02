var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

$searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredData = dataSet;

var $tbody = document.querySelector("tbody");
var $loadMoreBtn = document.querySelector("#load-btn");

var startingIndex = 0;
var resultsPerPage = 50;

function renderTableSection() {
  var endingIndex = startingIndex + resultsPerPage;
  var ufoSubset = filteredData.slice(startingIndex, endingIndex);
  for (var i = 0; i < ufoSubset.length; i++) {
    var ufo = ufoSubset[i];
    var fields = Object.keys(ufo);
    var $row = $tbody.insertRow(i + startingIndex);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufo[field];
    }
  }
}


$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {

  startingIndex += resultsPerPage;
  renderTableSection();

  if (startingIndex + resultsPerPage >= dataSet.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All UFO Sightings Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}

// Render the table for the first time on page load
renderTableSection();


function handleSearchButtonClick() {

  var filterDateTime = $datetimeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  filteredData = dataSet.filter(function(search_query) {
    var ufo_datetime = search_query.datetime.toLowerCase();
    var ufo_city = search_query.city.toLowerCase();
    var ufo_state = search_query.state.toLowerCase();
    var ufo_country = search_query.country.toLowerCase();
    var ufo_shape= search_query.shape.toLowerCase();

    if (ufo_datetime === filterDateTime ||
      ufo_city === filterCity ||
      ufo_state === filterState ||
      ufo_country === filterCountry ||
      ufo_shape === filterShape){
        return true;
      }
      return false;

  });

  renderTableSection();
  }

// renderTableSection();