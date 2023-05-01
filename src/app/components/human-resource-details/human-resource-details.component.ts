import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HumanRessource } from 'app/modules/human-ressource.model';
import { HumanRessourceService } from 'app/services/human-ressource.service';

@Component({
  selector: 'app-human-resource-details',
  templateUrl: './human-resource-details.component.html',
  styleUrls: ['./human-resource-details.component.css']
})
export class HumanResourceDetailsComponent implements OnInit {
  humanResource= new HumanRessource();
  humanResourceId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private humanRessourceService: HumanRessourceService,
    private router : Router
  ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.humanResourceId = params['id'];
      if (this.humanResourceId) {
        this.humanRessourceService.findHrById(this.humanResourceId).subscribe(res => {
          this.humanResource = res;
        })
      }
    });
  }




  backToList(){
    this.router.navigateByUrl("/human-resources")
  }

  saveHr(){
    if(this.humanResourceId){
      this.humanRessourceService.updateHr(this.humanResource).subscribe(res => {
        this.backToList();
      })
    }else{
      this.humanRessourceService.createHr(this.humanResource).subscribe(res => {
        this.backToList();
      })
    }
  }
}
