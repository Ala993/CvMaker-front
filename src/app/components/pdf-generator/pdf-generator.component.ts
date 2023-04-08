import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { Cv } from 'app/modules/cv.model';
import { CvService } from 'app/services/cv.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('pdfTable', { static: false }) el!: ElementRef;
  loadedImage
  cv: Cv;
  @Input() set _cv(newValue) {
    if (newValue.id) {
      this.cv = newValue;
      this.findCvById();
    }
  }

  constructor(
    private cvService: CvService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

  }

  findCvById() {
    this.cvService.findCvById(this.cv.id).subscribe(res => {
      this.cv = res;
      if(this.cv.image){
        this.setLoadedImage();
      }
      
    })
  }
  public downloadAsPDF() {
    let pdf =new jsPDF('p', 'pt','a4',true);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("sample.pdf")
      }
    })

  }


  setLoadedImage(){
    let objectURL = 'data:image/png;base64,' + this.cv.image.data;
    this.loadedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
