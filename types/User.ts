export enum UserRole {
  User = 'User',
  AdminUser = 'AdminUser',
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
} 