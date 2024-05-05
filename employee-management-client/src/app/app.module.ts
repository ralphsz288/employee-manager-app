import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { CoreComponent } from './core/core.component';
import { MyTeamsComponent } from './core/teams/my-teams/my-teams.component';
import { ManagedTeamsComponent } from './core/teams/managed-teams/managed-teams.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthComponent } from './auth/auth.component';
import { CoreModule } from './core/core.module';
import { TeamsEffects } from './core/teams/store/teams.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    CoreModule,
    FormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([AuthEffects,TeamsEffects]),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
