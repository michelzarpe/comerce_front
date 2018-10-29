import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profileImage64;
  foto: string;
  cliente: ClienteDTO;
  picture: string = '';
  camerdaOn: boolean = false;
  imgPreview: string = '';
  avatar: string = '';
  avatarBase64: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    private imagePicker: ImagePicker,
    private base64: Base64,
    public toastCtrl: ToastController,
    public sanitizer: DomSanitizer) {
      this.profileImage64 = 'assets/img/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  getGalleryPicture_1() {
    let options = { maximumImagesCount: 1 };
    this.imagePicker.getPictures(options).then((results) => {
      
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.avatarBase64 = base64File;
        }, (err) => {
          this.presentToast(err);
        });
      }
      this.sendPicture1();
    }, (err) => { });
  }

  sendPicture1() {
    this.clienteService.uploadPicture(this.avatarBase64).subscribe(response => {
      this.avatar = null;
      this.loadData();
    }, error => { });
  }

  getCameraPicture() {
    this.camerdaOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.camerdaOn = false;
    }, (err) => {
      // Handle error
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture).subscribe(response => {
      this.picture = null;
      this.getImageIfExists();
    }, error => { });
  }

  cancel() {
    this.picture = null;
  }

  loadData() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(response => { this.cliente = response as ClienteDTO, this.getImageIfExists(); },
        error => {
          if (error.status == 403) {// se der o erro 403 volta para o home, que é o login
            this.navCtrl.setRoot('HomePage');
          }
        });

    } else {//se der algum problema com o token volta para pagina inicial
      this.navCtrl.setRoot('HomePage');
    }
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => { console.log('Dismissed toast'); });
    toast.present();
  }


  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
      this.blobToDataURL(response).then(dataUrl =>{
        let str : string = dataUrl as string;
        this.profileImage64 = this.sanitizer.bypassSecurityTrustUrl(str);
      });
    }, error => { this.profileImage64 = 'assets/img/avatar-blank.png';});
  }
  
  blobToDataURL(blob){
    return new Promise((fulfill,reject)=>{
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload= (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    })
  }
  


}
