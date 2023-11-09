(function() {

  'use strict';

  var ENTER_KEY = 13;
  let productList = document.getElementById("productList1");
  let guardar = document.getElementById("guardar");
  var syncDom = document.getElementById('sync-wrapper');
  let opciones = productList.querySelectorAll("li");

  window.addEventListener("load", () =>{
    let lista = document.getElementsByTagName('li');
    // console.log(lista);
    setTimeout(function () {
      if (Array.from(lista).length > 11) {
        console.log("Ya hay elementos");
      }
      else{
        opciones.forEach((opcion) => {
          addTodo(opcion.querySelectorAll('p')[0].textContent, opcion.querySelectorAll('p')[1].textContent,opcion.querySelectorAll('p')[2].textContent,opcion.querySelector("img").src, opcion.querySelectorAll('p')[3].textContent,opcion.querySelectorAll('p')[4].textContent,opcion.querySelectorAll('p')[5].textContent);
        });
      }
    },1000);
  });
  function sync() {
      syncDom.setAttribute('data-sync-state', 'syncing');
      var remote = new PouchDB(remoteCouch, {headers: {'Cookie': cookie}});
    }
  // EDITING STARTS HERE (you dont need to edit anything above this line)

  var db = new Pouch('productos');
  var remoteCouch = false;
  var cookie;

  db.info(function(err, info) {
    db.changes({since: info.update_seq, onChange: showTodos, continuous: true});
  });

  // We have to create a new todo document and enter it in the database
  function addTodo(Producto, Categoria, Precio, Imagen, Cantidad, Unidad, Nota) {
    var todo = {
      Nombre: Producto,
      Categoria: Categoria,
      Precio: Precio,
      Imagen: Imagen,
      Cantidad: Cantidad,
      Unidad: Unidad,
      Nota: Nota    
    };
    db.post(todo, function(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
  }

  // User pressed the delete button for a todo, delete it
  function deleteButtonPressed(todo) {
    db.remove(todo);
  }

  // The input box when editing a todo has blurred, we should save
  // the new title or delete the todo if the title is empty
  function todoBlurred(todo, event) {
    var trimmedText = event.target.value.trim();
    if (!trimmedText) {
      db.remove(todo);
    } else {
      todo.Nombre = trimmedText;
      db.put(todo);
    }
  }

  // Initialise a sync with the remote server
  function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var remote = new PouchDB(remoteCouch, {headers: {'Cookie': cookie}});
    var pushRep = db.replicate.to(remote, {
      continuous: true,
      complete: syncError
    });
    var pullRep = db.replicate.from(remote, {
      continuous: true,
      complete: syncError
    });
  }

  // EDITING STARTS HERE (you dont need to edit anything below this line)

  // There was some form or error syncing
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }

  // User has double clicked a todo, display an input so they can edit the title
  // function todoDblClicked(todo) {
  //   var div = document.getElementById('li_' + todo._id);
  //   var inputEditTodo = document.getElementById('input_' + todo._id);
  //   div.className = 'editing';
  //   inputEditTodo.focus();
  // }

  // If they press enter while editing an entry, blur it to trigger save
  // (or delete)
  // function todoKeyPressed(todo, event) {
  //   if (event.keyCode === ENTER_KEY) {
  //     var inputEditTodo = document.getElementById('input_' + todo._id);
  //     inputEditTodo.blur();
  //   }
  // }
  function showTodos() {
    db.allDocs({include_docs: true}, function(err, doc) {
      redrawTodosUI(doc.rows);
    });
  }
  function redrawTodosUI(todos) {
    var ul = document.getElementById('productList');
    ul.innerHTML = '';
    todos.forEach(function(todo) {
      ul.appendChild(createTodoListItem(todo.doc));
    });
  }
  function createTodoListItem(todo) {
    var label = document.createElement('label');
    label.appendChild(document.createTextNode(todo.Nombre));

    // var deleteLink = document.createElement('button');
    // deleteLink.className = 'destroy';
    // deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));

    var imagen = document.createElement('img');
    imagen.className = 'product-image';
    imagen.src = todo.Imagen;

    var precio = document.createElement('label');
    precio.appendChild(document.createTextNode(todo.Precio));
    precio.hidden = true;
    precio.className = "product-price";

    var categoria = document.createElement('label');
    categoria.appendChild(document.createTextNode(todo.Categoria));
    categoria.hidden = true;

    var cantidad = document.createElement('label');
    cantidad.appendChild(document.createTextNode(todo.Cantidad));
    cantidad.hidden = true;

    var unidad = document.createElement('label');
    unidad.appendChild(document.createTextNode(todo.Unidad));
    unidad.hidden = true;

    var nota = document.createElement('label');
    nota.appendChild(document.createTextNode(todo.Nota));
    nota.hidden = true;

    // var inputEditTodo = document.createElement('input');
    // inputEditTodo.id = 'input_' + todo._id;
    // inputEditTodo.className = 'edit';
    // inputEditTodo.value = todo.Nombre;
    // inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
    // inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));

    var li = document.createElement('li');
    // li.id = "";
    li.className = 'articulo lista list-group-item d-flex align-items-center';
    li.appendChild(imagen);
    li.appendChild(label);
    li.appendChild(categoria);
    li.appendChild(precio);
    li.appendChild(cantidad);
    li.appendChild(unidad);
    li.appendChild(nota);
    // li.appendChild(inputEditTodo);


    return li;
  }
  showTodos();
  

})();