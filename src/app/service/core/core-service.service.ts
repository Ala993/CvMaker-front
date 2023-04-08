import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
	providedIn: 'root'
})

export class CoreService {

	public rtlShowStatus = false;
	constructor( private http: HttpClient,
				 private modalService: NgbModal ) { }
}
