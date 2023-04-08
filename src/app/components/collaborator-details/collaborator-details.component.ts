import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'app/modules/collaborator.model';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-collaborator-details',
  templateUrl: './collaborator-details.component.html',
  styleUrls: ['./collaborator-details.component.css']
})
export class CollaboratorDetailsComponent implements OnInit {
  collaborator=new Collaborator();
  collaboratorId: string;
  constructor(
    private collaboratorService : AccountService,
    private activatedRoute: ActivatedRoute,
    private router : Router
    ){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.collaboratorId = params['id'];
      if (this.collaboratorId) {
        this.collaboratorService.findCollaboratorById(this.collaboratorId).subscribe(res => {
          this.collaborator = res;
        })
      }
    });
  }
  backToList(){
    this.router.navigateByUrl("/collaborators")
  }
  saveCollaborator(){
    if(this.collaboratorId){
      this.collaboratorService.updateCollaborator(this.collaborator).subscribe(res => {
        this.backToList();
      })
    }else{
      this.collaboratorService.createCollaborator(this.collaborator).subscribe(res => {
        this.backToList();
      })
    }
  }
}
