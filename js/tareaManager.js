import { Tarea } from "./tarea";

export class TareasManager {

    constructor(listaTareas) {
        this.arrayTareas = [];
        this.contador = 0;
        this.listaTareas = listaTareas;
    }

    agregarTarea(descripcion){
        this.contador++;
        const nuevaTarea = new Tarea(this.contador, descripcion);
        this.arrayTareas.push();
        //Estas son para añadirlo al localStorage
        // this.setContador();
        // this.setArrayTareas();
    }

}