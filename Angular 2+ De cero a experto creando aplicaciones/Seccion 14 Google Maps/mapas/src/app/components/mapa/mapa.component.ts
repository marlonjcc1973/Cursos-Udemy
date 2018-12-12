import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/clases/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador(evento) {
    console.log(evento);
    const coords: { lat: number, lng: number } = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push(nuevoMarcador);

    this.guardarLocalStorage();

    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarLocalStorage();

      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
    });
  }

  borrarMarcador(index: number) {
    this.marcadores.splice(index, 1);

    this.guardarLocalStorage();

    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  guardarLocalStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
}