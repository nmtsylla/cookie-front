import { Kookie } from './kookie';

export class Website {
  id: number;
  url: string;
  weeklyScanDay: string;
  scanSchedule: number;
  addedDate: string;
  lastScanned: string;
  customerId: number;
  active: boolean;
  kookies?: Kookie[];
}
