import { Tarea } from "./tarea.js";

export class TareasManager {
  constructor(listaTareas) {
    this.arrayTareas = [];
    this.contador = 0;
    this.listaTareas = listaTareas;
  }

  agregarTarea(descripcion) {
    this.contador++;
    const nuevaTarea = new Tarea(this.contador, descripcion);
    this.arrayTareas.push(nuevaTarea);
    //Estas son para añadirlo al localStorage
    this.setContador();
    this.setArrayTareas();
  }

  listarTareas() {
    
    //Es para inicializar la descripcion de la tarea. Esta en blanco porque aun no la hemos añadido
    this.listaTareas.innerHTML = "";
    if(localStorage.getItem("arrayTareas") !== null) {
      this.arrayTareas = this.getArrayTareas();
    }
    this.arrayTareas.reverse().forEach((tarea) => {
      this.listaTareas.innerHTML += `
                <li id="${tarea.id}">
                    <input type="text" class="input-tarea" value="${tarea.descripcion}" placeholder="Tarea nueva...">
                    <button class="boton-eliminar">☠</button>
                </li>
            `;
    });
  }

  editarTarea(idTarea, descripcion) {
    const tarea = this.arrayTareas.find((t) => (t.id = idTarea));
    if(tarea){
        tarea.editar(descripcion);
        this.setArrayTareas();
    }
  }

  eliminarTarea(idTarea){
    this.arrayTareas = this.arrayTareas.filter((t) => (t.id != idTarea));
    this.setArrayTareas();
  }

  limpiarTodo(){
    this.arrayTareas = [];
    this.contador = 0;
    this.setArrayTareas();
    this.setContador();
  }

  getContador(){
    const cont = localStorage.getItem('contador');
    return cont;
  }

  setContador(){
    localStorage.setItem('contador',this.contador);
  }

  inicializarContador(){
    if(this.getContador() != null) {
        this.contador = this.getContador();
    }
  }

  getArrayTareas(){
    this.setContador();
    const array = JSON.parse(localStorage.getItem('arrayTareas'));
    //IMPORTANTE. CONVERTIR OBJETOS GENERICOS EN INSTANCIAS DE LA CLASE TAREA
    const tareasConvertidas = array.map((tarea) => new Tarea(tarea.id, tarea.descripcion));
    return tareasConvertidas;
  }

  setArrayTareas(){
    localStorage.setItem('arrayTareas', JSON.stringify(this.arrayTareas));
    this.listarTareas();
  }

}
