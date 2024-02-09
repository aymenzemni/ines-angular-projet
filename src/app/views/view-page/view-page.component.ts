import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Produit } from '../../model/Produit';
import { MatDialog } from '@angular/material/dialog';
import { AddProduitComponent } from '../add-produit/add-produit.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';


@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.css'
})
export class ViewPageComponent implements OnInit {

  allProduitsList: Produit[] = [];
  pageSize = 10;
  startIndex: number = 0; // Premier index affiché sur la page
  endIndex: number = 0;   // Dernier index affiché sur la page
  paginatedProduitsList: Produit[];
  displayedColumns: string[] = ['index', 'nomproduit', 'prixproduit', 'qtproduit', 'detailsproduit'];


  originalProduitModel: Produit

  produitForm: FormGroup;

  messageAdd: boolean = false;
  messageUpdate: boolean = false;
  messageDelete: boolean = false;

  constructor(private produitService: ProduitService, public dialog: MatDialog, private fb: FormBuilder) {
    this.produitForm = this.fb.group({
      nomproduit: ['', Validators.required],
      prixproduit: ['', Validators.required],
      qtproduit: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('lancer !!!! ');
  }


  findAllProduit() {
    this.produitService.findAllProduit().subscribe(
      (data: Produit[]) => {
        this.allProduitsList = data;
        this.paginatedProduitsList = data;
        console.log('result from back : !!! ', this.allProduitsList);
      });
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = Math.min(startIndex + event.pageSize, this.allProduitsList.length);
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.paginatedProduitsList = this.allProduitsList.slice(startIndex, endIndex);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredData = this.allProduitsList.filter(produit =>
      produit.nomproduit.toLowerCase().includes(filterValue)
    );

    console.log('filtred data::', filteredData)
    this.paginatedProduitsList = filteredData;
  }

  addNewProduit() {
    console.log('data !!! ', this.produitForm.valid);
    if (this.produitForm.valid) {
      const produitModel = this.produitForm.value;
      this.produitService.addNewProduit(produitModel).subscribe(
        data => {
          if (data) {
            console.log('result add ::: ', data);
            this.messageAdd = true;
            this.findAllProduit();
            this.clearForm(this.produitForm);
            setTimeout(() => {
              this.messageAdd = false;
            }, 5000);
          }
        }
      )
    }

  }

  clearForm(form: FormGroup): void {
    form.reset();
    Object.keys(form.controls).forEach(key =>{
       form.controls[key].setErrors(null)
    });
  }

  updateProduitModal(produitModel: Produit) {
    this.originalProduitModel = { ...produitModel };
    const dialogRef = this.dialog.open(AddProduitComponent, {
      data: {
        produitModel: produitModel,
        title: 'Update produit',
        action: 'Update'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('La modal update est fermée avec le résultat', result);
        this.updateProduit(result);
      } else {
        Object.assign(produitModel, this.originalProduitModel);
      }
    });
  }

  updateProduit(produitModel: Produit) {
    this.produitService.updateProduit(produitModel).subscribe(
      data => {
        console.log('updated success');
        this.findAllProduit();
        this.messageUpdate = true;
        Object.assign(this.originalProduitModel, produitModel);
        setTimeout(() => {
          this.messageUpdate = false;
        }, 5000);
      }
    );
  }

  deleteProduitModal(produitModel: Produit) {
    const dialogRef = this.dialog.open(AddProduitComponent, {
      data: {
        produitModel: produitModel,
        title: 'Delete produit',
        action: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('La modal delete est fermée avec le résultat', result);
        this.deleteProduit(result);
      }
    });
  }

  deleteProduit(produitModel: Produit) {
    this.produitService.deleteProduit(produitModel).subscribe(
      data => {
        console.log('delete success');
        this.findAllProduit();
        this.messageDelete = true;
        setTimeout(() => {
          this.messageDelete = false;
        }, 5000);
      }
    );
  }

}
