import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
    ],
    declarations: [],
    exports: [],
    providers: [
        DialogService
    ],
})
export class DialogModule {}
