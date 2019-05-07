var apiUrl = 'http://localhost:3000/api';

fetch(apiUrl + '/clients').then(function(res) {
  console.log(res.json());

  var data = res.json();

  var tableBlock = document.getElementById('clientsList');
  data.forEach(function(item, index) {
    var row = document.createElement('tr');
    row.innerHTML = '<td></td>';
    tableBlock.appendChild(row);
  });
});

function formDataToJSON(formData) {
  var object = {};

  formData.forEach(function(value, key) {
    object[key] = value;
  });

  return JSON.stringify(object);
}

var addClientForm = document.getElementById('addClientForm');

addClientForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var headers = new Headers();

  headers.set('Content-type', 'application/json; charset=utf-8');

  var formData = new FormData(document.forms.addClientForm);

  fetch(apiUrl + '/clients', {
    method: 'POST',
    headers,
    body: formDataToJSON(formData)
  }).then(function(res) {
    console.log(res.json());
  });
});
