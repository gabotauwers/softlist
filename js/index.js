(function () {
  "use strict";
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
          valorTotal = valorTotal + parseInt(row.doc.Precio);
          itemsTotal = itemsTotal + 1;
          total.innerHTML = "Total (" + itemsTotal + ") $" + valorTotal + ".00";
          return lista;
        });
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
          lista.id = "productList";
          lista.className = "";

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

          elemento.appendChild(imagen);
          detalles.appendChild(nombre);
          detalles.appendChild(categoria);
          detalles.appendChild(precio);
          detalles.appendChild(cantidad);
          detalles.appendChild(descripcion);
          elemento.appendChild(checkbox);

          lista1.appendChild(detalles);
          elemento.appendChild(lista1);
          lista.appendChild(elemento);

          function checkboxChanged(row, event) {
            if (event.target.checked) {
              lista.removeChild(event.target.parentNode);
              // crearElementos(row, listaCarrito, true);
              let lista1 = document.createElement("ul");
              lista.id = "productList";
              lista.className = "";

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
              valorCarrito = valorCarrito + parseInt(producto.Precio);
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
                for(let i = 0; i < categoriaTitulo.length; i++){
                if(categoriaTitulo[i].textContent == producto.Categoria && categoriaTitulo[i].nextSibling === "h3" || categoriaTitulo[i].textContent == producto.Categoria && categoriaTitulo[i].nextSibling !== "li"){
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
              lista.id = "productList";
              lista.className = "";

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

              elemento.appendChild(imagen);
              detalles.appendChild(nombre);
              detalles.appendChild(categoria);
              detalles.appendChild(precio);
              detalles.appendChild(cantidad);
              detalles.appendChild(descripcion);
              elemento.appendChild(checkbox);

              lista1.appendChild(detalles);
              elemento.appendChild(lista1);
              lista.appendChild(elemento);
              itemsCarrito = itemsCarrito - 1;
              valorCarrito = valorCarrito - parseInt(producto.Precio);
              carrito.innerHTML =
                "Carrito (" + itemsCarrito + ") $" + valorCarrito + ".00";
            }
            producto.Agregado = event.target.checked.toString();
            return db.put(producto);
          }
        });
      }
    );
  });
})();
