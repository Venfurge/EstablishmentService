import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragAndDropFileComponent } from "./drag-and-drop-file.component";

@NgModule({
  declarations: [
    DragAndDropFileComponent
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
    DragAndDropFileComponent
  ],
  exports: [
    DragAndDropFileComponent
  ]
})
export class DragAndDropFileModule { }
