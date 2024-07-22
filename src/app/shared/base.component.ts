import { ChangeDetectorRef, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { _HttpClient, SettingsService } from '@delon/theme';
import { Store } from '@ngxs/store';
import { NormalStoreState, NormalStoreStateModel } from '@store';

export class BaseComponent {
  protected readonly router = inject(Router);
  protected readonly settingsService = inject(SettingsService);
  protected readonly reuseTabService = inject(ReuseTabService, { optional: true });
  protected readonly tokenService = inject(DA_SERVICE_TOKEN);
  protected readonly startupSrv = inject(StartupService);
  protected readonly http = inject(_HttpClient);
  protected readonly cdr = inject(ChangeDetectorRef);
  protected readonly store = inject(Store);
  protected readonly store$: Signal<NormalStoreStateModel> = this.store.selectSignal(NormalStoreState.getNormal);
}
