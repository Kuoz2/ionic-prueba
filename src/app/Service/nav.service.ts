import {HostListener, Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  rol?: string;
  }
@Injectable({
  providedIn: 'root'
})
export class NavService {
  constructor( ) {
  this.onResize();
  if (this.screenWidth < 991) {
  this.collapseSidebar = true;
  }
  }

  public screenWidth: any;
  public collapseSidebar = false;
  MENUITEMS: Menu[] = [


  {
  title: 'Productos' , icon: 'box', rol: '', type: 'sub', active: false,  children: [

  { path: '/products/physical/lista-editar'  , rol: '', title: 'Inventario', type: 'link' },
  { path: '/products/physical/proveedor', rol: '', title: 'Proveedor', type: 'link'},
  { path: '/products/physical/promociones', rol: '', title: 'Promociones', type: 'link'},
  { path: '/products/physical/impuestos', rol: '', title: 'Impuestos', type: 'link'},
  {path: '/products/physical/marca', rol: '', title: 'Marcas', type: 'link'},
  {path: '/products/physical/category', rol: '', title: 'Categoría', type: 'link'},
  {path: '/products/physical/vencimiento', rol: '', title: 'Vencidos', type: 'link'	},
  {path: '/products/physical/bitacora', rol: '', title: 'Bitacora', type: 'link'	}


  ]
  },


      {
        title: 'Pagos', icon: 'clipboard', rol: '', type: 'sub', active: false, children: [
          {path: '/pages/lista-pago', rol: '', title: 'Lista Pagos', type: 'link'},
          {path: '/pages/medio-pago', rol: '', title: 'Medio de pago', type: 'link', },
          {path: '/pages/app-pago', rol: '', title: 'Venta', type: 'link'},
          {path: '/pages/boleta', rol: 'administrador', title: 'Boleta', type: 'link'},
          {path: '/pages/qu/pages/comparar_ventasick_sale', rol: 'administrador', title: 'Venta rapida', type: 'link'},
          {path: '', rol: 'administrador', title: 'Comparar venta', type: 'link'}
        ]
      },

      {
        title: 'Usuarios', rol: 'administrador', icon: 'user-plus', type: 'sub', active: false, children: [
          {
            path: '/users/create-user', rol: 'administrador', title: 'Crear usuario', type: 'link'
          }
        ]
      },

      {
        title: 'Mermas', type: 'sub', rol: '', icon: 'book', active: false, children: [
          {
            path: '/merma/ingresar', rol: '', title: 'Situación', type: 'link'
          },
          {
            path: '/merma/solucion-merma', rol: '', title: 'Solucion Mrm', type: 'link'
          }
        ]
      },
      {
        title: 'botonesnavegacion', type: 'sub', rol:'', icon:'eye', active:false, children:[
          {
            path:'/navegacionboton/navboton', rol:'', title: 'navegable', type:'link'
          }
        ]
      }

    ];
    // Array
    items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

    // Windows width
    @HostListener('window:resize', ['$event'])
    onResize() {
      this.screenWidth = window.innerWidth;
    }


  }
