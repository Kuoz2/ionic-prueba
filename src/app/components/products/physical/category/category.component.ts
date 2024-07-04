import { Categorias } from './../../../Modulos/Categorias';
import { Component, OnDestroy, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Categories} from '../../../Modulos/Categories';
import { Subject, Observable } from 'rxjs';
import { SqliteService } from 'src/app/Service/sqlite.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public closeResult!: string;
  categoriasForm: FormGroup;
  room!:string
  otracategoria:any

  categorias!: Observable<Categories>
  categoriaID: Categories = new Categories();
  p: any;
  catsqlite:any[] = []
  private unsubscribe$ = new Subject<void>();

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
      private sqlite3:SqliteService
      ) {
         this.categoriasForm = this.formBuilder.group({
     cnombre: ['', [Validators.required]]
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  }

  ngOnInit() {
   this.sqlite3.coneccion.executeSql("SELECT rowid as id, cnombre FROM categorias",[])
   .then((result) => {
    for(let i=0; i<result.rows.length;i++){
      this.catsqlite.push(result.rows.item(i))
    }
  })
    //this.categoriasForm = this.formBuilder.group({
     // cnombre: ['']
    //});

  }



  async guardarcategoria() {
    if(this.categoriasForm.valid){
      this.sqlite3.coneccion.executeSql('INSERT INTO categorias(cnombre) VALUES("'+this.categoriasForm.value.cnombre+'")')
      .then(async () => {
        this.catsqlite.splice(0, this.catsqlite.length)
        await this.sqlite3.coneccion.executeSql("SELECT rowid as id, cnombre FROM  categorias ",[])
        .then((result)=>{
          for(let i = 0; i < result.rows.length; i++){
            this.catsqlite.push( result.rows.item(i))
          }
        }).catch(err=> {
          alert("Ocurrio un error" + JSON.stringify(err))

        })
      })

     }  }

  open2(content2: any, catego: Categories): void {
    console.log('entran categorias',catego)
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    localStorage.setItem('idc', catego.id.toString());
    this.categoriaID = catego
  }

 async editarcategoria(categoria: Categories) {
   //this.servi.actualizarcategoria(categoria)
   this.sqlite3.coneccion.transaction(()=>{
    this.sqlite3.coneccion.executeSql('UPDATE categorias SET cnombre=?   WHERE rowid as id = ?',[this.categoriaID.cnombre, this.categoriaID.id])
    .then(async (result)=>{
     if(result){
         this.catsqlite.splice(0, this.catsqlite.length)
         await this.sqlite3.coneccion.executeSql('SELECT rowid as id, cnombre FROM categorias',[])
         .then((result) => {
           for(let i = 0; i < result.rows.length; i++){
               this.catsqlite.push(result.rows.item(i))
           }
         })
     }
    })
   })
  }

  editar(a:Categories) {
    const id = localStorage.getItem('idc');
  //  this.servi.mostrarporID(+id).subscribe(data => {this.categoriaID = data; });
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async escuchandosql(){
    console.log('categoria', this.categoriasForm.value.cnombre)

  }
  grdmarca(){
  }
  crearproduct(){
  }
  crearventa(){
  }
}
