// src/app/core/models/clase.ts

export type EstadoClase = 'Programada' | 'En curso' | 'Finalizada' | 'Cancelada';

export interface Clase {
  id: string;               // identificador único (GUID/string)
  codigo: string;           // p.ej. "MAT-101"
  nombre: string;           // p.ej. "Cálculo I"
  docente: string;          // p.ej. "Dra. Ana Pérez"
  fecha: string;            // ISO date (YYYY-MM-DD) para facilitar filtros posteriores
  horaInicio: string;       // "HH:mm"
  horaFin: string;          // "HH:mm"
  aula: string;             // p.ej. "A-203"
  descripcion: string;      // detalle corto
  cupo: number;             // capacidad total
  estado: EstadoClase;      // estado visible con Tag
}
