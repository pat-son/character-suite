import { Injectable, TemplateRef, InjectionToken, Injector, ComponentRef } from '@angular/core';
import { Overlay, ComponentType, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal, PortalInjector } from '@angular/cdk/portal';
import { DialogRef } from './dialog-ref';

export interface DialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    data?: any;
}

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

const DEFAULT_CONFIG: DialogConfig = {
    hasBackdrop: true,
    backdropClass: 'cs-dialog-backdrop',
    panelClass: 'cs-dialog-panel',
}

@Injectable()
export class DialogService {
    constructor(private overlay: Overlay, private injector: Injector) {}

    /**
     * The rendered component can access the dialogRef and config.data like so:
     ```
     constructor(
       private dialogRef: DialogRef,
       @Inject(DIALOG_DATA) private data: any,
     ) {}
     ```
     */
    open<T = any>(componentOrTemplate: ComponentType<T>, config: DialogConfig = {}) {
        console.log('Hello, world!');
        const mergedConfig = {
            ...DEFAULT_CONFIG,
            ...config,
        };

        const overlayRef = this.createOverlay(mergedConfig);

        const dialogRef = new DialogRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(componentOrTemplate, config, overlayRef, dialogRef);

        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private attachDialogContainer(componentOrTemplate: ComponentType<any>, config: DialogConfig, overlayRef: OverlayRef, dialogRef: DialogRef) {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(componentOrTemplate, null, injector);
        const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createOverlay(config: DialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);

        return this.overlay.create(overlayConfig);
    }

    private getOverlayConfig(config: DialogConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        return new OverlayConfig({
            ...config,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });
    }

    private createInjector(config: DialogConfig, dialogRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(DialogRef, dialogRef);
        injectionTokens.set(DIALOG_DATA, config.data);

        return new PortalInjector(this.injector, injectionTokens);
    }
}
