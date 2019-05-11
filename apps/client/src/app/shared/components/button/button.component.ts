import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
    selector: 'button[cs-button], button[cs-raised-button], button[cs-outline-button]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnDestroy {
    constructor(private elementRef: ElementRef, private focusMonitor: FocusMonitor) {
        this.focusMonitor.monitor(this.elementRef);
    }

    ngOnDestroy(): void {
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
}
