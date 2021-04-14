import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parseTime'
})
export class ParseTimePipe implements PipeTransform {

    transform(time: string = '00:00') {

        if (time) {
            const partTime = parseInt(time.toString().split('.')[0], 10);
            let minutes = Math.floor(partTime / 60).toString();
            if (minutes.length === 1) {
                minutes = `0${minutes}`;
            }

            let seconds = (partTime % 60).toString();
            if (seconds.length === 1) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        }

        return time;
    }

}
