import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DoCheck, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-task-two',
  imports: [],
  templateUrl: './task-two.component.html',
  styleUrl: './task-two.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class TaskTwoComponent implements DoCheck{
  
  http: HttpClient = inject(HttpClient);
  url: string = 'https://jsonplaceholder.typicode.com/posts';
  
  count: number = 0;
  
  ngDoCheck(): void {
    console.log('Change Detection');
  }
  
  incrementCount(): void {
    this.count++;
  }
  
  /*
  
  сценарий 1 - обычный метод
  1. обновился автоматически
  2. 1 раз выполнился ngDoCheck()
  3. ChangeDetectorRef не понадобился
  4. обработчик события click()
  
  */
  
  incrementCountAfterTimeout(): void {
    setTimeout(() => {
      this.count++;
    }, 1000);
  }
  
  /*
  
  сценарий 2 - setTimeout
  1. обновился автоматически после таймера
  2. 2 раза выполнился ngDoCheck(), первый после click(), второй после окончания таймера
  3. ChangeDetectorRef не понадобился
  4. асинхронная операция setTimeout()
  
  */
  
  incrementCountAfterPromise(): void {
    console.log('До Promise');
    new Promise<void>((resolve) => {
      resolve();
    }).then(() => {
      console.log('Внутри then');
      this.count++;
    });
  }
  
  /*
  
  сценарий 3 - Promise
  1. обновился автоматически
  2. 1 раза выполнился ngDoCheck() после click()
  3. ChangeDetectorRef не понадобился
  4. callback then()
  
  */
  
incrementCountAfterRequest(): void {
  this.http
    .get(this.url).pipe(
      tap(() => {
        this.count++;
      })
    ).subscribe();
  }
  
  /*
  
  сценарий 4 - HttpRequest
  1. обновился автоматически
  2. 3 раза выполнился ngDoCheck(), первый после click, второй после того как был отправлен запрос, третий после получения ответа
  3. ChangeDetectorRef не понадобился
  4. событие click, отправка и получение http ответа
  
  */
  
  // сценарий 5
  incrementCountAfterInterval(): void {
    setInterval(() => {
      this.count++;
    }, 1000);
  }
  
  /*
  
  сценарий 5 - Interval
  1. обновился автоматически
  2. первый при клике, последующие при каждом тике таймера
  3. ChangeDetectorRef не понадобился
  4. событие click, callback setInterval()
  
  */
  
  incrementCountMultiple(): void {
    this.count++;
    
    new Promise<void>((resolve) => {
      resolve();
    }).then(() => {
      this.count++;
    });
    
    setTimeout(() => {
      this.count++;
    }, 1000);
  }
  
  /*
  
  сценарий 6 - Multiple
  1. обновился автоматически
  2. первый при клике, второй при Promise, третирй при setTimeout()
  3. ChangeDetectorRef не понадобился
  4. событие click, callback Promise и setTimeout()
  
  */
  
}
