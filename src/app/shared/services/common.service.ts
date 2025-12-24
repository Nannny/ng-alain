import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { R } from '@shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  private readonly http = inject(HttpClient);

  log() {
    console.log(1);
  }

  getMenus(): Observable<R> {
    return this.http.post<R>(`authority/sysTModule/menus`,{});
  }
}
