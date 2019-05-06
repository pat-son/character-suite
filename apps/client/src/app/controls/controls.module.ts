import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FocusMonitor } from '@angular/cdk/a11y';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ButtonComponent,
    ],
    exports: [
        ButtonComponent,
    ],
    providers: [
        FocusMonitor,
    ],
})
export class ControlsModule {}
