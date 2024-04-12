import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BolsosComponent } from './bolsos/bolsos.component';
import { ListBolsosComponent } from './bolsos/list-bolsos/list-bolsos.component';
import { DetailBolsosComponent } from './bolsos/detail-bolsos/detail-bolsos.component';
import { GoalkeepersComponent } from './goalkeepers/goalkeepers.component';
import { ListGoalkeepersComponent } from './list-goalkeepers/list-goalkeepers.component';
import { DetailGoalkeepersComponent } from './detail-goalkeepers/detail-goalkeepers.component';



@NgModule({
  declarations: [
    BolsosComponent,
    ListBolsosComponent,
    DetailBolsosComponent,
    GoalkeepersComponent,
    ListGoalkeepersComponent,
    DetailGoalkeepersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
