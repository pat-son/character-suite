import { OverlayRef } from '@angular/cdk/overlay';

export class DialogRef {
    constructor(private overlayRef: OverlayRef) {}

    close() {
        this.overlayRef.dispose();
    }
}
