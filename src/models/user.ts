// src/models/User.ts
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: Date | null;
    password: string;
    remember_token: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_secret: string | null;
    profile_photo_url: string | null;
    created_at: Date;
    updated_at: Date;
    access_token: string;
    token_type: string;
}
