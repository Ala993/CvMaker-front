import { Component, OnInit } from '@angular/core';
import { Collaborator } from 'app/modules/collaborator.model';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent  implements OnInit{
  collaborators: Collaborator[] = [];
  displayedColumns: string[] = ['email', 'firstName', 'lastName','cv', 'action'];
  dataSource = [];
  constructor(
    private collaboratorService : AccountService
  ){}

  ngOnInit(): void {
    this.collaboratorService.findAllCollaborators().subscribe(res => {
      this.collaborators = res;      
      this.dataSource = this.collaborators
      
    })
  }
}
