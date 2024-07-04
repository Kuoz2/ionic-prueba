import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  // tslint:disable-next-line:variable-name
  public right_sidebar = false;
  public open = false;
  public openNav = false;

  public proIn = 0;
  public option1= "hola"

  // tslint:disable-next-line:max-line-length
  constructor() {


               }



  collapseSidebar() {
    this.open = !this.open;
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar;
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  cerrarsession() {

  }




  inventario_gestionable() {

  }

   ngOnInit(): void {




  }

  emitiralerta() {
  }





  checkBoxk2(){
    const check= document.querySelector('#input[name="dato"]:checked');
    console.log("chquiado", check)
  }

}
