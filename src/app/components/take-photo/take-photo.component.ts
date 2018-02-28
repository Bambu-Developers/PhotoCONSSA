import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import * as FileSaver from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { RequestOptionsArgs } from '@angular/http/src/interfaces';

export interface ImageItem{
  name:string,
  filename:string,
  imageUrl:string
}

declare const FB: any;

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.scss']
})
export class TakePhotoComponent implements OnInit, AfterViewInit {

  private photoTrigger: Subject<void> = new Subject<void>();
  // latest snapshot
  public webcamImage: WebcamImage = null;
  @ViewChild('image') image: ElementRef;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  private profileUrl: Observable<string | null>;
  sub: any;
  items: any;
  selectedItems: any;
  currentPosition: number;
  selectedImageUrl: string;
  selectedFrameImage;
  showFrame: any;
  hasCameraError: boolean;
  facebookPostId: string;
  sharingToFacebook: boolean;
  public photoTaken: boolean;

  // CONSTRUCTOR
  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase, private sanitizer: DomSanitizer, private http: HttpClient) { 
    this.currentPosition = 0;
    this.photoTaken = false;
    this.sub = db.list("photos").valueChanges().subscribe((items)=>{
      this.items=items;
      for(let item of items){
        console.log((item as ImageItem).imageUrl);
        sanitizer.bypassSecurityTrustUrl((item as ImageItem).imageUrl);
      }
      this.selectStartingItem(0);
      this.selectFrame(this.items[0]);
    });
    FB.init({
        appId: '177911496282981',
        cookie: false,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8', // use graph api version 2.8
        status: true
    });
  }

  public selectStartingItem(itemNumber:number){
    this.currentPosition = itemNumber;    
    this.updateCurrentArray();
  }

  addStartingItem(){
    (this.currentPosition == this.items.length - 1) ? this.currentPosition = 0 : this.currentPosition += 1;
    this.updateCurrentArray();
  }

  substractStartingItem(){
    (this.currentPosition == 0) ? this.currentPosition = this.items.length : this.currentPosition -= 1;
    this.updateCurrentArray();
  }

  updateCurrentArray(){
    if(this.items.length>8){
      if(this.currentPosition + 8 < this.items.length){
        this.selectedItems = this.items.slice(this.currentPosition, this.currentPosition+8);
      }
      else{
        let array1 = this.items.slice(this.currentPosition);
        let array2 = this.items.slice(0,8-array1.length);
        this.selectedItems = array1.concat(array2);
      }
    }
    else{
      this.selectedItems = this.items;
    }
  }

  takePhoto(){
    this.photoTrigger.next();
    this.photoTaken = true;
  }

  isPhototaken(){
    return this.photoTaken;
  }

  public downloadPhoto(button: HTMLAnchorElement){    
    this.context.canvas.toBlob((blob)=>{FileSaver.saveAs(blob, "conssa.png");});
    // const canvasUrl = this.canvas.toDataURL();
    // button.href = canvasUrl;
  }

  public selectFrame(item){
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
        var img2 = this.image.nativeElement;
        img2.onload = ()=>{
          this.canvas.width = img2.width;
          this.canvas.height = img2.height;
          this.selectedFrameImage = img2;
        };
        img2.crossOrigin="";
        img2.src = url;
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

  public fbCheck(){
    console.log("uploading to desktop");
    FB.getLoginStatus((response) => {
      console.log(response);
      if (response.status === "connected") {
        this.fbUpload(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", window.location.href);
      } else if (response.status === "not_authorized") {
          FB.login((response) => {
            this.fbUpload(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", window.location.href);
          }, {scope: "publish_actions"});
      } else {
          FB.login((response) => {
            this.fbUpload(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", window.location.href);
          }, {scope: "publish_actions"});
      }
    } );
  }

  public fbUpload(token, filename, mimeType, message) {    
    let accessToken = token;
    let blob = this.canvas.toBlob((blob)=>{
      this.sharingToFacebook=true;      
      var formData = new FormData();
      formData.append('token', token);
      formData.append('source', blob);
      var xhr = new XMLHttpRequest();
      xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token='+token, true )
      xhr.onload = xhr.onerror = ()=> {
        this.sharingToFacebook=false;
        var response = JSON.parse(xhr.responseText);
        if(response.id){
          this.facebookPostId=response.id;
        }
        //
      };
      xhr.send( formData );
    },"image/png");
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info("received webcam image", webcamImage);
    console.log(this.selectedImageUrl);
    var img = new Image;
    img.onload = ()=>{      
      // this.canvas.width = img2.width;
      // this.canvas.height = img2.height;
      let proportion = this.selectedFrameImage.width / 2 - img.width / 2
      this.context.drawImage(img,proportion,0); // Or at whatever offset you like
      this.context.drawImage(this.selectedFrameImage,0,0); // Or at whatever offset you like
    };
    img.src = webcamImage.imageAsDataUrl;
    // img.crossOrigin="Anonymous";
  }

  public showErrorMessage(event:WebcamInitError){
    console.log(event.mediaStreamError);
    console.log(event.message);
    this.hasCameraError = (event.message === "Requested device not found");
  }

  ngOnInit() {
    this.sharingToFacebook=false;
  }

  ngAfterViewInit(): void {
    this.canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    // this.context = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
  }

}
