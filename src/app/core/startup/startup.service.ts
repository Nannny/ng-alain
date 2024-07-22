import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { Store } from '@ngxs/store';
import { CommonService } from '@services';
import { NormalActions, NormalStoreState } from '@store';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, zip, catchError, map, mergeAll, of, throwError } from 'rxjs';

import { I18NService } from '../i18n/i18n.service';
import { zhCN } from '../i18n/zh-CN';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
export function provideStartup(): Provider[] {
  return [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: StartupService) => () => startupService.load(),
      deps: [StartupService],
      multi: true
    }
  ];
}

@Injectable()
export class StartupService {
  private menuService = inject(MenuService);
  private settingService = inject(SettingsService);
  private aclService = inject(ACLService);
  private titleService = inject(TitleService);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private i18n = inject<I18NService>(ALAIN_I18N_TOKEN);
  private store = inject(Store);
  private store$ = this.store.selectSignal(NormalStoreState.getNormal);
  private defaultLang = this.i18n.defaultLang;
  private commonService = inject(CommonService);

  load(): Observable<void> {
    // If http request allows anonymous access, you need to add `ALLOW_ANONYMOUS`:
    // this.httpClient.get('/app', { context: new HttpContext().set(ALLOW_ANONYMOUS, true) })
    // return new Observable().pipe(
    //   map(() => {
    //     this.i18n.use(defaultLang, zhCN);
    //
    //     // ACL：设置权限为全量
    //     this.aclService.setFull(true);
    //   })
    // );

    if (this.store$().user) {
      this.settingService.setUser(this.store$().user);
      return zip(this.commonService.getMenus()).pipe(
        catchError(res => {
          this.setBasicInfo();
          return [];
        }),
        map(([appData]: [NzSafeAny]) => {
          console.log(appData);
          this.setBasicInfo();

          // // 应用信息：包括站点名、描述、年份
          // this.settingService.setApp(appData.app);
          // 初始化菜单
          this.menuService.add(this.menus);
          // // 设置页面标题的后缀
          // this.titleService.default = '';
          // this.titleService.suffix = appData.app.name;
        })
      );
    }

    return of(null).pipe(
      map(() => {
        this.setBasicInfo();
      })
    );

    // return zip(this.httpClient.get('./assets/tmp/app-data.json')).pipe(
    //   // 接收其他拦截器后产生的异常消息
    //   catchError(res => {
    //     console.warn(`StartupService.load: Network request failed`, res);
    //     setTimeout(() => this.router.navigateByUrl(`/exception/500`));
    //     return [];
    //   }),
    //   map(([appData]: [NzSafeAny]) => {
    //     // setting language data
    //     this.i18n.use(defaultLang, zhCN);
    //
    //     // // 应用信息：包括站点名、描述、年份
    //     // this.settingService.setApp(appData.app);
    //     // // 用户信息：包括姓名、头像、邮箱地址
    //     // this.settingService.setUser(appData.normal);
    //     // ACL：设置权限为全量
    //     this.aclService.setFull(true);
    //     // 初始化菜单
    //     // this.menuService.add(appData.menu);
    //     // // 设置页面标题的后缀
    //     // this.titleService.default = '';
    //     // this.titleService.suffix = appData.app.name;
    //   })
    // );
  }

  private setBasicInfo() {
    this.i18n.use(this.defaultLang, zhCN);
    // ACL：设置权限为全量
    this.aclService.setFull(true);
  }

