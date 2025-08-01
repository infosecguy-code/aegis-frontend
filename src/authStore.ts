import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    mustChangePassword: boolean;
    setAuth: (user: User, token: string, mustChangePassword: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    mustChangePassword: false,
    setAuth: (user, token, mustChangePassword) =>
        set({ user, token, mustChangePassword }),
    logout: () => set({ user: null, token: null, mustChangePassword: false }),
}));
