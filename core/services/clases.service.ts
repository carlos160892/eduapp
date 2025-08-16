// src/app/core/services/clases.service.ts
import { Injectable } from '@angular/core';
import { Clase, EstadoClase } from '../models/clase';

@Injectable({ providedIn: 'root' })
export class ClasesService {
  // Método pensado para luego apuntar a la API real (Edusign).
  list(): Clase[] {
    // Generamos 50 registros con fechas consecutivas desde hoy,
    // horas escalonadas y datos verosímiles.
    const hoy = new Date();
    const docentes = [
      'Dra. Ana Pérez', 'Ing. Carlos Mejía', 'MSc. Sofía López',
      'Dr. Luis Romero', 'Lic. Marta Aguilar', 'PhD. Diego Castillo'
    ];
    const nombres = [
      'Cálculo I', 'Programación Web', 'Bases de Datos',
      'Física II', 'Química General', 'Algoritmos', 'Estructuras de Datos',
      'Ingeniería de Software', 'Redes', 'Arquitectura de Computadores'
    ];
    const estados: EstadoClase[] = ['Programada', 'En curso', 'Finalizada', 'Cancelada'];

    const data: Clase[] = [];
    for (let i = 0; i < 50; i++) {
      const d = new Date(hoy);
      d.setDate(hoy.getDate() + Math.floor(i / 2)); // cada 2 ítems, avanza 1 día
      const fechaISO = d.toISOString().slice(0, 10);

      // Hora base 08:00, cada registro incrementa 2 horas en franjas
      const inicioH = 8 + (i % 5) * 2; // 8,10,12,14,16
      const finH = inicioH + 1;        // duración 1 hora

      const codigo = this.leftPad(Math.floor(100 + i), 3);
      const nombre = nombres[i % nombres.length];
      const docente = docentes[i % docentes.length];
      const estado = estados[i % estados.length];

      data.push({
        id: cryptoRandomId(),
        codigo: `${nombre.substring(0,3).toUpperCase()}-${codigo}`,
        nombre,
        docente,
        fecha: fechaISO,
        horaInicio: `${this.leftPad(inicioH, 2)}:00`,
        horaFin: `${this.leftPad(finH, 2)}:00`,
        aula: `A-${100 + (i % 15)}`,
        descripcion: `Sesión ${i + 1} de ${nombre}. Temas: unidad ${(i % 4) + 1}.`,
        cupo: 25 + (i % 10),
        estado
      });
    }
    return data;
  }

  // Utilidad sencilla para left-pad numérico
  private leftPad(n: number, size: number): string {
    const s = String(n);
    return s.length >= size ? s : '0'.repeat(size - s.length) + s;
  }
}

// Generador simple de ids únicos (no crípticamente seguros, suficiente para mock)
function cryptoRandomId(): string {
  // Si el navegador soporta crypto.getRandomValues
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const arr = new Uint32Array(4);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(n => n.toString(16).padStart(8, '0')).join('');
  }
  // Fallback
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
