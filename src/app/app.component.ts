import { ConsultaRefriService } from './consulta-refri.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private consultaRefriService: ConsultaRefriService){

  }

  title = 'web-gestao-refrigerantes';
  output: string = '';



  frameConfig1: Object = {
    lineWidth: 4,
    strokeStyle: 'red'
  };
  textConfig1: Object = {
    font: 'bold 18px serif',
    fillStyle: 'red'
  };



  onError(e: any): void {
    alert(e);
  }


  onRead(value: string) {
    if (value !== null && value !== undefined && value !== '') {
      this.output = value;
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: `Copo N.º ${this.output} identificado ?`,
        text: "Deseja continuar a venda?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Sim, continuar',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.consultaRefriService.cadastraRefrigerantes(value).subscribe((result) => {
            console.log(result);
          })
          swalWithBootstrapButtons.fire(
            'Produto adicionado com sucesso!',
            '',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Produto cancelado',
            '',
            'error'
          )
        }
      })
    }
  }
}
