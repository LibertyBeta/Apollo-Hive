import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmptyComponent } from './empty/empty.component';
import { HiveDetailsComponent } from './hive-details/hive-details.component';
import { HiveListComponent } from './hive-list/hive-list.component';
import { SwarmComponent } from './swarm/swarm.component';
import { HarvestsComponent } from './harvests/harvests.component';


const landingRoutes: Routes = [
  {
    path: '',
    component: HiveListComponent,
    children:[
      { path:':id/harvests', component: HarvestsComponent },
      { path:':id/bees', component: SwarmComponent },
      { path:':id/details', component: EmptyComponent },
      { path:':id', component: HiveDetailsComponent },
      { path: '', component: EmptyComponent }

    ]
  },
  { path:"**", component: EmptyComponent}

];

const appRoutes: Routes = [
  ...landingRoutes
  // ...videoQueRouting
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