  menus = [
    {
      text: '主导航',
      i18n: 'menu.main',
      group: true,
      hideInBreadcrumb: true,
      children: [
        {
          text: '仪表盘',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
          children: [
            {
              text: '仪表盘V1',
              link: '/dashboard/v1',
              i18n: 'menu.dashboard.v1'
            },
            {
              text: '分析页',
              link: '/dashboard/analysis',
              i18n: 'menu.dashboard.analysis'
            },
            {
              text: '监控页',
              link: '/dashboard/monitor',
              i18n: 'menu.dashboard.monitor'
            },
            {
              text: '工作台',
              link: '/dashboard/workplace',
              i18n: 'menu.dashboard.workplace'
            }
          ]
        },
        {
          text: '快捷菜单',
          i18n: 'menu.shortcut',
          icon: 'anticon-rocket',
          shortcutRoot: true,
          children: []
        },
        {
          text: '小部件',
          i18n: 'menu.widgets',
          link: '/widgets',
          icon: 'anticon-appstore',
          badge: 2
        }
      ]
    },
    {
      text: 'Alain',
      i18n: 'menu.alain',
      group: true,
      hideInBreadcrumb: true,
      children: [
        {
          text: '样式',
          i18n: 'menu.style',
          icon: 'anticon-info',
          children: [
            {
              text: 'Typography',
              link: '/style/typography',
              i18n: 'menu.style.typography',
              shortcut: true
            },
            {
              text: 'Grid Masonry',
              link: '/style/gridmasonry',
              i18n: 'menu.style.gridmasonry'
            },
            {
              text: 'Colors',
              link: '/style/colors',
              i18n: 'menu.style.colors'
            }
          ]
        },
        {
          text: 'Delon',
          i18n: 'menu.delon',
          icon: 'anticon-bulb',
          children: [
            {
              text: 'Dynamic Form',
              link: '/delon/form',
              i18n: 'menu.delon.form'
            },
            {
              text: 'Simple Table',
              link: '/delon/st',
              i18n: 'menu.delon.table'
            },
            {
              text: 'Util',
              link: '/delon/util',
              i18n: 'menu.delon.util',
              acl: 'role-a'
            },
            {
              text: 'Print',
              link: '/delon/print',
              i18n: 'menu.delon.print',
              acl: 'role-b'
            },
            {
              text: 'QR',
              link: '/delon/qr',
              i18n: 'menu.delon.qr'
            },
            {
              text: 'ACL',
              link: '/delon/acl',
              i18n: 'menu.delon.acl'
            },
            {
              text: 'Route Guard',
              link: '/delon/guard',
              i18n: 'menu.delon.guard'
            },
            {
              text: 'Cache',
              link: '/delon/cache',
              i18n: 'menu.delon.cache'
            },
            {
              text: 'Down File',
              link: '/delon/downfile',
              i18n: 'menu.delon.downfile'
            },
            {
              text: 'Xlsx',
              link: '/delon/xlsx',
              i18n: 'menu.delon.xlsx'
            },
            {
              text: 'Zip',
              link: '/delon/zip',
              i18n: 'menu.delon.zip'
            }
          ]
        }
      ]
    },
    {
      text: 'Pro',
      i18n: 'menu.pro',
      group: true,
      hideInBreadcrumb: true,
      children: [
        {
          text: 'Form Page',
          i18n: 'menu.form',
          link: '/pro/form',
          icon: 'anticon-edit',
          children: [
            {
              text: 'Basic Form',
              link: '/pro/form/basic-form',
              i18n: 'menu.form.basicform',
              shortcut: true
            },
            {
              text: 'Step Form',
              link: '/pro/form/step-form',
              i18n: 'menu.form.stepform'
            },
            {
              text: 'Advanced Form',
              link: '/pro/form/advanced-form',
              i18n: 'menu.form.advancedform'
            }
          ]
        },
        {
          text: 'List',
          i18n: 'menu.list',
          icon: 'anticon-appstore',
          children: [
            {
              text: 'Table List',
              link: '/pro/list/table-list',
              i18n: 'menu.list.searchtable',
              shortcut: true
            },
            {
              text: 'Basic List',
              link: '/pro/list/basic-list',
              i18n: 'menu.list.basiclist'
            },
            {
              text: 'Card List',
              link: '/pro/list/card-list',
              i18n: 'menu.list.cardlist'
            },
            {
              text: 'Search List',
              i18n: 'menu.list.searchlist',
              children: [
                {
                  link: '/pro/list/articles',
                  i18n: 'menu.list.searchlist.articles'
                },
                {
                  link: '/pro/list/projects',
                  i18n: 'menu.list.searchlist.projects',
                  shortcut: true
                },
                {
                  link: '/pro/list/applications',
                  i18n: 'menu.list.searchlist.applications'
                }
              ]
            }
          ]
        },
        {
          text: 'Profile',
          i18n: 'menu.profile',
          icon: 'anticon-profile',
          children: [
            {
              text: 'Basic',
              link: '/pro/profile/basic',
              i18n: 'menu.profile.basic'
            },
            {
              text: 'Advanced',
              link: '/pro/profile/advanced',
              i18n: 'menu.profile.advanced',
              shortcut: true
            }
          ]
        },
        {
          text: 'Result',
          i18n: 'menu.result',
          icon: 'anticon-check-circle',
          children: [
            {
              text: 'Success',
              link: '/pro/result/success',
              i18n: 'menu.result.success'
            },
            {
              text: 'Fail',
              link: '/pro/result/fail',
              i18n: 'menu.result.fail'
            }
          ]
        },
        {
          text: 'Exception',
          i18n: 'menu.exception',
          link: '/',
          icon: 'anticon-exception',
          children: [
            {
              text: '403',
              link: '/exception/403',
              i18n: 'menu.exception.not-permission',
              reuse: false
            },
            {
              text: '404',
              link: '/exception/404',
              i18n: 'menu.exception.not-find',
              reuse: false
            },
            {
              text: '500',
              link: '/exception/500',
              i18n: 'menu.exception.server-error',
              reuse: false
            }
          ]
        },
        {
          text: 'Account',
          i18n: 'menu.account',
          icon: 'anticon-user',
          children: [
            {
              text: 'center',
              link: '/pro/account/center',
              i18n: 'menu.account.center'
            },
            {
              text: 'settings',
              link: '/pro/account/settings',
              i18n: 'menu.account.settings'
            }
          ]
        }
      ]
    },
    {
      text: 'More',
      i18n: 'menu.more',
      group: true,
      hideInBreadcrumb: true,
      children: [
        {
          text: 'Report',
          i18n: 'menu.report',
          icon: 'anticon-cloud',
          children: [
            {
              text: 'Relation',
              link: '/data-v/relation',
              i18n: 'menu.report.relation',
              reuse: false
            }
          ]
        },
        {
          text: 'Extras',
          i18n: 'menu.extras',
          link: '/extras',
          icon: 'anticon-link',
          children: [
            {
              text: 'Help Center',
              link: '/extras/helpcenter',
              i18n: 'menu.extras.helpcenter'
            },
            {
              text: 'Settings',
              link: '/extras/settings',
              i18n: 'menu.extras.settings'
            },
            {
              text: 'Poi',
              link: '/extras/poi',
              i18n: 'menu.extras.poi'
            }
          ]
        }
      ]
    }
  ];
}
