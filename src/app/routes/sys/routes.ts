import { Routes } from '@angular/router';

import { FunctionModuleManagerComponent } from './function-module-manager/function-module-manager.component';

export const routes: Routes = [
  {
    path: 'sys',
    children: [{ path: 'function-module', component: FunctionModuleManagerComponent }]
  }
]
