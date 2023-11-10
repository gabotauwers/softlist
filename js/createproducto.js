(function () {
  'use strict';

  var ENTER_KEY = 13;
  let nombre = document.getElementById("nombre");
  let precio = document.getElementById("precio");
  let categoria = document.getElementById("categoria");
  let cantidad = document.getElementById("cantidad");
  let unidad = document.getElementById("unidad");
  let nota = document.getElementById("nota");
  let crear = document.getElementById("crear");
  var syncDom = document.getElementById('sync-wrapper');
  let imagen = document.getElementById("imagen");
  // let imagenPreview = document.getElementById("imagen-preview"); // Element to display image preview

  // Add change event listener to the image input
  imagen.addEventListener("change", function () {
    handleImageUpload(this);
  });

  crear.addEventListener("click", () => {
    // Get the selected image file
    var imagenFile = imagen.files[0];
    alert(imagenFile);
    if (imagenFile) {
      // Save the image to PouchDB
      saveImageToDB(imagenFile).then((imageUrl) => {
        // After successfully saving the image, add the product with the image URL
        addTodo(
          nombre.value,
          categoria.options[categoria.selectedIndex].text,
          precio.value,
          imageUrl,
          cantidad.value,
          unidad.options[unidad.selectedIndex].text,
          nota.value
        );
      }).catch((error) => {
        console.error("Error saving image:", error);
      });
    } 
    else {
      // No image selected, add the product without an image URL
      addTodo(
        nombre.value,
        categoria.options[categoria.selectedIndex].text,
        precio.value,
        '',
        cantidad.value,
        unidad.options[unidad.selectedIndex].text,
        nota.value
      );
    }
  });

  function handleImageUpload(input) {
    // Display image preview
    var reader = new FileReader();
    reader.onload = function (e) {
      input.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }

  function saveImageToDB(imageFile) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        // Convert the image to a base64-encoded string
        var imageData = reader.result.split(',')[1];

        // Save the image to PouchDB
        // var imageDoc = {
        //   _id: new Date().toISOString(),
        //   type: 'image',
        //   data: imageData
        // };

        // db.put(imageDoc, function (err, response) {
        //   if (!err) {
        //     // Resolve with the URL of the saved image
            resolve(`data:image/png;base64,${imageData}`);
        //   } else {
        //     reject(err);
        //   }
        // });
      };
      reader.readAsDataURL(imageFile);
    });
  }
    
  //   crear.addEventListener("click", () =>{
  //       var texto = imagen.value;
  //       var nuevaRuta = texto.slice(12);
  //   addTodo(nombre.value, categoria.options[categoria.selectedIndex].text, precio.value, 'img/productos/' + nuevaRuta, cantidad.value, unidad.options[unidad.selectedIndex].text, nota.value);
  //   }
  // );
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
    // function redrawTodosUI(todos) {
    //   var ul = document.getElementById('productList');
    //   ul.innerHTML = '';
    //   todos.forEach(function(todo) {
    //     ul.appendChild(createTodoListItem(todo.doc));
    //   });
    // }
    // function createTodoListItem(todo) {
    //   var label = document.createElement('label');
    //   label.appendChild( document.createTextNode(todo.Nombre));
  
    //   // var deleteLink = document.createElement('button');
    //   // deleteLink.className = 'destroy';
    //   // deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));
  
    //   var imagen = document.createElement('img');
    //   imagen.className = 'product-image';
    //   imagen.src = todo.Imagen;
  
    //   // var inputEditTodo = document.createElement('input');
    //   // inputEditTodo.id = 'input_' + todo._id;
    //   // inputEditTodo.className = 'edit';
    //   // inputEditTodo.value = todo.Nombre;
    //   // inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
    //   // inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));
  
    //   var li = document.createElement('li');
    //   li.id = todo._id;
    //   li.className = 'articulo list-group-item d-flex align-items-center';
    //   li.appendChild(imagen);
    //   li.appendChild(label);
    //   // li.appendChild(inputEditTodo);
  
  
    //   return li;
    // }
    // showTodos();
  
  })();