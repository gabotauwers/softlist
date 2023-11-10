(function () {
  "use strict";
  var ENTER_KEY = 13;
  const db = new PouchDB("lista");
  let lista = document.getElementById("productoDetalle");
  let listaCarrito = document.getElementById("carritoDetalle");
  let total = document.getElementById("total");
  let carrito = document.getElementById("carrito");
  let valorTotal = 0;
  let valorCarrito = 0;
  let itemsTotal = 0;
  let itemsCarrito = 0;
  window.addEventListener("load", function () {
    db.allDocs(
      { include_docs: true, attachments: true },
      function (err, response) {
        if (err) {
          return console.log(err);
        }
        response.rows.forEach(function redrawTodosUI(row) {
          // crearElementos(row, lista, false);
          valorTotal = valorTotal + (parseInt(row.doc.Precio) * parseInt(row.doc.Cantidad));
          itemsTotal = itemsTotal + 1;
          total.innerHTML = "Total (" + itemsTotal + ") $" + valorTotal + ".00";
          return lista;
        });
        function todoDblClicked(todo) {
          var div = document.getElementById("li_" + todo._id);
          var inputEditTodo = document.getElementById("input_" + todo._id);
          div.className = "editing";
          inputEditTodo.focus();
        }
        function todoKeyPressedNombre(todo, event) {
          if (event.keyCode === ENTER_KEY) {
            var inputEditTodo = document.getElementById(
              "input_" + todo._id + "_" + todo.Nombre
            );
            console.log(inputEditTodo);
            inputEditTodo.blur();
          }
        }
        function todoKeyPressedCategoria(todo, event) {
          if (event.keyCode === ENTER_KEY) {
            var inputEditTodo = document.getElementById(
              "input_" + todo._id + "_" + todo.Categoria
            );
            console.log(inputEditTodo);
            inputEditTodo.blur();
          }
        }
        function todoKeyPressedPrecio(todo, event) {
          if (event.keyCode === ENTER_KEY) {
            var inputEditTodo = document.getElementById(
              "input_" + todo._id + "_" + todo.Precio
            );
            console.log(inputEditTodo);
            inputEditTodo.blur();
          }
        }
        function todoKeyPressedCantidad(todo, event) {
          if (event.keyCode === ENTER_KEY) {
            var inputEditTodo = document.getElementById(
              "input_" + todo._id + "_" + todo.Cantidad
            );
            console.log(inputEditTodo);
            inputEditTodo.blur();
          }
        }
        function todoKeyPressedUnidad(todo, event) {
          if (event.keyCode === ENTER_KEY) {
            var inputEditTodo = document.getElementById(
              "input_" + todo._id + "_" + todo.Unidad
            );
            console.log(inputEditTodo);
            inputEditTodo.blur();
          }
        }
        function todoKeyPressedNota(todo, event) {
          if (event.keyCode === ENTER_KEY) {
            var inputEditTodo = document.getElementById(
              "input_" + todo._id + "_" + todo.Nota
            );
            console.log(inputEditTodo);
            inputEditTodo.blur();
          }
        }
        function todoBlurredNombre(todo, event) {
          var trimmedText = event.target.value.trim();
          if (!trimmedText) {
            db.remove(todo);
            valor = null;
          } else {
            todo.Nombre = trimmedText;
            db.put(todo);
          }
        }
        function todoBlurredCategoria(todo, event) {
          var trimmedText = event.target.value.trim();
          if (!trimmedText) {
            db.remove(todo);
            valor = null;
          } else {
            todo.Categoria = trimmedText;
            db.put(todo);
          }
        }
        function todoBlurredPrecio(todo, event) {
          var trimmedText = event.target.value.trim();
          if (!trimmedText) {
            db.remove(todo);
            valor = null;
          } else {
            todo.Precio = trimmedText;
            db.put(todo);
          }
        }
        function todoBlurredCantidad(todo, event) {
          var trimmedText = event.target.value.trim();
          if (!trimmedText) {
            db.remove(todo);
            valor = null;
          } else {
            todo.Cantidad = trimmedText;
            db.put(todo);
          }
        }
        function todoBlurredUnidad(todo, event) {
          var trimmedText = event.target.value.trim();
          if (!trimmedText) {
            db.remove(todo);
            valor = null;
          } else {
            todo.Unidad = trimmedText;
            db.put(todo);
          }
        }
        function todoBlurredNota(todo, event) {
          var trimmedText = event.target.value.trim();
          if (!trimmedText) {
            db.remove(todo);
            valor = null;
          } else {
            todo.Nota = trimmedText;
            db.put(todo);
          }
        }
        function deleteButtonPressed(todo) {
          var resultado = window.confirm(
            "¿Estás seguro de que quieres continuar?"
          );

          if (resultado) {
            // El usuario presionó "Aceptar"
            db.remove(todo);
            window.location.reload(true);
            console.log("El usuario ha confirmado.");
          } else {
            // El usuario presionó "Cancelar"
            console.log("El usuario ha cancelado.");
          }
        }
        function editButtonPressed(todo) {
          let divOculto = document.getElementById("div_" + todo._id);
          let buttonSave = document.getElementById("save_" + todo._id);
          let buttonEdit = document.getElementById("edit_" + todo._id);
          if (divOculto.hidden == false) {
            divOculto.hidden = true;
            buttonSave.hidden = true;
            buttonEdit.textContent = "Editar";
          } else {
            divOculto.hidden = false;
            buttonSave.hidden = false;
            buttonEdit.textContent = "Cancelar";
          }
        }
        function saveButtonPressed() {
          window.location.reload(true);
        }
        let productos = response.rows.map((row) => row.doc);
        productos.sort((a, b) => a.Categoria.localeCompare(b.Categoria));

        // Paso 3: Crear elementos HTML ordenados
        let currentCategoria = null;
        productos.forEach((producto) => {
          if (producto.Categoria !== currentCategoria) {
            let categoriaTitulo = document.createElement("h3");
            categoriaTitulo.textContent = producto.Categoria;
            lista.appendChild(categoriaTitulo);
            currentCategoria = producto.Categoria;
          }
          let lista1 = document.createElement("ul");
          lista1.id = "li_" + producto._id;

          let detalles = document.createElement("li");
          detalles.id = "productDetails";
          detalles.className = "d-flex align-items-left";

          let elemento = document.createElement("li");
          elemento.className = "list-group-item d-flex align-items-center";

          let imagen = document.createElement("img");
          imagen.id = "productImage";
          imagen.className = "product-image";
          imagen.src = producto.Imagen;

          let nombre = document.createElement("p");
          let texto = document.createTextNode(producto.Nombre);
          nombre.appendChild(texto);
          // nombre.addEventListener('dblclick', todoDblClicked.bind(this, producto));

          var checkbox = document.createElement("input");
          checkbox.className = "toggle";
          checkbox.type = "checkbox";
          checkbox.checked = false;
          checkbox.addEventListener(
            "change",
            checkboxChanged.bind(this, producto)
          );

          var categoria = document.createElement("p");
          categoria.id = "productCategory";
          var texto1 = document.createTextNode(
            "Categoría: " + producto.Categoria
          );
          categoria.appendChild(texto1);

          var precio = document.createElement("p");
          precio.id = "productPrice";
          var texto2 = document.createTextNode(
            "Precio: $" + producto.Precio + ".00"
          );
          precio.appendChild(texto2);

          var cantidad = document.createElement("p");
          cantidad.id = "productQuantity";
          var texto3 = document.createTextNode(
            "Cantidad: " + producto.Cantidad + " " + producto.Unidad
          );
          cantidad.appendChild(texto3);

          var descripcion = document.createElement("p");
          descripcion.id = "productDescription";
          var texto4 = document.createTextNode("Nota: " + producto.Nota);
          descripcion.appendChild(texto4);

          var deleteLink = document.createElement("button");
          deleteLink.id = "delete_" + producto._id;
          deleteLink.className = "btn btn-danger m-2";
          deleteLink.textContent = "Eliminar";
          deleteLink.addEventListener(
            "click",
            deleteButtonPressed.bind(this, producto)
          );

          var editLink = document.createElement("button");
          editLink.id = "edit_" + producto._id;
          editLink.className = "btn btn-warning";
          editLink.textContent = "Editar";
          editLink.addEventListener(
            "click",
            editButtonPressed.bind(this, producto)
          );

          var saveLink = document.createElement("button");
          saveLink.id = "save_" + producto._id;
          saveLink.className = "btn btn-success m-2";
          saveLink.textContent = "Guardar";
          saveLink.hidden = true;
          saveLink.addEventListener("click", saveButtonPressed.bind(this));

          var divDisplay = document.createElement("div");
          divDisplay.className = "view";
          divDisplay.appendChild(nombre);
          divDisplay.appendChild(deleteLink);
          divDisplay.appendChild(editLink);
          divDisplay.appendChild(saveLink);

          var inputEditNombre = document.createElement("input");
          inputEditNombre.id = "input_" + producto._id + "_" + producto.Nombre;
          inputEditNombre.className = "edit";
          inputEditNombre.value = producto.Nombre;
          inputEditNombre.addEventListener(
            "keypress",
            todoKeyPressedNombre.bind(this, producto)
          );
          inputEditNombre.addEventListener(
            "blur",
            todoBlurredNombre.bind(this, producto)
          );

          var inputEditCategoría = document.createElement("input");
          inputEditCategoría.id =
            "input_" + producto._id + "_" + producto.Categoria;
          inputEditCategoría.className = "edit";
          inputEditCategoría.value = producto.Categoria;
          inputEditCategoría.addEventListener(
            "keypress",
            todoKeyPressedCategoria.bind(this, producto)
          );
          inputEditCategoría.addEventListener(
            "blur",
            todoBlurredCategoria.bind(this, producto)
          );

          var inputEditPrecio = document.createElement("input");
          inputEditPrecio.id = "input_" + producto._id + "_" + producto.Precio;
          inputEditPrecio.className = "edit";
          inputEditPrecio.value = producto.Precio;
          inputEditPrecio.addEventListener(
            "keypress",
            todoKeyPressedPrecio.bind(this, producto)
          );
          inputEditPrecio.addEventListener(
            "blur",
            todoBlurredPrecio.bind(this, producto)
          );

          var inputEditCantidad = document.createElement("input");
          inputEditCantidad.id =
            "input_" + producto._id + "_" + producto.Cantidad;
          inputEditCantidad.className = "edit";
          inputEditCantidad.value = producto.Cantidad;
          inputEditCantidad.addEventListener(
            "keypress",
            todoKeyPressedCantidad.bind(this, producto)
          );
          inputEditCantidad.addEventListener(
            "blur",
            todoBlurredCantidad.bind(this, producto)
          );

          var inputEditUnidad = document.createElement("input");
          inputEditUnidad.id = "input_" + producto._id + "_" + producto.Unidad;
          inputEditUnidad.className = "edit";
          inputEditUnidad.value = producto.Unidad;
          inputEditUnidad.addEventListener(
            "keypress",
            todoKeyPressedUnidad.bind(this, producto)
          );
          inputEditUnidad.addEventListener(
            "blur",
            todoBlurredUnidad.bind(this, producto)
          );

          var inputEditNota = document.createElement("input");
          inputEditNota.id = "input_" + producto._id + "_" + producto.Nota;
          inputEditNota.className = "edit";
          inputEditNota.value = producto.Nota;
          inputEditNota.addEventListener(
            "keypress",
            todoKeyPressedNota.bind(this, producto)
          );
          inputEditNota.addEventListener(
            "blur",
            todoBlurredNota.bind(this, producto)
          );

          var editar = document.createElement("div");
          editar.id = "div_" + producto._id;
          editar.className = "m-4";
          editar.hidden = true;

          var lblNombre = document.createElement("label");
          lblNombre.id = "lblNombre_" + producto._id;
          lblNombre.className = "lblNombre mr-2";
          lblNombre.textContent = "Nombre: ";

          var lblCategoria = document.createElement("label");
          lblCategoria.id = "lblCategoria_" + producto._id;
          lblCategoria.className = "lblCategoria mr-2";
          lblCategoria.textContent = "Categoría: ";

          var lblPrecio = document.createElement("label");
          lblPrecio.id = "lblPrecio_" + producto._id;
          lblPrecio.className = "lblPrecio mr-2";
          lblPrecio.textContent = "Precio: ";

          var lblCantidad = document.createElement("label");
          lblCantidad.id = "lblCantidad_" + producto._id;
          lblCantidad.className = "lblCantidad mr-2";
          lblCantidad.textContent = "Cantidad: ";

          var lblUnidad = document.createElement("label");
          lblUnidad.id = "lblUnidad_" + producto._id;
          lblUnidad.className = "lblUnidad mr-2";
          lblUnidad.textContent = "Unidad: ";

          var lblNota = document.createElement("label");
          lblNota.id = "lblNota_" + producto._id;
          lblNota.className = "lblNota mr-2";
          lblNota.textContent = "Nota: ";

          elemento.appendChild(imagen);
          detalles.appendChild(nombre);
          detalles.appendChild(categoria);
          detalles.appendChild(precio);
          detalles.appendChild(cantidad);
          detalles.appendChild(descripcion);
          elemento.appendChild(checkbox);

          lista1.appendChild(divDisplay);
          editar.appendChild(lblNombre);
          editar.appendChild(inputEditNombre);
          editar.appendChild(lblCategoria);
          editar.appendChild(inputEditCategoría);
          editar.appendChild(lblPrecio);
          editar.appendChild(inputEditPrecio);
          editar.appendChild(lblCantidad);
          editar.appendChild(inputEditCantidad);
          editar.appendChild(lblUnidad);
          editar.appendChild(inputEditUnidad);
          editar.appendChild(lblNota);
          editar.appendChild(inputEditNota);
          lista1.appendChild(editar);
          lista1.appendChild(detalles);
          elemento.appendChild(lista1);
          lista.appendChild(elemento);

          function checkboxChanged(row, event) {
            if (event.target.checked) {
              lista.removeChild(event.target.parentNode);
              // crearElementos(row, listaCarrito, true);
              let lista1 = document.createElement("ul");
              lista1.id = "productList";
              lista1.className = "";

              let detalles = document.createElement("li");
              detalles.id = "productDetails";
              detalles.className = "d-flex align-items-left";

              let elemento = document.createElement("li");
              elemento.className = "list-group-item d-flex align-items-center";

              let imagen = document.createElement("img");
              imagen.id = "productImage";
              imagen.className = "product-image";
              imagen.src = producto.Imagen;

              let nombre = document.createElement("p");
              nombre.id = "productName";
              let texto = document.createTextNode(producto.Nombre);
              nombre.appendChild(texto);

              var checkbox = document.createElement("input");
              checkbox.className = "toggle";
              checkbox.type = "checkbox";
              checkbox.checked = true;
              checkbox.addEventListener(
                "change",
                checkboxChanged.bind(this, producto)
              );

              var categoria = document.createElement("p");
              categoria.id = "productCategory";
              var texto1 = document.createTextNode(
                "Categoría: " + producto.Categoria
              );
              categoria.appendChild(texto1);

              var precio = document.createElement("p");
              precio.id = "productPrice";
              var texto2 = document.createTextNode(
                "Precio: $" + producto.Precio + ".00"
              );
              precio.appendChild(texto2);

              var cantidad = document.createElement("p");
              cantidad.id = "productQuantity";
              var texto3 = document.createTextNode(
                "Cantidad: " + producto.Cantidad + " " + producto.Unidad
              );
              cantidad.appendChild(texto3);

              var descripcion = document.createElement("p");
              descripcion.id = "productDescription";
              var texto4 = document.createTextNode("Nota: " + producto.Nota);
              descripcion.appendChild(texto4);

              elemento.appendChild(imagen);
              detalles.appendChild(nombre);
              detalles.appendChild(categoria);
              detalles.appendChild(precio);
              detalles.appendChild(cantidad);
              detalles.appendChild(descripcion);
              elemento.appendChild(checkbox);

              lista1.appendChild(detalles);
              elemento.appendChild(lista1);
              listaCarrito.appendChild(elemento);
              valorCarrito = valorCarrito + (parseInt(producto.Precio) * parseInt(producto.Cantidad));
              itemsCarrito = itemsCarrito + 1;
              carrito.innerHTML =
                "Carrito (" + itemsCarrito + ") $" + valorCarrito + ".00";
            } else {
              listaCarrito.removeChild(event.target.parentNode);
              // crearElementos(row, lista, false);
              if (producto.Categoria !== currentCategoria) {
                let categoriaTitulo1 = document.createElement("h3");
                let categoriaTitulo = lista.getElementsByTagName("h3");
                console.log(categoriaTitulo);
                for (let i = 0; i < categoriaTitulo.length; i++) {
                  if (
                    (categoriaTitulo[i].textContent == producto.Categoria &&
                      categoriaTitulo[i].nextSibling === "h3") ||
                    (categoriaTitulo[i].textContent == producto.Categoria &&
                      categoriaTitulo[i].nextSibling !== "li")
                  ) {
                    console.log(categoriaTitulo[i].textContent);
                    console.log(producto.Categoria);
                    console.log("entro");
                    lista.removeChild(categoriaTitulo[i]);
                  }
                }
                categoriaTitulo1.textContent = producto.Categoria;
                lista.appendChild(categoriaTitulo1);
                currentCategoria = producto.Categoria;
              }
              let lista1 = document.createElement("ul");
              lista1.id = "li_" + producto._id;

              let detalles = document.createElement("li");
              detalles.id = "productDetails";
              detalles.className = "d-flex align-items-left";

              let elemento = document.createElement("li");
              elemento.className = "list-group-item d-flex align-items-center";

              let imagen = document.createElement("img");
              imagen.id = "productImage";
              imagen.className = "product-image";
              imagen.src = producto.Imagen;

              let nombre = document.createElement("p");
              let texto = document.createTextNode(producto.Nombre);
              nombre.appendChild(texto);
              // nombre.addEventListener('dblclick', todoDblClicked.bind(this, producto));

              var checkbox = document.createElement("input");
              checkbox.className = "toggle";
              checkbox.type = "checkbox";
              checkbox.checked = false;
              checkbox.addEventListener(
                "change",
                checkboxChanged.bind(this, producto)
              );

              var categoria = document.createElement("p");
              categoria.id = "productCategory";
              var texto1 = document.createTextNode(
                "Categoría: " + producto.Categoria
              );
              categoria.appendChild(texto1);

              var precio = document.createElement("p");
              precio.id = "productPrice";
              var texto2 = document.createTextNode(
                "Precio: $" + producto.Precio + ".00"
              );
              precio.appendChild(texto2);

              var cantidad = document.createElement("p");
              cantidad.id = "productQuantity";
              var texto3 = document.createTextNode(
                "Cantidad: " + producto.Cantidad + " " + producto.Unidad
              );
              cantidad.appendChild(texto3);

              var descripcion = document.createElement("p");
              descripcion.id = "productDescription";
              var texto4 = document.createTextNode("Nota: " + producto.Nota);
              descripcion.appendChild(texto4);

              var deleteLink = document.createElement("button");
              deleteLink.id = "delete_" + producto._id;
              deleteLink.className = "btn btn-danger m-2";
              deleteLink.textContent = "Eliminar";
              deleteLink.addEventListener(
                "click",
                deleteButtonPressed.bind(this, producto)
              );

              var editLink = document.createElement("button");
              editLink.id = "edit_" + producto._id;
              editLink.className = "btn btn-warning";
              editLink.textContent = "Editar";
              editLink.addEventListener(
                "click",
                editButtonPressed.bind(this, producto)
              );

              var saveLink = document.createElement("button");
              saveLink.id = "save_" + producto._id;
              saveLink.className = "btn btn-success m-2";
              saveLink.textContent = "Guardar";
              saveLink.hidden = true;
              saveLink.addEventListener("click", saveButtonPressed.bind(this));

              var divDisplay = document.createElement("div");
              divDisplay.className = "view";
              divDisplay.appendChild(nombre);
              divDisplay.appendChild(deleteLink);
              divDisplay.appendChild(editLink);
              divDisplay.appendChild(saveLink);

              var inputEditNombre = document.createElement("input");
              inputEditNombre.id =
                "input_" + producto._id + "_" + producto.Nombre;
              inputEditNombre.className = "edit";
              inputEditNombre.value = producto.Nombre;
              inputEditNombre.addEventListener(
                "keypress",
                todoKeyPressedNombre.bind(this, producto)
              );
              inputEditNombre.addEventListener(
                "blur",
                todoBlurredNombre.bind(this, producto)
              );

              var inputEditCategoría = document.createElement("input");
              inputEditCategoría.id =
                "input_" + producto._id + "_" + producto.Categoria;
              inputEditCategoría.className = "edit";
              inputEditCategoría.value = producto.Categoria;
              inputEditCategoría.addEventListener(
                "keypress",
                todoKeyPressedCategoria.bind(this, producto)
              );
              inputEditCategoría.addEventListener(
                "blur",
                todoBlurredCategoria.bind(this, producto)
              );

              var inputEditPrecio = document.createElement("input");
              inputEditPrecio.id =
                "input_" + producto._id + "_" + producto.Precio;
              inputEditPrecio.className = "edit";
              inputEditPrecio.value = producto.Precio;
              inputEditPrecio.addEventListener(
                "keypress",
                todoKeyPressedPrecio.bind(this, producto)
              );
              inputEditPrecio.addEventListener(
                "blur",
                todoBlurredPrecio.bind(this, producto)
              );

              var inputEditCantidad = document.createElement("input");
              inputEditCantidad.id =
                "input_" + producto._id + "_" + producto.Cantidad;
              inputEditCantidad.className = "edit";
              inputEditCantidad.value = producto.Cantidad;
              inputEditCantidad.addEventListener(
                "keypress",
                todoKeyPressedCantidad.bind(this, producto)
              );
              inputEditCantidad.addEventListener(
                "blur",
                todoBlurredCantidad.bind(this, producto)
              );

              var inputEditUnidad = document.createElement("input");
              inputEditUnidad.id =
                "input_" + producto._id + "_" + producto.Unidad;
              inputEditUnidad.className = "edit";
              inputEditUnidad.value = producto.Unidad;
              inputEditUnidad.addEventListener(
                "keypress",
                todoKeyPressedUnidad.bind(this, producto)
              );
              inputEditUnidad.addEventListener(
                "blur",
                todoBlurredUnidad.bind(this, producto)
              );

              var inputEditNota = document.createElement("input");
              inputEditNota.id = "input_" + producto._id + "_" + producto.Nota;
              inputEditNota.className = "edit";
              inputEditNota.value = producto.Nota;
              inputEditNota.addEventListener(
                "keypress",
                todoKeyPressedNota.bind(this, producto)
              );
              inputEditNota.addEventListener(
                "blur",
                todoBlurredNota.bind(this, producto)
              );

              var editar = document.createElement("div");
              editar.id = "div_" + producto._id;
              editar.className = "m-4";
              editar.hidden = true;

              var lblNombre = document.createElement("label");
              lblNombre.id = "lblNombre_" + producto._id;
              lblNombre.className = "lblNombre mr-2";
              lblNombre.textContent = "Nombre: ";

              var lblCategoria = document.createElement("label");
              lblCategoria.id = "lblCategoria_" + producto._id;
              lblCategoria.className = "lblCategoria mr-2";
              lblCategoria.textContent = "Categoría: ";

              var lblPrecio = document.createElement("label");
              lblPrecio.id = "lblPrecio_" + producto._id;
              lblPrecio.className = "lblPrecio mr-2";
              lblPrecio.textContent = "Precio: ";

              var lblCantidad = document.createElement("label");
              lblCantidad.id = "lblCantidad_" + producto._id;
              lblCantidad.className = "lblCantidad mr-2";
              lblCantidad.textContent = "Cantidad: ";

              var lblUnidad = document.createElement("label");
              lblUnidad.id = "lblUnidad_" + producto._id;
              lblUnidad.className = "lblUnidad mr-2";
              lblUnidad.textContent = "Unidad: ";

              var lblNota = document.createElement("label");
              lblNota.id = "lblNota_" + producto._id;
              lblNota.className = "lblNota mr-2";
              lblNota.textContent = "Nota: ";

              elemento.appendChild(imagen);
              detalles.appendChild(nombre);
              detalles.appendChild(categoria);
              detalles.appendChild(precio);
              detalles.appendChild(cantidad);
              detalles.appendChild(descripcion);
              elemento.appendChild(checkbox);

              lista1.appendChild(divDisplay);
              editar.appendChild(lblNombre);
              editar.appendChild(inputEditNombre);
              editar.appendChild(lblCategoria);
              editar.appendChild(inputEditCategoría);
              editar.appendChild(lblPrecio);
              editar.appendChild(inputEditPrecio);
              editar.appendChild(lblCantidad);
              editar.appendChild(inputEditCantidad);
              editar.appendChild(lblUnidad);
              editar.appendChild(inputEditUnidad);
              editar.appendChild(lblNota);
              editar.appendChild(inputEditNota);
              lista1.appendChild(editar);
              lista1.appendChild(detalles);
              elemento.appendChild(lista1);
              lista.appendChild(elemento);
              itemsCarrito = itemsCarrito - 1;
              valorCarrito = valorCarrito - (parseInt(producto.Precio) * parseInt(producto.Cantidad));
              carrito.innerHTML =
                "Carrito (" + itemsCarrito + ") $" + valorCarrito  + ".00";
            }
            producto.Agregado = event.target.checked.toString();
            return db.put(producto);
          }
        });
      }
    );
  });
})();
