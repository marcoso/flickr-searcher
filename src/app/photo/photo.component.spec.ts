import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { Photo } from '../models/photo';
import { AppRoutingModule } from '../routes/app-routing.module'; 
import { PhotoComponent } from './photo.component';
import { PhotoDetailComponent } from '../photo-detail/photo-detail.component';
import { SortPipe } from '../core/pipes/sort.pipe';
import { FlickrSearchService } from '../core/flickr-search.service';
import { SortField, SortDirection } from '../core/enums';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoComponent, PhotoDetailComponent, SortPipe ],
      imports: [ FormsModule, AppRoutingModule, HttpClientModule ],      
      providers : [{provide: APP_BASE_HREF, useValue : '/' }, FlickrSearchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set sort field to default value', () => {
    expect(component.sortField).toBe(SortField.sortByViews);    
  });

  it('should set sort direction to default value', () => {    
    expect(component.sortDirection).toBe(SortDirection.Asc);    
  });

  it('should set sort field to SortField.sortByDateTaken', () =>{
    component.setSortingField(SortField.sortByDateTaken);
    fixture.detectChanges();
    expect(component.sortField).toBe(SortField.sortByDateTaken);
  });

  it('should set sort field to SortField.sortByDateUploaded', () =>{
    component.setSortingField(SortField.sortByDateUploaded);
    fixture.detectChanges();
    expect(component.sortField).toBe(SortField.sortByDateUploaded);
  });

  it('should set sort field to SortField.sortByOwnerName', () =>{
    component.setSortingField(SortField.sortByOwnerName);
    fixture.detectChanges();
    expect(component.sortField).toBe(SortField.sortByOwnerName);
  });

  it('should set sort field to SortField.sortByViews', () =>{
    component.setSortingField(SortField.sortByViews);
    fixture.detectChanges();
    expect(component.sortField).toBe(SortField.sortByViews);
  });

  it('should set component search fields to initial values', () =>{
    component.cancel();
    fixture.detectChanges();
    expect(component.searchTag).toBe('');
    expect(component.userId).toBe('');
    expect(component.searchMessage).toBe('');    
  });  
});
