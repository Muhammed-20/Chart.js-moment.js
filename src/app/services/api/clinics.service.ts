import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService extends BaseService {

  constructor(private base:BaseService) {super(base.http)}

public getClinics() {
return this.base.getReq('/clinics')
}





}
