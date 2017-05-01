import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Item} from '../common/models/item.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'item-detail',
  styles: [`input.name.ng-untouched, input.description.ng-untouched{ 
              border: none; 
              border-bottom: 1px solid rgba(0, 0, 0, .12);
             }`
  ],
  template: `
  <div class="fem-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text" *ngIf="selectedItem.id">Editing {{originalName}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!selectedItem.id">Create New Item</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <form #itemDetailForm="ngForm">
          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Name</label>
            <input [(ngModel)]="selectedItem.name"
              name="name"
              placeholder="Enter a name"
              class="mdl-textfield__input form-control name" type="text" 
              required minlength="4"
              #name="ngModel" >
          </div>
          <div *ngIf="name.errors && (name.dirty || name.touched)"
             class="alert alert-danger">
            <div [hidden]="!name.errors.required">
              Name is required
            </div>
            <div [hidden]="!name.errors.minlength">
              Name must be at least 4 characters long.
            </div>
          </div>

          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Description</label>
            <input [(ngModel)]="selectedItem.description"
              name="description"
              placeholder="Enter a description"
              class="mdl-textfield__input description" type="text" required>
          </div>
      </form>
    </div>
    <div class="mdl-card__actions">
        <button type="submit" (click)="cancelled.emit(selectedItem)"
          class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
        <button type="submit" (click)="saved.emit(selectedItem)"
          class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect"
          [disabled] = !itemDetailForm.form.valid>Save</button>
    </div>
  </div>
  `
})
export class ItemDetail {
  originalName: string;
  selectedItem: Item;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set item(value: Item){
    if (value) this.originalName = value.name;
    this.selectedItem = Object.assign({}, value);
  }
}
