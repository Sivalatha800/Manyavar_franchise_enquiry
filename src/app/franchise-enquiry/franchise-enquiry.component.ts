import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { getAllCities, submitData } from './apiURL';
import { sentDataObj } from './formObj';

@Component({
  selector: 'app-franchise-enquiry',
  templateUrl: './franchise-enquiry.component.html',
  styleUrls: ['./franchise-enquiry.component.css'],
})
export class FranchiseEnquiryComponent implements OnInit {
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step1Submitted = false;
  step2Submitted = false;
  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public http: HttpClient
  ) {
    // ==============  Step1 Form Group  ======================
    this.step1Form = fb.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9A-Za-z_#&()+!/;:.,'-]+$/),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[6-9][0-9]{9}$/),
      ]),
      landline: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{8,12}/),
      ]),
    });

    //==============================  Step2 Form Group  ===================================
    this.step2Form = fb.group({
      countryName: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
      cityName: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      storeAvailabale: new FormControl('', [Validators.required]),
      ownLocation: new FormControl('', [Validators.required]),
      rentedLocation: new FormControl('', [Validators.required]),
      carpetArea: new FormControl('', [Validators.required]),
      frontage: new FormControl('', [Validators.required]),
      retailStore: new FormControl('', [Validators.required]),
      businessBackground: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required]),
      captureCode: new FormControl('', [Validators.required]),

      snapshot1: [''],
      snapshot3: [''],
      snapshot2: [''],
    });
  }

  ngOnInit(): void {
    this.getAllCountriesList();
  }

  //randome Number Generator
  random!: number;
  generateCapture() {
    let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.captchaLoad(random);
    this.random = random;
  }

  //Capture load to Canvas
  captchaLoad(random: any) {
    setTimeout(() => {
      var canvas = <HTMLCanvasElement>document.getElementById('randomCanvas');
      var context = canvas.getContext('2d');
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context!.font = '30px Arial, Helvetica, sans-serif';
      context!.fillStyle = '#000';
      context?.fillText(random, 10, 35);
    }, 200);
  }

  //Capture Validation
  captureError: boolean = false;
  captureValidation(event: any) {
    if (event.target.value != this.random && event.target.value.length > 0) {
      this.captureError = true;
    } else {
      this.captureError = false;
    }
  }

  //Show Step2 Form with form Validations Checking
  isActive!: boolean;
  step1Visible: boolean = true;
  // step2Visible() {
  //   this.step1Submitted = true;
  //   if (this.step1Form.valid) {
  //     this.step1Visible = false;
  //     this.isActive = true;
  //     this.generateCapture();
  //   } else {
  //     return;
  //   }
  // }

  step2Visible() {
    this.step1Visible = false;
    this.isActive = true;
    this.generateCapture();
  }

  //Get countries List
  countries: any;
  getAllCountriesList() {
    this.apiService
      .getAllCountries()
      .subscribe((resData) => (this.countries = resData.Data));
  }

  //get States List
  states: any;
  getAllStatesList(event: any) {
    this.apiService
      .getAllStates(event.target.value)
      .subscribe((resData) => (this.states = resData.Data));
  }

  //get Cities List
  cities: any;
  getAllCitiesList(event: any) {
    const sentData = {
      State: event.target.value,
    };
    this.apiService
      .getAllCities(getAllCities, sentData)
      .subscribe((resData) => (this.cities = resData.Data));
  }

  //image format Check
  fileName: any;
  file1: any;
  file2: any;
  file3: any;
  error: boolean = false;
  uploadFileCheck(event: any, id: string) {
    if (id == '1') {
      this.file1 = event.target.files;
      if (this.file1[0].type != 'image/png' || 'image/gif' || 'image/jpg') {
        this.error = true;
      } else {
        this.error = false;
      }
      // console.log(jjvbnm[0].name);
      // console.log(jjvbnm[0].type);
    } else if (id == '2') {
      this.file2 = event.target.files;
    } else if (id == '3') {
      this.file3 = event.target.files;
    }
    // if (event.target.files.length > 0) {
    //   this.fileName = event.target.files[0].name;
    // }
  }

  //Form Submit
  formSubmittedData: any;
  submitForm() {
    this.step2Submitted = true;

    if (this.step2Form.invalid) {
      let submitFormData: sentDataObj = new sentDataObj();
      submitFormData.FirstName = this.step1Form.value.fullName;
      submitFormData.Email = this.step1Form.value.email;
      submitFormData.Address = this.step1Form.value.address;
      submitFormData.Mobile = this.step1Form.value.mobile;
      submitFormData.Landline = this.step1Form.value.landline;

      submitFormData.NoLocationName = this.step2Form.value.location;
      submitFormData.CountryName = this.step2Form.value.countryName;
      submitFormData.State = this.step2Form.value.stateName;
      submitFormData.City = this.step2Form.value.cityName;
      submitFormData.HaveAStoreLocation = this.step2Form.value.storeAvailabale;
      submitFormData.OwnLocation = this.step2Form.value.ownLocation;
      submitFormData.RentLocation = this.step2Form.value.rentedLocation;
      submitFormData.AreainSqftOftheStore = this.step2Form.value.carpetArea;
      submitFormData.Frontage = this.step2Form.value.frontage;
      submitFormData.RetailStoresInSurrounding =
        this.step2Form.value.retailStore;
      submitFormData.BusinessWebsite = this.step2Form.value.businessBackground;
      submitFormData.Comments = this.step2Form.value.comments;
      submitFormData.CaptchaCode = this.step2Form.value.captureCode;

      const formData = new FormData();
      debugger;
      const blob1 = new Blob([this.file1], {
        type: 'image/png',
      });

      const blob2 = new Blob([this.file2], {
        type: 'image/png',
      });
      const blob3 = new Blob([this.file3], {
        type: 'image/png',
      });

      formData.append('SnapShot1', blob1, this.file1[0].name);
      formData.append('SnapShot2', blob2, this.file2[0].name);
      formData.append('SnapShot3', blob3, this.file3[0].name);

      const data = JSON.stringify(submitFormData);
      formData.append('body', data);

      this.apiService
        .post(submitData, formData)
        .subscribe((response) => (this.formSubmittedData = response));
    } else {
      return;
    }
  }
}
