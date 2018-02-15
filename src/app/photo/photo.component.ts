import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';

import { FlickrSearchService } from '../core/flickr-search.service';
import { Photo } from '../models/photo';
import { SortPipe } from '../core/pipes/sort.pipe';
import { SortField, SortDirection } from '../core/enums';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']  
})
@Injectable()
export class PhotoComponent implements OnInit {
  searchTag : string;
  userId : string;
  searchMessage : string;  
  photosResult : any = [];  
  sortFieldType = SortField;
  sortField : SortField;
  sortDirection : SortDirection;
  
  constructor(private router: Router, private searchService: FlickrSearchService) { }

  ngOnInit() { 
    // Default sorting values
    this.sortField = SortField.sortByViews;
    this.sortDirection = SortDirection.Asc;
  }

  search(){    
    this.searchMessage = '';
    if(this.searchTag != ''){      
      let observable = this.searchService.getPhotoForTag(this.searchTag, this.userId);
      observable.subscribe( 
        data => this.photoLoaded(data), 
        err => this.handleError(err)
      );
    }    
  }

  // Handler to fetch all json data returned from the REST call
  photoLoaded(data: any){              
    if(data){                     
        let json = JSON.parse($.parseHTML(data)[1].innerHTML);   
        if(json.photos.pages > 0) {
          json["tags"] = this.searchTag;
          json["userid"] = this.userId;
        
          if(typeof(Storage) !== 'undefined'){
            if(!!sessionStorage.getItem('dataArray')){
              //New item
              let dataArray = sessionStorage.getItem('dataArray');
              let jsonParsed = JSON.parse(dataArray);
              jsonParsed.push(json);            
              let data = JSON.stringify(jsonParsed);
              sessionStorage.setItem('dataArray', data);            
            }else{
              //First Item
              let dataArray = Array<string>(json);
              let data = JSON.stringify(dataArray);
              sessionStorage.setItem('dataArray', data);
            }
            this.photosResult = JSON.parse(sessionStorage.getItem('dataArray'));
          }else{
            console.log('no web storage support available, please try a compatible browser');
          }                              
        }else{
          this.searchMessage = 'There are no images for the selected tags/user.';
        }
        //Form clearing (decided to left the controls loaded in case an error occurs so the user can retry)
        this.searchTag = '';
        this.userId = '';
    }else{
        //If an error ocurrs in the REST call we throw an exception      
        throw new Error('There was an error while trying to obtain the images, please try again.');
    }
  }    

  private handleError (error: HttpErrorResponse | any) {        
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {                
      errMsg = `${error.status} - ${error.statusText || ''} - ${error.message}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.searchMessage = 'There was an error while trying to obtain the images, please try again.';
    console.log(errMsg);        
  } 

  cancel(){
    this.searchTag = '';
    this.userId = '';
    this.searchMessage = '';
    this.photosResult = [];
  }  

  // Handler to navigate to details page after clicking or pressing a tile on devices
  tileClick(tags : string, owner : string){        
    let params = {};

    if(tags){
      params['tags'] = tags;
    }    
    if(owner){
      params['userid'] = owner;
    }

    this.router.navigate(['/photo-detail', params]);
  }

  setSortingField(type: SortField) {    
    this.sortField = type;    
    this.sortDirection = this.sortDirection == SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
  }
}
