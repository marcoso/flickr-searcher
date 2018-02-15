import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common'; 
import { FormsModule }  from '@angular/forms';

import { AppRoutingModule, RoutingComponents } from '../routes/app-routing.module';
import { PhotoDetailComponent } from './photo-detail.component';
import { FlickrSearchService } from '../core/flickr-search.service';
import { SortPipe } from '../core/pipes/sort.pipe';

describe('PhotoDetailComponent', () => {
  let component: PhotoDetailComponent;
  let fixture: ComponentFixture<PhotoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, AppRoutingModule, HttpClientModule ],
      declarations: [ PhotoDetailComponent, RoutingComponents, SortPipe ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }, FlickrSearchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
