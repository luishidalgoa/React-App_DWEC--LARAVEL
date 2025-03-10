export interface Companies {
    id:            number;
    name:          string;
    address:       string;
    telephone:     string;
    email:         string;
    date_creation: Date;
    professor_id:     string | null;
    created_at:    Date;
    updated_at:    Date;
}