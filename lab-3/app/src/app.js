// импорт из другого файла
var formDataToJSON = require('./utils').formDataToJSON;

var apiUrl = 'http://localhost:3017/api';

// ф-ия отрисовки таблицы с данными
function renderClientsGrid(data) {
  var clientsGridEl = document.getElementById('clientsGrid');

  // удаляем старые строки
  clientsGridEl.innerHTML = '';

  var rowEl = document.createElement('tr');

  rowEl.innerHTML =
    '<th>Id</th>' +
    '<th>First name</th>' +
    '<th>Last name</th>' +
    '<th>Gender</th>' +
    '<th>Date of birth</th>' +
    '<th>Address</th>' +
    '<th>Phone</th>' +
    '<th>E-mail</th>' +
    '<th>Actions</th>';

  clientsGridEl.appendChild(rowEl);

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
      '<td><button class="btn btn-outline-danger btn-sm mr-2 mb-2 js-deleteClientBtn">Delete</button>' +
      '<button class="btn btn-outline-secondary btn-sm mr-2 mb-2 js-editClientBtn">Edit</button>' +
      '<button class="btn btn-outline-secondary btn-sm mr-2 mb-2 js-showClientDetailsBtn">Show details</button></td>';

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
function populateEditClientForm(id) {
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

// ф-ия отрисовки таблицы подробностей
function renderClientDetailsGrid(data) {
  var clientDetailsGridEl = document.getElementById('clientDetailsGrid');

  // удаляем старые строки
  clientDetailsGridEl.innerHTML = '';

  var rowEl = document.createElement('tr');

  rowEl.innerHTML =
    '<th>Id</th>' +
    '<th>Title</th>' +
    '<th>Description</th>' +
    '<th>Date of release</th>' +
    '<th>Price</th>' +
    '<th>Count</th>';

  clientDetailsGridEl.appendChild(rowEl);

  data.forEach(function(item, index) {
    var rowEl = document.createElement('tr');

    rowEl.innerHTML =
      '<td>' +
      item.id +
      '</td>' +
      '<td>' +
      item.title +
      '</td>' +
      '<td>' +
      item.description +
      '</td>' +
      '<td>' +
      item.date_of_release +
      '</td>' +
      '<td>' +
      item.price +
      '</td>' +
      '<td>' +
      item.count +
      '</td>';

    clientDetailsGridEl.appendChild(rowEl);
  });
}

// ф-ия обновления (вкл. получение данных) таблицы подробностей
function refreshClientDetailsGrid(id) {
  fetch(apiUrl + '/clientDetails/' + id)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      renderClientDetailsGrid(data);
    });
}

// ф-ия добавления обработчиков на кнопки удаления и обновления
function addClientRowHandlers() {
  // кнопка DELETE
  var deleteClientBtnEls = document.getElementsByClassName(
    'js-deleteClientBtn'
  );

  for (var i = 0; i < deleteClientBtnEls.length; i++) {
    var item = deleteClientBtnEls[i];

    item.addEventListener('click', function(event) {
      var id = event.target.parentElement.parentElement.getElementsByClassName(
        'js-clientId'
      )[0].innerHTML;

      deleteClient(id);
    });
  }

  // кнопка EDIT
  var editClientBtnEls = document.getElementsByClassName('js-editClientBtn');

  for (var i = 0; i < editClientBtnEls.length; i++) {
    var item = editClientBtnEls[i];

    item.addEventListener('click', function(event) {
      var id = event.target.parentElement.parentElement.getElementsByClassName(
        'js-clientId'
      )[0].innerHTML;

      populateEditClientForm(id);
    });
  }

  // кнопка SHOW DETAILS
  var showClientDetailsBtnEls = document.getElementsByClassName(
    'js-showClientDetailsBtn'
  );

  for (var i = 0; i < showClientDetailsBtnEls.length; i++) {
    var item = showClientDetailsBtnEls[i];

    item.addEventListener('click', function(event) {
      var id = event.target.parentElement.parentElement.getElementsByClassName(
        'js-clientId'
      )[0].innerHTML;

      refreshClientDetailsGrid(id);
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
