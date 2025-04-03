import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export type UserRole = 'client' | 'mechanic' | 'staff';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    const mockData = [
      {
        id: '1',
        email: 'client@test.com',
        password: 'password',
        role: 'client' as UserRole,
      },
      {
        id: '2',
        email: 'mechanic@test.com',
        password: 'password',
        role: 'mechanic' as UserRole,
      },
      {
        id: '3',
        email: 'staff@test.com',
        password: 'password',
        role: 'staff' as UserRole,
      },
    ];
    // TODO: Make an HTTP request to the backend
    const user = mockData.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return new Observable((subscriber) => {
      // Simulate API call
      setTimeout(() => {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        subscriber.next(user);
        subscriber.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
