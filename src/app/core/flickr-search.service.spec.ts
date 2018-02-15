import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';

import { AppRoutingModule } from '../routes/app-routing.module';
import { PhotoComponent } from '../photo/photo.component';
import { PhotoDetailComponent } from '../photo-detail/photo-detail.component';
import { SortPipe } from '../core/pipes/sort.pipe';
import { FlickrSearchService } from './flickr-search.service';

describe('Flickr Search Service tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [ FlickrSearchService ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('Service should be injected', inject([FlickrSearchService], (service: FlickrSearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should send a GET request to Flickr photo search to get one photo', async(inject([FlickrSearchService, HttpTestingController],
    (service: FlickrSearchService, backend: HttpTestingController) => {
      service.getPhotoForTag('moon').subscribe();

      backend.expectOne((req: HttpRequest<any>) => {  
          
        return req.url === '/services/api/render?method=flickr.photos.search'
          && req.method === 'GET'
          && req.headers.get('Content-Type') === 'application/json'
          && req.headers.get('Accept') === 'application/json'
          && req.responseType === 'text'           
          
      }, `GET to '/services/api/render?method=flickr.photos.search'`);
  })));

  it('should send a GET request to Flickr photo search to get all photos for tag', async(inject([FlickrSearchService, HttpTestingController],
    (service: FlickrSearchService, backend: HttpTestingController) => {
      service.getAllPhotosForTag('moon').subscribe();

      backend.expectOne((req: HttpRequest<any>) => {  

        return req.url === '/services/api/render?method=flickr.photos.search'
          && req.method === 'GET'
          && req.headers.get('Content-Type') === 'application/json'
          && req.headers.get('Accept') === 'application/json'
          && req.responseType === 'text'                      
          
      }, `GET to '/services/api/render?method=flickr.photos.search'`);
  })));
});