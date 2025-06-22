export enum Routes {
    Analytics = '/analytics',
    Generate = '/generate',
    History = '/history',
    Home = '/',
}

export interface Stats {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: number;
    big_spent_at: number;
    less_spent_value: number;
    big_spent_value: number;
    average_spend_galactic: number;
    big_spent_civ: string;
    less_spent_civ: string;
    invalid_rows: number;
}

export enum ActionButtonStatus {
    Idle,
    Dragging,
    Generating,
    Loaded,
    Parsing,
    Generated,
    Success,
    Error,
}

export interface ProcessedItem {
    filename: string;
    date: string;
    success: boolean;
    data?: Stats;
}
