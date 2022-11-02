import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClinicComponent } from './clinic/clinic.component';
import { BaseService } from './services/api/base.service';
import { HttpClientModule} from '@angular/common/http'
import { LoaderService } from './services/loader.service';
import { MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTabsModule} from '@angular/material/tabs';
import { MatCheckboxModule } from  '@angular/material/checkbox';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input'

@NgModule({
  declarations: [
    AppComponent,
    ClinicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatNativeDateModule,
    MatInputModule

  ],
  providers: [MatDatepickerModule,BaseService,LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
