import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlickrSearchService {
    private searchApiUrl : string = '/services/api/render?method=flickr.photos.search';
    private apikey : string = '0a9eabf4b24275f388a913a1e54e072a';
    private headers : HttpHeaders;
    private queryParams : any;

    constructor(private http: HttpClient) { 
        this.headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',                
        });

        this.queryParams = {
            'api_key' : this.apikey,            
            'tags': '',
            'format' : 'json',
            'nojsoncallback' : '1',            
            'sort' : 'interestingness-desc',
            'per_page' : '1',
            'extras' : 'date_upload, date_taken, owner_name, views, url_q'
        };
    } 

    // API Call to get one photo for tag and user (optional)
    getPhotoForTag(tags : string, userId? : string): Observable<any> {   
        //We use the predefined parameters and rewrite only the ones needed
        this.queryParams['tags'] = tags;
        this.queryParams['per_page'] = '1';
        this.queryParams['extras'] = 'date_upload, date_taken, owner_name, views, url_q';
        this.queryParams['page'] = '1';//Set to default value

        if(userId){
            this.queryParams['user_id'] = userId;
        }else{
            delete this.queryParams.user_id;
        }      
        
        return this.http.get(            
            this.searchApiUrl, 
            {  
                headers : this.headers,      
                responseType: 'text',            
                params : this.queryParams
            },
        );
    }
    
    // API Call to get all photos for tag and user (optional)
    getAllPhotosForTag(tags : string, userId? : string, page?: string): Observable<any> {   
        //We use the predefined parameters and rewrite only the ones needed
        this.queryParams['tags'] = tags;
        this.queryParams['per_page'] = '15';
        this.queryParams['extras'] = 'url_q';        

        if(userId){
            this.queryParams['user_id'] = userId;
        }      
        if(page){
            this.queryParams['page'] = page;
        }
        
        return this.http.get(            
            this.searchApiUrl, 
            {  
                headers : this.headers,
                responseType: 'text',            
                params : this.queryParams
            },
        );
    }
}
