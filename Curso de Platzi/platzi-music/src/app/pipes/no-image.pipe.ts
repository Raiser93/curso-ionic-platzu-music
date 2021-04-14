import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interface/interface';

@Pipe({
    name: 'noImage'
})
// 
export class NoImagePipe implements PipeTransform {

    transform(value: Item['images']): unknown {
        if (!value) {
            return 'https://via.placeholder.com/150';
        } else {
            return value[0].url;
        }
    }

}
