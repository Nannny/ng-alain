import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'layout-blank',
  template: ` <router-outlet />`,
  host: {
    '[class.alain-blank]': 'true'
  },
  standalone: true,
  imports: [RouterOutlet]
})
export class LayoutBlankComponent {}

export const enums = {
  // 首次登录，或者重新刷新页面时，需要实时获取需要的枚举
  // FIN_BIZ_TYPE: 业务类型
  // TRAVEL_APPLY_WAY: 出差申请方式
  // TRAVEL_TYPE: 出差类型
  enumsType: [
    'FIN_BIZ_TYPE',
    'TRAVEL_APPLY_WAY',
    'TRAVEL_TYPE',
    'ADV_REPORT_APLY',
    'ADV_REPORT_TRA',
    'ADV_REPORT_MET',
    'ADV_REPORT_GUEST_LEVEL',
    'ADV_REPORT_PEOPLE_TYPE',
    'PAY_TYPE',
    'PAYFEE_TYPE',
    'FOOD_WAY'
  ],
  finBizType: 'FIN_BIZ_TYPE', // 业务类型
  travelApplyWay: 'TRAVEL_APPLY_WAY', // 出差申请方式
  travelType: 'TRAVEL_TYPE', // 出差类型
  advReportApply: 'ADV_REPORT_APLY', // 事前报告 申请类型
  advReportTra: 'ADV_REPORT_TRA', // 事前报告 培训类型
  advReportMet: 'ADV_REPORT_MET', // 事前报告 会议
  advReportGuestLevel: 'ADV_REPORT_GUEST_LEVEL', // 接待-主宾级别
  advReportPeopleType: 'ADV_REPORT_PEOPLE_TYPE', // 接待-人员属性
  payType: 'PAY_TYPE', // 报销类型
  payFeeType: 'PAYFEE_TYPE', // 支付方式
  foodWay: 'FOOD_WAY' // 食宿方式
};

export default enums;
