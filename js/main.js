const Productos = new Ecommerce();

Productos.create();
Productos.fill(); 
Productos.show();

if(localStorage.producto){
   Productos.carrito = JSON.parse(localStorage.producto);
}