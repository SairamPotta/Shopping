import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
    if(!array) return array;
    const order = -1;
    array.sort((a: any, b: any) => {
	    if ( a[args] < b[args] ){
	    	return -1* order;
	    }else if( a[args] > b[args] ){
	        return 1* order;
	    }else{
	    	return 0;	
	    }
    });
    return array;
  }

}
