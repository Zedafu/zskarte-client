import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapRendererComponent } from './map-renderer/map-renderer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { SidebarFiltersComponent } from './sidebar/sidebar-filters/sidebar-filters.component';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MapLegendDisplayComponent } from './sidebar/map-legend-display/map-legend-display.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HelpComponent } from "./help/help.component";
import {Nl2BrPipeModule} from "nl2br-pipe";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {SessionCreatorComponent} from "./session-creator/session-creator.component";

@NgModule({
  declarations: [
    AppComponent,
    MapRendererComponent,
    ToolbarComponent,
    HelpComponent,
    ConfirmationDialogComponent,
    SessionCreatorComponent,
    // sidebar
    SidebarComponent,
    // SidebarFiltersComponent,
    MapLegendDisplayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatSliderModule,
    MatTableModule,
    MatRadioModule,
    MatListModule,
    MatButtonModule,
    Nl2BrPipeModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
