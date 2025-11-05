export interface GoogleUserInfo {
    email: string;
    name: string;
    picture: string;
    id: string;
}

export interface UserSlice {
    uid: string;
    analyticsEnabled: boolean;
    isAuthenticated: boolean;
    googleUser: GoogleUserInfo | null;
}
