import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';

import { FlickrSearchService } from '../core/flickr-search.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  private userId : string;
  private tags : any;
  private searchMessage : string;  
  private photos : any = [];
  private page : number = 1; 

  constructor(private route: ActivatedRoute, private searchService: FlickrSearchService) { }

  ngOnInit() {            
    if(this.route.snapshot.paramMap.has('userid')){
      this.userId = this.route.snapshot.paramMap.get('userid');  
    }
    this.tags = this.route.snapshot.paramMap.get('tags');
    this.searchPhotos();
  }
  
  searchPhotos(){
    this.searchMessage = '';
    if(this.tags){      
      let observable = this.searchService.getAllPhotosForTag(this.tags, this.userId, this.page.toString());
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
          let dataArray = Array<string>(json);
          this.photos = dataArray;        
      }else{
        this.searchMessage = 'There are no images for the selected tags/user.';
      }
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

  setFirstPage(){    
    if(this.page > 1){
      this.page = 1;    
      this.searchPhotos();
    }
  }
  
  setLastPage(){    
    if(this.photos && this.page < this.photos[0].photos.pages){
      this.page = this.photos[0].photos.pages;
      this.searchPhotos();
    }    
  }
  
  setNextPage(){    
    if(this.photos && this.page < this.photos[0].photos.pages){
      this.page++;
      this.searchPhotos();
    }
  }

  setPreviousPage(){    
    if(this.page > 1){
      this.page--;    
      this.searchPhotos();
    }    
  }
}
