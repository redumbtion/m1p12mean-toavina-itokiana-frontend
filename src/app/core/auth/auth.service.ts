import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';

export type UserRole = 'client' | 'mechanic' | 'manager';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router, private httpService: HttpService) {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return new Observable((subscriber) => {
      this.httpService
        .post<LoginResponse>('/auth/login', { email, password })
        .then((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          subscriber.next(response.user);
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  register(form: RegisterForm): Observable<void> {
    return new Observable((subscriber) => {
      this.httpService
        .post<void>('/auth/register', form)
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
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
