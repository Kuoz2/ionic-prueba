import {Injectable} from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class valorReloj {
    hora!: number;
    minutos!: string;
    ampm!: string;
    diadesemana!: string;
    diaymes!: string;
    segundo!: string;
}
export class HoraActualService {
    constructor() {
        this.clock = timer(0, 1000).pipe(map(() => new Date()), shareReplay(1));
    }
    clock: Observable <Date>;
   private infofecha$ = new Subject<valorReloj>();
    vr!: valorReloj;
    ampm!: string;
    hours!: number;
    minute!: string;
    weekday!: string;
    months!: string;

    getInfoReloj(): Observable<valorReloj> {
        this.clock.subscribe(t => {
            this.hours = t.getHours() ;
            this.hours = this.hours ? this.hours : 12;
            this.vr = {
                hora: this.hours,
                minutos: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
                ampm: t.getHours() > 11 ? 'PM' : 'AM',
                // tslint:disable-next-line:max-line-length
                diaymes: t.toLocaleString('ja-JP', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace('.', '').replace('-', ' '),
                diadesemana: t.toLocaleString('es-CH', { weekday: 'long' }).replace('.', ''),
                segundo: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString(),
            };

            this.infofecha$.next(this.vr);
        });
        return this.infofecha$.asObservable();

    }


}
