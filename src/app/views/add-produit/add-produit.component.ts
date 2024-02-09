import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Produit} from '../../model/Produit';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit {
  produitModel: Produit = new Produit();
  title: any;
  action: any;
  disabled: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(){  
  this.disabled = false;
  this.produitModel = this.data.produitModel;
  this.title = this.data.title;
  this.action = this.data.action;
  if(this.action == 'Delete'){
    this.disabled = true;
  }
  console.log('data !! ', this.disabled);
  }

  cancelAdd(): void {
    this.produitModel = this.data;
    this.dialogRef.close();
  }

  updateDeleteProduit(result: any): void {
    this.dialogRef.close(result);
  }
  
}
