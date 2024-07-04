import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedapp'
})
export class BusquedappPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    console.log("tipo que entra",typeof(args))
    const producto_app = [];
    if(args == ''){ return []}

    if (typeof (args) != 'undefined') {
      console.log('entrante', args)

      for (const p in value) {
        if (value[p].pcodigo.toString().indexOf( args ) > -1 && value[p].pcodigo.toString() === args) {
          producto_app.push( value[p] )
        }
      }
      return producto_app
    }
    return []
  }  }


