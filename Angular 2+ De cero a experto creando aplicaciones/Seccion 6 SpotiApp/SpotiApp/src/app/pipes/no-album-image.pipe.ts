import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noAlbumImage'
})
export class NoAlbumImagePipe implements PipeTransform {

  noImage:string = "assets/img/noimage.png";

  transform(value: any[]): string {
    if (!value) {
      return this.noImage;
    }

    return (value.length > 0)? value[1].url : this.noImage;
  }

}
