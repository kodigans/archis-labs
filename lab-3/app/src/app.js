// импорт из другого файла
var formDataToJSON = require('./utils').formDataToJSON;

var apiUrl = 'http://localhost:3017/api';

// ф-ия отрисовки таблицы с данными
function renderClientsGrid(data) {
  var clientsGridEl = document.getElementById('clientsGrid');

  // удаляем старые строки
  clientsGridEl.innerHTML = '';

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
      '<td><button class="js-deleteClientBtn">Delete</button><button class="js-editClientBtn ' +
      index +
      '">Edit</button></td>';
    clientsGridEl.appendChild(rowEl);
  });
}

// ф-ия отправки DELETE-запроса
function deleteClient(id) {
  fetch(apiUrl + '/clients/' + id, {
    method: 'DELETE'
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      // обновляем таблицу после каждого удаления
      refreshClientsGrid();
    });
}

// ф-ия заполнения формы для редактирования
function populateEditForm(id) {
  // делаем GET-запрос и получаем один документ по id
  fetch(apiUrl + '/clients/' + id)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      // заполняем форму данными из GET-запроса
      document.forms.editClientForm.elements.id.value = data.id;
      document.forms.editClientForm.elements.first_name.value = data.first_name;
      document.forms.editClientForm.elements.last_name.value = data.last_name;
      document.forms.editClientForm.elements.gender.value = data.gender;
      document.forms.editClientForm.elements.date_of_birth.value =
        data.date_of_birth;
      document.forms.editClientForm.elements.address.value = data.address;
      document.forms.editClientForm.elements.phone.value = data.phone;
      document.forms.editClientForm.elements.email.value = data.email;
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
      var id = event.target.parentElement.parentElement.getElementsByClassName(
        'js-clientId'
      )[0].innerHTML;

      deleteClient(id);
    });
  }

  var editClientBtnEls = document.getElementsByClassName('js-editClientBtn');

  for (var i = 0; i < editClientBtnEls.length; i++) {
    var item = editClientBtnEls[i];

    item.addEventListener('click', function(event) {
      var id = event.target.parentElement.parentElement.getElementsByClassName(
        'js-clientId'
      )[0].innerHTML;

      populateEditForm(id);
    });
  }
}

// ф-ия обновления таблицы (новый GET-запрос данных)
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

var addClientFormEl = document.getElementById('addClientForm');

addClientFormEl.addEventListener('submit', function(event) {
  // блокируем обработчик по-умолчанию
  event.preventDefault();

  var headers = new Headers();

  headers.set('Content-Type', 'application/json; charset=utf-8');

  var formData = new FormData(document.forms.addClientForm);

  // отправка POST-запроса
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
      document.forms.addClientForm.reset();
    });
});

var editClientFormEl = document.getElementById('editClientForm');

editClientFormEl.addEventListener('submit', function(event) {
  // блокируем обработчик по-умолчанию
  event.preventDefault();

  var headers = new Headers();

  headers.set('Content-Type', 'application/json; charset=utf-8');

  var formData = new FormData(document.forms.editClientForm);

  // отправка PUT-запроса
  fetch(
    apiUrl + '/clients/' + document.forms.editClientForm.elements.id.value,
    {
      method: 'PUT',
      headers,
      body: formDataToJSON(formData)
    }
  )
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      // обновляем таблицу после каждого обновления
      refreshClientsGrid();
      document.forms.editClientForm.reset();
    });
});
