window.addEventListener('load', function(){

    'use strict';

    // var ENTER_KEY = 13;
    // let categoria = document.getElementById("nombreCategoria");
    // let guardar = document.getElementById("guardar");
    // var syncDom = document.getElementById('sync-wrapper');
    // const PouchDB = require('pouchdb');
    let selectElement = document.getElementById('categoria');
    const db = new PouchDB('categorias');
      db.allDocs({ include_docs: true, attachments: true }, function(err, response) {
        if (err) {
          return console.log(err);
        }
        response.rows.forEach(function(row) {
          console.log(row.doc);
          let option = document.createElement('option');
          option.value = row.doc._id;
          option.text = row.doc.Nombre;
          selectElement.add(option);
        });
      });

    // var remoteCouch = false;
    // var cookie;

    // db.info(function(err, info) {
    //     db.changes({since: info.update_seq, onChange: showTodos, continuous: true});
    //   });
    // function showTodos() {
    //     db.allDocs({include_docs: true}, function(err, doc) {
    //       redrawTodosUI(doc.rows);
    //     });
    //   }

    // function createTodoListItem(todo) {
    //     //   var checkbox = document.createElement('input');
    //     //   checkbox.className = 'toggle';
    //     //   checkbox.type = 'checkbox';
    //     //   checkbox.addEventListener('change', checkboxChanged.bind(this, todo));

    //       var label = document.createElement('label');
    //       label.appendChild( document.createTextNode(todo.Nombre));
    //     //   label.addEventListener('dblclick', todoDblClicked.bind(this, todo));

    //     //   var deleteLink = document.createElement('button');
    //     //   deleteLink.className = 'destroy';
    //     //   deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));

    //       var divDisplay = document.createElement('div');
    //       divDisplay.className = 'view';
    //     //   divDisplay.appendChild(checkbox);
    //       divDisplay.appendChild(label);
    //     //   divDisplay.appendChild(deleteLink);

    //       var inputEditTodo = document.createElement('input');
    //       inputEditTodo.id = 'input_' + todo._id;
    //       inputEditTodo.className = 'edit';
    //       inputEditTodo.value = todo.title;
    //       inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
    //       inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));

    //       var li = document.createElement('li');
    //       li.id = 'li_' + todo._id;
    //       li.appendChild(divDisplay);
    //       li.appendChild(inputEditTodo);

    //       if (todo.completed) {
    //         li.className += 'complete';
    //         checkbox.checked = true;
    //       }

    //       return li;
    //     }
    //     function redrawTodosUI(todos) {
    //         var ul = document.getElementById('todo-list');
    //         ul.innerHTML = '';
    //         todos.forEach(function(todo) {
    //           ul.appendChild(createTodoListItem(todo.doc));
    //         });
    //       }
    //     if (remoteCouch) {
    //       sync();
    //     }
})