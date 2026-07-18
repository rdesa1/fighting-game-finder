export interface Local {
     id: number;
     name: string;
     country: string;
     subnational: string;
     metro_area: string;
     venue: string;
     address: string;
     latitude: number | null;
     longitude: number | null;
     frequency: string;
     day: string;
     event_type: string;
     status: string;
}