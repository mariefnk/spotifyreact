

function getNewReleases(countrySelected) {
const BASE_URL = 'https://api.spotify.com/v1/browse/new-releases';
let FETCH_URL = `${BASE_URL}?country=${countrySelected}`;
var accessToken = 'BQAyAWCedD1UeePTxk3uvTqdyKi0TG1c3VVmgebO_eGiafobnwk0KdbFhtr-o_lMqpgWv-NODZpbEzqjqV7ZOhmKXq1YaQBKTmKoo6T4l8trOJxELMXrgQqlDS9zK_gdAeNK47LBbkb9ZgHpZnOGn0nHI4vYmFUwxL_p&refresh_token=AQB5HbzP1EFcbHMMgOj0TgwiCxLzO4aG1UctUeojsYUDCV1BKYZznosClYSyMXWLAUnTMhRGE6zsmAvtalDNzPaH2GxZPGNam6Ul8H5aW9KFnkHoqHp53LVEC4ZyJKtS_Ik';
var params = {
  "url": FETCH_URL,
  "async": true,
  "crossDomain": true,
  "method": "GET",
  "headers": {
    "accept": "application/json",
    "authorization": "Bearer BQAyAWCedD1UeePTxk3uvTqdyKi0TG1c3VVmgebO_eGiafobnwk0KdbFhtr-o_lMqpgWv-NODZpbEzqjqV7ZOhmKXq1YaQBKTmKoo6T4l8trOJxELMXrgQqlDS9zK_gdAeNK47LBbkb9ZgHpZnOGn0nHI4vYmFUwxL_p&refresh_token=AQB5HbzP1EFcbHMMgOj0TgwiCxLzO4aG1UctUeojsYUDCV1BKYZznosClYSyMXWLAUnTMhRGE6zsmAvtalDNzPaH2GxZPGNam6Ul8H5aW9KFnkHoqHp53LVEC4ZyJKtS_Ik",
            }
          }
fetch(BASE_URL, params).then(response => response.json()).then(json => {
  const newReleases = json;
  console.log("new releases", newReleases);
  return newReleases;
});
}

export default getNewReleases;
