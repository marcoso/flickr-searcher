import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';  
import { FormsModule }  from '@angular/forms';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component'; 
import { PhotoComponent } from './photo/photo.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { SortPipe } from './core/pipes/sort.pipe';
 
 describe('Tests for AppComponent: ', () => {  
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent, PhotoComponent, PhotoDetailComponent, SortPipe ],
            imports: [AppRoutingModule, FormsModule],
            providers: [                                          
                { provide: LocationStrategy, useClass: HashLocationStrategy }
            ]  
        });
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent, PhotoComponent, PhotoDetailComponent ],
            imports: [AppRoutingModule, FormsModule],
            providers: [                                          
                { provide: LocationStrategy, useClass: HashLocationStrategy }
            ]  
        });
    });
   
    describe('Component tests', () => {        
        it('should create the AppComponent', async(() => {
          const fixture = TestBed.createComponent(AppComponent);
          const app = fixture.debugElement.componentInstance;
          expect(app).toBeTruthy();
        }));        
    });      
    
});