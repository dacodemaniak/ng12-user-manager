import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRequired]'
})
export class RequiredDirective implements OnInit {

  @Input() public car: string = '(*)';

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit(): void {
    console.log(`Hey, i'm the directive`);
    const nativeElement = this.element.nativeElement;
    const placeholder: string = nativeElement.getAttribute('placeholder');
    if (placeholder.length) {
      nativeElement.setAttribute('placeholder', placeholder + ' ' + this.car);
    }
  }
}
