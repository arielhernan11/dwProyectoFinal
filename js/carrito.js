const Productos = new Ecommerce();

if(localStorage.producto){
   Productos.carrito = JSON.parse(localStorage.producto);
   Productos.total= JSON.parse(localStorage.total);
   Productos.cantidad=JSON.parse(localStorage.cantidad);
}

function showCarrito(){
   let acumular = ``;
   if( Productos.carrito.length>0){
       Productos.carrito=Array.from( Productos.carrito)
      Productos.carrito.forEach(item => {
          acumular += `<div class="agregados" >
               <h5>${item.nombre}</h5>
               <h5>${item.precio}</h5>
               <button data-idremove="${item.id}" class="btn-sacar-carrito">Quitar del presupuesto</button>
           </div>`
      });
      $('#clear').html('<button id="btnJQuery">Vaciar Presupuesto</button>')
      $("#btnJQuery").click(emptyAlert)
      $('#comprar').html('<button id="btnJQuery2">Aceptar y Contactar</button>')
      $("#btnJQuery2").click(comprar)
      
      document.getElementById("cantidad").innerHTML ="Numero de planes: "+  Productos.cantidad;
      document.getElementById("total").innerHTML =  "$"+ Productos.total
   }
   else{
      console.log("vacio")
           document.getElementById("cantidad").innerHTML ="Seleccione uno o mas planes para continuar."
           document.getElementById("total").innerHTML =  ""
           $('#clear').html('')
           $('#comprar').html('')
   } ;
   document.getElementById("itemCarrito").innerHTML = acumular;
   this.showRmvButtons()
}
showCarrito()

function removeFromCarrito(id){
   const productoAQuitar = Productos.carrito.findIndex(item=>{
      return item.id == id;
  }); 
    Productos.carrito.splice(productoAQuitar,1);
    localStorage.producto=JSON.stringify(Productos.carrito)
    let total=0
    Productos.carrito.forEach(item=> {
        total += item.precio
    });
    Productos.total=total
    Productos.cantidad=Productos.carrito.length
    localStorage.total = JSON.stringify(Productos.total);
    localStorage.cantidad = JSON.stringify(Productos.cantidad); 
    showCarrito()
}
function showRmvButtons() {
   const arrayDeBotones = Array.from(document.getElementsByClassName('btn-sacar-carrito')) // Conversion Array
   arrayDeBotones.forEach(boton => {
       boton.onclick = (event) => {
           const prd = event.target.getAttribute("data-idremove");
           removeFromCarrito(prd)
       }
   })
}

 function comprar(){
    swal({
        title: "Operación exitosa",
        text: "Un representante se comunicará en breve.",
        icon: "success",
      });
    localStorage.total =0;
    localStorage.cantidad=0;
    localStorage.producto=[];
    Productos.total=0;
    Productos.cantidad=0;
    Productos.carrito=0;
    showCarrito();
  }

  function emptyAlert(){
    swal({
        title: "Ha seleccionado Vaciar Presupuesto",
        text: "¿Desea continuar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Se ha vaciado el presupuesto.", {
            icon: "success",
          });
          emptyCarrito();
        } else {
          swal("No se ha vaciado el presupuesto.");
        }
      });
 }

  function emptyCarrito(){
    localStorage.total =0;
    localStorage.cantidad=0;
    localStorage.producto=[];
    Productos.total=0;
    Productos.cantidad=0;
    Productos.carrito=0;
    showCarrito();
   
  }

