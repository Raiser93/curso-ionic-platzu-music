import { NgModule, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseTimePipe } from './parse-time.pipe';
import { NoImagePipe } from './no-image.pipe';



@NgModule({
    declarations: [
        ParseTimePipe,
        NoImagePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ParseTimePipe,
        NoImagePipe
    ]
})
export class PipesModule {}
