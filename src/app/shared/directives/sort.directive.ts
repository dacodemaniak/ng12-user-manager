import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Sort } from 'src/app/core/helpers/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort!: any[];
  @Output() currentSortCol: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('click') sortTable() {
    const sortHelper = new Sort();

    const nativeElement = this.element.nativeElement;




    // Get attributes from native element
    const order = nativeElement.getAttribute('data-order');
    const dataType = nativeElement.getAttribute('data-type');
    const property = nativeElement.getAttribute('data-name');

    this.currentSortCol.emit(property);

    // Do sort...
   this.appSort.sort(sortHelper.startSort(property, order,dataType));

   // Move sort order...
   if (order === 'desc') {
     nativeElement.setAttribute('data-order', 'asc');
   } else {
    nativeElement.setAttribute('data-order', 'desc');
   }
  }
}
