class Ecommerce {
    
    constructor() {
        this.planes=[];
        this.carrito=[];
        this.total=0;
        this.cantidad=0;
    }

    create() {
        $.get('planes.json' , function(response, state){
            this.planes= response;
            localStorage.ajax = JSON.stringify(response); 
        });
    }
    fill(){
        this.planes = JSON.parse(localStorage.ajax);
    }

    show() {
        let acumular = ``;
        this.planes.forEach(plan => {
            acumular += `
                <div>
                    <div>
                        <img src='${plan.src}'  alt='${plan.alt}'>
                    </div>
                    <div>
                    <h4>${plan.nombre}</h4>
                        <p> ${plan.desc}</p>
                        <div class="price">${plan.precio}</div>
                        <div class="btn"><button data-idadd="${plan.id}" class="btn-agregar-carrito">Sumar al Presupuesto</button></div>
                    </div>
                </div>
     
            `
        });

        document.getElementById("planes").innerHTML = acumular;
       
        this.createButtons()
    }

    createButtons() {
        const btnCollection = Array.from(document.getElementsByClassName('btn-agregar-carrito')) // Conversion Array
        btnCollection.forEach(boton => {
            boton.onclick = (event) => {
                const prd = event.target.getAttribute("data-idadd");
               
                this.addCarrito(prd)
            }
        })

    }
    addCarrito(id) {
            const plann = this.planes.find(plan=>{
                return plan.id == id;
            });
            this.carrito.push(plann); 
            swal("Exito", "Ha agregado el plan al presupuesto.", "success");
        
        
        let total = 0;
        this.carrito.forEach(plan=> {
            total += parseInt(plan.precio);
        });
        this.total=total;
        this.cantidad=this.carrito.length;
      
        localStorage.total = JSON.stringify(this.total);
        localStorage.cantidad = JSON.stringify(this.cantidad); 
        localStorage.producto = JSON.stringify(this.carrito);
    }
}

