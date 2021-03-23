import { Component, EventEmitter, Output, Input } from '@angular/core';

/**
 * How to use:
 * <drag-and-drop-file (fileDropped)="filesUploaded($event)">
 *    <h1>Drop Files</h1>
 * </drag-and-drop-file>
 * */
@Component({
  selector: 'drag-and-drop-file',
  templateUrl: './drag-and-drop-file.component.html',
  styleUrls: ['./drag-and-drop-file.component.scss']
})
export class DragAndDropFileComponent {

  @Output() fileDropped = new EventEmitter<any>();
  @Output() fileOver = new EventEmitter<boolean>();

  @Input() accept: string = "";
  @Input() multiple: string = "";

  constructor() {

  }

  dropped(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver.emit(false);

    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  filesChanged(files) {
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  dragover(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver.emit(true);
  }

  dragleave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver.emit(false);
  }
}
