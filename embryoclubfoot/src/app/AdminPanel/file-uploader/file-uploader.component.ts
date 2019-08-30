import { Component, OnInit } from '@angular/core';
import { baseurl } from '../Models/basurl.data';
import { UploadImageServiceService } from 'src/app/Services/upload-image-service.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
idterrain
 
  constructor(private imageService : UploadImageServiceService) { }

  ngOnInit() {
  
  }
}
