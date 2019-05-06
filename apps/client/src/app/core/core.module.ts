import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../controls/controls.module';

@NgModule({
    imports: [
        RouterModule,
    ],
    declarations: [
        HeaderComponent,
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [],
})
export class CoreModule {}
