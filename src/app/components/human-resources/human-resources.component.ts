import { Component } from '@angular/core';
import { HumanRessource } from 'app/modules/human-ressource.model';
import { HumanRessourceService } from 'app/services/human-ressource.service';

@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.css']
})
export class HumanResourcesComponent {
  humanRessources: HumanRessource[] = [];
  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'action'];
  dataSource = [];
  constructor(
    private humanRessourceService : HumanRessourceService
  ){}


  ngOnInit(): void {
    this.humanRessourceService.findAllHrs().subscribe(res => {
      this.humanRessources = res;      
      this.dataSource = this.humanRessources
      
    })
  }
}
