import { Component, OnInit } from '@angular/core';
import { CvFilter } from 'app/modules/cv-filter.model';
import { Cv } from 'app/modules/cv.model';
import { Skill } from 'app/modules/skill.model';
import { CvService } from 'app/services/cv.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit{
  displayedColumns: string[] = ['email', 'address', 'phoneNumber', 'action'];
  levels: string[] = ["Trés bon", "Bon", "Intermédiaire", "Débutant"];
  dataSource = [];
  cvs: Cv[] = [];
  cvFilter = new CvFilter();
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

  addFilterSkill(){
    this.cvFilter.skills.push(new Skill());
  }

  search(){
    this.cvService.findCvsByFilter(this.cvFilter).subscribe(res => {
      this.cvs =res;
      this.dataSource = this.cvs
      console.log(this.dataSource);
      
    })
  }
}
