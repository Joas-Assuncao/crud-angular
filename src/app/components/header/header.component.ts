import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() searchEmitter = new EventEmitter();
    inputSearchGame = new FormControl();
    valueForSearch!: string;

    isLogged: boolean = true;
    haveAutentication: boolean = false;

    constructor(private loginService: LoginService) {}

    ngOnInit(): void {
        this.inputSearchGame.valueChanges.pipe(
            map(value => value.trim()),
            // filter(value => value.length > 1),
            debounceTime(200),
            distinctUntilChanged(),
            map(value => this.valueForSearch = value),
        ).subscribe(value => this.valueForSearch = value);

        this.haveAutentication = this.loginService.isAutenticated();
    }

    seeResultsSearch() {
        this.searchEmitter.emit(this.valueForSearch);
    }
}
