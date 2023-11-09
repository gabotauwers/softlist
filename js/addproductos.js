// //*****************Mandar al Index**************/
document.addEventListener("DOMContentLoaded", function () {
  var db = new Pouch("lista");
  setTimeout(function () {
  let productList = document.getElementById("productList");
  console.log(productList);
  let productItems = productList.getElementsByTagName("li");
  console.log(productItems.length);
  Array.from(productItems).forEach(function (productItem) {
    productItem.addEventListener("click", function () {
      let productImage = productItem.querySelector(".product-image").src;
      // alert(productImage);
      let productName = productItem.children[1].textContent;
      console.log(productName);
      let productCategoria = productItem.children[2].textContent;
      console.log(productCategoria);
      let productPrice = productItem.children[3].textContent;
      console.log(productPrice);
      let productCantidad = productItem.children[4].textContent;
      console.log(productCantidad);
      let productUnidad = productItem.children[5].textContent;
      console.log(productUnidad);
      let productNota = productItem.children[6].textContent;
      console.log(productNota);
      addTodo(productName, productImage, productPrice, productCategoria, productCantidad, productUnidad, productNota);
      window.location.href = "index.html";
      // addNewProductToList();
    });
  });
  // console.log(productItems.length);
  // for(var i = 0; i < productItems.length; i++){
  //   productItems[i].addEventListener("click", function () {
  //     console.log(productItems[i]);
  //     let productImage = productItems[i].querySelector(".product-image").src;
  //     console.log(productItems[i].children[1].textContent)
  //     let productName = productItems[i].children[1].textContent;
  //     addTodo(productName, productImage);
  //     window.location.href = "index.html";
  //     addNewProductToList();
  //   });
  // }
}, 2000);

  // var arreglo = Array.from(productItems);
  // console.log(arreglo);
  // arreglo.forEach(function (element) {
  //   console.log(element);
  //   element.addEventListener("click", function () {
  //     console.log(element);
  //     let productImage = element.querySelector(".product-image").src;
  //     console.log(element.children[1].textContent)
  //     let productName = element.children[1].textContent;
  //     addTodo(productName, productImage);
  //     window.location.href = "index.html";
  //     // addNewProductToList();
  //   });
  // });

  
  function addTodo(Producto, Imagen, Precio, Categoria, Cantidad, Unidad, Nota) {
    var todo = {
      Nombre: Producto,
      Imagen: Imagen,
      Precio: Precio,
      Categoria: Categoria,
      Cantidad: Cantidad,
      Unidad: Unidad,
      Nota: Nota
      // Agregado: Agregado
    };
    db.post(todo, function (err, result) {
      if (!err) {
        console.log("Successfully posted a todo!");
      }
    });
  }
});
