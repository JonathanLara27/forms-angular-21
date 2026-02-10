// drop.service.ts
import { Injectable } from '@angular/core';
import { DropCreate } from '../interfaces';
import { INIT_DROP, MONTHS_LIST, PERIOD_CONFIGURATION } from '../constants';

@Injectable()
export class DropService {
  generateDropsForPeriod(periodId: number): DropCreate[] {
    const period = PERIOD_CONFIGURATION.find(p => p.id === periodId);

    if (!period) return [];

    return period.monthRange.map(monthValue => ({
      name: MONTHS_LIST.find(m => m.value === monthValue)?.label ?? 'Mes desconocido',
      month: monthValue,
      quantity: INIT_DROP.quantity
    }));
  }
}
