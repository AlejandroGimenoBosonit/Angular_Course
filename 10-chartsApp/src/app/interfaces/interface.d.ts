export interface DataCollection {
    labels:   string[];
    datasets: Dataset[];
}

export interface Dataset {
    label:       string;
    data:        number[];
    fill?:        boolean;
    borderColor?: string;
    tension?:     number;
    backgroundColor: string | string[];
    hoverBackgroundColor: string[];
}
