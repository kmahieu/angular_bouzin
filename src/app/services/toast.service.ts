import { Injectable } from '@angular/core';
import { Toast } from '../toast.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];
  delay = 6000;

  subject = new BehaviorSubject<Toast[]>(this.toasts);
  toasts$ = this.subject.asObservable();

}
