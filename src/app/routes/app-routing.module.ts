import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoComponent } from '../photo/photo.component';
import { PhotoDetailComponent } from '../photo-detail/photo-detail.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'photo'},		
	{ path: 'photo', component: PhotoComponent },
	{ path: 'photo-detail', component: PhotoDetailComponent },
];

// Module that handle routing in our application so we can navigate through components
@NgModule ({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}

export const RoutingComponents = [		
	PhotoComponent,
	PhotoDetailComponent	
]