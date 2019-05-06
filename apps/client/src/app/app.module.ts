import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HomeComponent } from './core/components/home/home.component';
import { CoreModule } from './core/core.module';
import { ControlsModule } from './controls/controls.module';

@NgModule({
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
        CoreModule,
        ControlsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
