import type { User } from '@scripts/api/users/types';

export interface UsersState {
	isLoggedIn: boolean;
	userData: User | null;
}
