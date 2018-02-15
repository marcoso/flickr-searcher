import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule, RoutingComponents } from './routes/app-routing.module';
import { FlickrSearchService } from './core/flickr-search.service';
import { PhotoComponent } from './photo/photo.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { SortPipe } from './core/pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,    
    PhotoComponent,
    RoutingComponents,
    PhotoDetailComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,  
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    FlickrSearchService,    
    { provide: LocationStrategy, useClass: HashLocationStrategy }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
