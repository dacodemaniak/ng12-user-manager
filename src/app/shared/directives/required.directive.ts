import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRequired]'
})
export class RequiredDirective implements OnInit {

  @Input() public car: string = '(*)';

  private nativeElement: any;

  constructor(
    private element: ElementRef
  ) {
    this.nativeElement = this.element.nativeElement;
  }

  ngOnInit(): void {

    const placeholder: string = this.nativeElement.getAttribute('data-required');
    if (placeholder.length) {
      this.nativeElement.setAttribute('data-placeholder', placeholder + ' ' + this.car);
    }
  }
}
