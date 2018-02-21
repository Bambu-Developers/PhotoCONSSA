import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WebcamImage } from 'ngx-webcam';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';



@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.scss']
})
export class TakePhotoComponent implements OnInit, AfterViewInit {

  private photoTrigger: Subject<void> = new Subject<void>();
  // latest snapshot
  public webcamImage: WebcamImage = null;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  private profileUrl: Observable<string | null>;
  sub: any;
  items: any;
  selectedImageUrl: string;
  showFrame: any;

  // CONSTRUCTOR
  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { 
    this.items = db.list("photos").valueChanges();
    
  }

  takePhoto(){
    this.photoTrigger.next();
  }

  selectFrame(item){
    console.info(item);
     // Create a reference to the file we want to download
     const path = `photoBackgrounds/${item.filename}`;
     const bgRef = this.storage.ref(path);
     // this.profileUrl = bgRef.getDownloadURL();
     console.log(bgRef.child.length);
 
     // Get the download URL
     bgRef.getDownloadURL().toPromise().then((url) => {
       // Insert url into an <img> tag to "download"
       console.log(url);
       this.selectedImageUrl = url;
     }).catch(function(error) {
       switch (error.code) {
         case 'storage/object_not_found':
           // File doesn't exist
           break;
 
         case 'storage/unauthorized':
           // User doesn't have permission to access the object
           break;
 
         case 'storage/canceled':
           // User canceled the upload
           break;
 
         case 'storage/unknown':
           // Unknown error occurred, inspect the server response
           break;
       }
     });
  }

  public get triggerObservable(): Observable<void> {
    return this.photoTrigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info("received webcam image", webcamImage);
    console.log(this.selectedImageUrl);
    //this.webcamImage = webcamImage;    
    var img = new Image;
    var img2 = new Image;
    img.onload = ()=>{      
      this.myCanvas.nativeElement.width = img2.width;
      this.myCanvas.nativeElement.height = img2.height;
      this.context.drawImage(img,img2.width / 2 - img.width / 2,0); // Or at whatever offset you like
      this.context.drawImage(img2,0,0); // Or at whatever offset you like
    };
    img.src = webcamImage.imageAsDataUrl;
    img2.src = this.selectedImageUrl;
  }

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
    this.context = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
  }

}
