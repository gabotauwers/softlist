(function() {

    'use strict';
  
    var ENTER_KEY = 13;
    let categoria = document.getElementById("nombreCategoria");
    let guardar = document.getElementById("guardar");
    var syncDom = document.getElementById('sync-wrapper');
    let categorias = document.getElementById("categoria");
    let opciones = categorias.querySelectorAll("option");
    // let Phrase = document.getElementById("Phrase");
    // function getTraje(ImagenAEscanear){
    //   let TodosLosFragmentos = ImagenAEscanear.split('/');
    //   let SoloNombre = TodosLosFragmentos[(TodosLosFragmentos.length) - 1];
    //   SoloNombre = SoloNombre.split('.')[0];
    //   return SoloNombre;
    // }
  window.addEventListener("load", () =>{
      let lista = document.getElementsByTagName('li');
      console.log(lista);
      setTimeout(function () {
        if (Array.from(lista).length > 0) {

        }
        else{
          opciones.forEach((opcion) => {
            addTodo(opcion.textContent);
          });
        }
      },1000);
    });

  
    guardar.addEventListener("click", () =>{
      addTodo(categoria.value);
    })
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
    // EDITING STARTS HERE (you dont need to edit anything above this line)
  
    var db = new Pouch('categorias');
    var remoteCouch = false;
    var cookie;

    db.info(function(err, info) {
      db.changes({since: info.update_seq, onChange: showTodos, continuous: true});
    });
  
    // We have to create a new todo document and enter it in the database
    function addTodo(Categoria) {
      var todo = {
        Nombre: Categoria
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
    function todoDblClicked(todo) {
      var div = document.getElementById('li_' + todo._id);
      var inputEditTodo = document.getElementById('input_' + todo._id);
      div.className = 'editing';
      inputEditTodo.focus();
    }
  
    // If they press enter while editing an entry, blur it to trigger save
    // (or delete)
    function todoKeyPressed(todo, event) {
      if (event.keyCode === ENTER_KEY) {
        var inputEditTodo = document.getElementById('input_' + todo._id);
        inputEditTodo.blur();
      }
    }
    function showTodos() {
      db.allDocs({include_docs: true}, function(err, doc) {
        redrawTodosUI(doc.rows);
      });
    }
    function redrawTodosUI(todos) {
      var ul = document.getElementById('todo-list');
      ul.innerHTML = '';
      todos.forEach(function(todo) {
        ul.appendChild(createTodoListItem(todo.doc));
      });
    }
    function createTodoListItem(todo) {
      var label = document.createElement('label');
      label.appendChild( document.createTextNode(todo.Nombre));
      label.addEventListener('dblclick', todoDblClicked.bind(this, todo));
  
      var deleteLink = document.createElement('button');
      deleteLink.className = 'destroy';
      deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));
  
      var divDisplay = document.createElement('div');
      divDisplay.className = 'view';
      divDisplay.appendChild(label);
      divDisplay.appendChild(deleteLink);
  
      var inputEditTodo = document.createElement('input');
      inputEditTodo.id = 'input_' + todo._id;
      inputEditTodo.className = 'edit';
      inputEditTodo.value = todo.Nombre;
      inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
      inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));
  
      var li = document.createElement('li');
      li.id = 'li_' + todo._id;
      li.appendChild(divDisplay);
      li.appendChild(inputEditTodo);
  

      return li;
    }
    showTodos();
  
  })();