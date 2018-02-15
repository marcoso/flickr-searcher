import { Pipe, PipeTransform } from '@angular/core';
import { SortField, SortDirection } from '../enums';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  //Angular 2+ Does not provide sorting directives anymore as in previous versions so we need to implement sorting manually to use in components
  
  transform(array: Array<string>, sortBy: SortField, direction: SortDirection): Array<string> {   
    let sortValueA : any;
    let sortValueB : any;
    array.sort((a: any, b: any) => {            
      //Sort field selection
      if(sortBy == SortField.sortByViews){        
        sortValueA = Number.parseInt(a.photos.photo[0].views);
        sortValueB =  Number.parseInt(b.photos.photo[0].views);
      }else if(sortBy == SortField.sortByDateTaken){
        sortValueA = Date.parse(a.photos.photo[0].datetaken);
        sortValueB = Date.parse(b.photos.photo[0].datetaken);
      }else if (sortBy == SortField.sortByDateUploaded){        
        sortValueA = Number.isNaN(a.photos.photo[0].dateupload) ? Date.parse(a.photos.photo[0].dateupload) : Number.parseInt(a.photos.photo[0].dateupload);
        sortValueB = Number.isNaN(b.photos.photo[0].dateupload) ? Date.parse(b.photos.photo[0].dateupload) : Number.parseInt(b.photos.photo[0].dateupload);
      }else if(sortBy == SortField.sortByOwnerName){
        sortValueA = a.photos.photo[0].ownername;
        sortValueB = b.photos.photo[0].ownername;
      }

      //Sort evaluation
      if ( sortValueA < sortValueB) {
        return direction == SortDirection.Asc ? 1 : -1;
      } else if (sortValueA > sortValueB) {
        return direction == SortDirection.Desc ? 1 : -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}