import { MonthOption, PeriodConfig } from "../../domain/interfaces";

export const MONTHS_LIST: MonthOption[] = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

export const PERIOD_CONFIGURATION: PeriodConfig[] = [
    {
        id: 1,
        label: 'Periodo 1',
        monthRange: [1, 2, 3, 4, 5, 6]
    },
    {
        id: 2,
        label: 'Periodo 2',
        monthRange: [7, 8, 9, 10, 11, 12]
    }
];