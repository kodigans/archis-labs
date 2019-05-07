var apiUrl = 'http://localhost:3000/api';

// ф-ия отрисовки таблицы с данными
function renderClientsGrid(data) {
  var clientsGridEl = document.getElementById('clientsGrid');

  // TODO удалить строки

  data.forEach(function(item, index) {
    var rowEl = document.createElement('tr');
    rowEl.innerHTML =
      '<td class="js-clientId">' +
      item.id +
      '</td>' +
      '<td>' +
      item.first_name +
      '</td>' +
      '<td>' +
      item.last_name +
      '</td>' +
      '<td>' +
      item.gender +
      '</td>' +
      '<td>' +
      item.date_of_birth +
      '</td>' +
      '<td>' +
      item.address +
      '</td>' +
      '<td>' +
      item.phone +
      '</td>' +
      '<td>' +
      item.email +
      '</td>' +
      '<td><button class="js-deleteClientBtn">Delete</button><button class="js-editClientBtn">Edit</button></td>';
    clientsGridEl.appendChild(rowEl);
  });
}

function deleteClient(id) {
  fetch(apiUrl + '/clients', {
    method: 'DELETE',
    headers,
    body: formDataToJSON(formData)
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      // обновляем таблицу после каждого добавления
      refreshClientsGrid();
    });
}

// ф-ия добавления обработчиков на кнопки удаления и обновления
function addClientRowHandlers() {
  var deleteClientBtnEls = document.getElementsByClassName(
    'js-deleteClientBtn'
  );

  for (var i = 0; i < deleteClientBtnEls.length; i++) {
    var item = deleteClientBtnEls[i];

    item.addEventListener('click', function() {
      var id = +item.parentElement.parentElement.getElementsByClassName(
        'js-clientId'
      )[0].innerHTML;

      console.log(id);
    });
  }

  var editClientBtnEls = document.getElementsByClassName('js-editClientBtn');

  for (var i = 0; i < editClientBtnEls.length; i++) {
    var item = editClientBtnEls[i];

    item.addEventListener('click', function() {
      var id = item.closest('js-clientId');

      console.log(id);
    });
  }
}

// ф-ия обновления таблицы (новый запрос данных)
function refreshClientsGrid() {
  fetch(apiUrl + '/clients')
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      renderClientsGrid(data);
      addClientRowHandlers();
    });
}

// обновляем таблицу первый раз
refreshClientsGrid();

// импорт из другого файла
var formDataToJSON = require('./utils').formDataToJSON;
var addClientFormEl = document.getElementById('addClientForm');

addClientFormEl.addEventListener('submit', function(event) {
  // блокируем обработчик по-умолчанию
  event.preventDefault();

  var headers = new Headers();

  headers.set('Content-type', 'application/json; charset=utf-8');

  var formData = new FormData(document.forms.addClientForm);

  fetch(apiUrl + '/clients', {
    method: 'POST',
    headers,
    body: formDataToJSON(formData)
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      // обновляем таблицу после каждого добавления
      refreshClientsGrid();
    });
});
