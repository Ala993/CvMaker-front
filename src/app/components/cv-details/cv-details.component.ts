import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cv } from 'app/modules/cv.model';
import { Experience } from 'app/modules/experience.model';
import { CvService } from 'app/services/cv.service';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ExperienceService } from 'app/services/experience.service';
import { Study } from 'app/modules/study.model';
import { StudyService } from 'app/services/study.service';
import { Skill } from 'app/modules/skill.model';
import { SkillService } from 'app/services/skill.service';
import { Collaborator } from 'app/modules/collaborator.model';
import { AccountService } from 'app/services/account.service';
import { FileEntryService } from 'app/services/file-entry.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-cv-details',
  templateUrl: './cv-details.component.html',
  styleUrls: ['./cv-details.component.css']
})
export class CvDetailsComponent implements OnInit {
  @ViewChild('createExperienceModal') createExperienceModal: TemplateRef<any>;
  @ViewChild('createStudyModal') createStudyModal: TemplateRef<any>;
  @ViewChild('createSkillModal') createSkillModal: TemplateRef<any>;
  @ViewChild('deleteExperienceModal') deleteExperienceModal: TemplateRef<any>;
  @ViewChild('deleteStudyModal') deleteStudyModal: TemplateRef<any>;
  levels: string[] = ["Trés bon", "Bon", "Intermédiaire", "Débutant"];
  collaborator = new Collaborator();
  isCollaborator = false;
  isHr = true;
  cv = new Cv();
  addExperience = false;
  experience = new Experience();
  study = new Study();
  skill = new Skill();
  cvId: string;
  experienceToDeleteId: string;
  studyToDeleteId: string;
  image: any;
  url: any;
  file: File;
  loadedImage
  constructor(
    private cvService: CvService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private activatedRoute: ActivatedRoute,
    private experienceService: ExperienceService,
    private studyService: StudyService,
    private skillService: SkillService,
    private accountService: AccountService,
    private fileEntryService: FileEntryService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.cvId = params['id'];
      if (this.cvId && !this.router.url.includes("hr-collaborator-cv")) {
        this.cvService.findCvById(this.cvId).subscribe(res => {
          this.cv = res;
          if (this.cv.image) {
            this.setLoadedImage()
           
          }
        })
      }
    });
    if (this.router.url.includes("mon-cv")) {
      this.isCollaborator = true;
      this.accountService.findCollaboratorByCurrentUser().subscribe(res => {
        this.collaborator = res;
        if (this.collaborator.cv) {
          
          this.cvId = this.collaborator.cv.id;
          this.cv = this.collaborator.cv;
          if (this.cv.image) {
            this.setLoadedImage()
           
          }
        }
      })
    }
    else if (this.router.url.includes("hr-collaborator-cv")) {
      this.isHr = true;
      this.accountService.findCollaboratorById(this.cvId).subscribe(res => {
        this.collaborator = res;
        if (this.collaborator.cv) {
          this.cvId = this.collaborator.cv.id;
          this.cv = this.collaborator.cv;
          if (this.cv.image) {
            this.setLoadedImage()
           
          }
        }else this.cvId = null
      })
    }
  }

  createExperience() {
    this.activeModal = this.modal.open(this.createExperienceModal, { size: 'lg' });
  }
  saveExperience() {
    if (this.experience.id) {
      this.experienceService.updateExperience(this.experience).subscribe(res => {
        let index = this.cv.experiences.findIndex(e => e.id == this.experience.id);
        this.cv.experiences[index] = res;
        this.experience = new Experience();
        this.modal.dismissAll()
      })
    } else {
      this.experienceService.createExperience(this.experience).subscribe(res => {
        this.cv.experiences.push(res);
        this.saveCv();
        this.experience = new Experience();
        this.addExperience = false;
        this.modal.dismissAll()
      })
    }
  }
  cancelExperience() {
    this.experience = new Experience();
    this.addExperience = false;
    this.modal.dismissAll()
  }
  cancelStudy() {
    this.study = new Study();
    this.modal.dismissAll()
  }
  backToList() {
    this.router.navigateByUrl("cv")
  }

  saveCv(back?) {
    if (this.cvId) {
      this.cvService.updateCv(this.cv).subscribe(res => {
        if (back && !this.isCollaborator) {
          this.backToList()
        } if (back && this.isCollaborator) {
          this.router.navigateByUrl("")
        }
      })
    } else {
      this.cvService.createCv(this.cv).subscribe(res => {
        this.collaborator.cv = res;
        this.accountService.updateCollaborator(this.collaborator).subscribe(res => {
          if (this.isCollaborator) {
            this.router.navigateByUrl("")
          } else {
            this.backToList();
          }
        })
      })
    }
  }
  openDeleteExperienceModal(experience) {
    this.experienceToDeleteId = experience.id;
    this.activeModal = this.modal.open(this.deleteExperienceModal, { size: 'lg' });
  }

  openDeleteStudyModal(study) {
    this.studyToDeleteId = study.id
    this.activeModal = this.modal.open(this.deleteStudyModal, { size: 'lg' });
  }
  deleteExperience() {
    this.experienceService.deleteExperience(this.experienceToDeleteId).subscribe(() => {
      let index = this.cv.experiences.findIndex(e => e.id == this.experienceToDeleteId);
      this.cv.experiences.splice(index, 1);
      this.saveCv();
      this.modal.dismissAll();
    })
  }

  deleteStudy() {
    this.studyService.deleteStudy(this.studyToDeleteId).subscribe(() => {
      let index = this.cv.studies.findIndex(e => e.id == this.studyToDeleteId);
      this.cv.studies.splice(index, 1);
      this.saveCv();
      this.modal.dismissAll();
    })
  }


  createStudy() {
    this.activeModal = this.modal.open(this.createStudyModal, { size: 'lg' });
  }

  saveStudy() {
    if (this.study.id) {
      this.studyService.updateStudy(this.study).subscribe(res => {
        let index = this.cv.studies.findIndex(e => e.id == this.study.id);
        this.cv.studies[index] = res;
        this.study = new Study();
        this.modal.dismissAll()
      });
    } else {
      this.studyService.createStudy(this.study).subscribe(res => {
        if (this.cv.studies) {
          this.cv.studies.push(res);
        } else {
          this.cv.studies = [];
          this.cv.studies.push(res);
        }
        this.saveCv();
        this.study = new Study();
        this.modal.dismissAll()
      })
    }
  }
  openEditExperience(experience) {
    this.experience = experience;
    this.activeModal = this.modal.open(this.createExperienceModal, { size: 'lg' });

  }

  openEditStudy(study) {
    this.study = study;
    this.activeModal = this.modal.open(this.createStudyModal, { size: 'lg' });
  }

  createSkill() {
    this.activeModal = this.modal.open(this.createSkillModal, { size: 'lg' });
  }

  saveSkill() {
    this.skillService.createSkill(this.skill).subscribe(res => {
      this.cv.skills.push(res);
      this.saveCv();
      this.skill = new Skill();
      this.modal.dismissAll()
    });
  }

  deleteSkill(skill) {
    this.skillService.deleteSkill(skill.id).subscribe(res => {
      let index = this.cv.skills.findIndex(e => e.id == this.skill.id);
      this.cv.skills.splice(index, 1);
      this.saveCv();
      this.modal.dismissAll()
    });
  }


  setLoadedImage(){
    let objectURL = 'data:image/png;base64,' + this.cv.image.data;
    this.loadedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  fileChange(file) {
    this.file = file.target.files[0];

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };
    //@ts-ignore
    reader.readAsDataURL(event.target.files[0]);

  }

  uploadPurchaseOrder() {
    this.fileEntryService.storeImage(this.file).subscribe(res => {
      this.cv.image = res;
      this.saveCv();
      this.setLoadedImage();
      this.url = null;
    })
  }
}
