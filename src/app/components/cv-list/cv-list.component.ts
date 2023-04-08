import { Component, OnInit } from '@angular/core';
import { Cv } from 'app/modules/cv.model';
import { CvService } from 'app/services/cv.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit{
  displayedColumns: string[] = ['email', 'address', 'phoneNumber', 'action'];
  dataSource = [];
  cvs: Cv[] = [];
  constructor(
    private cvService : CvService
    ) {}
  
  ngOnInit(): void {
    this.findAllCvs()
  }

  findAllCvs(){
    this.cvService.findAllCvs().subscribe(res => {
      this.cvs = res;
      this.dataSource = this.cvs
    })
  }
  deleteCv(element){
    this.cvService.deleteCv(element.id).subscribe(res => {
      this.findAllCvs()
    })
  }
}
