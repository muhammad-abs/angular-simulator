import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-task-three',
  imports: [],
  templateUrl: './task-three.component.html',
  styleUrl: './task-three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskThreeComponent implements DoCheck {
  
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  http: HttpClient = inject(HttpClient);
  url: string = 'https://jsonplaceholder.typicode.com/posts';
  
  count: number = 0;
  
  ngDoCheck(): void {
    console.log('Change Detection');
  }
  
  incrementCountAfterMarkForCheck(): void {
    this.count++;
    this.cdr.markForCheck();
  }
  
  /*
  
  часть 1 - markForCheck()
  1. после вызова markForCheck() мы пометили этот компонент для проверки ангуляру в след.цикле CD
  2. компонент не обновится, он помечен для проверки, после того как вызовется новый цикл CD интерфейс обновится
  3. Change Detection произошел после клика, и при следующем запуске цикла CD
  4. потому что он не помечен для обновления, у нас стратегия OnPush
  
  */
  
  incrementCountAfterDetect(): void {
    this.count++;
    this.cdr.markForCheck();
  }
  /*
  
  часть 2 - detectChanges()
  1. detectChanges() вызывает проверку сразу не ожидая следующего цикла CD
  2. да, CD выполняется немедленно
  3. проверяется компонент TaskThreeComponent и его дочерние компоненты
  4. detectChanges() использовать предпочтительнее, когда нам нужно вызвать CD только в этом компоненте и его дочерних компонентах
  
  */
 
  incrementCountAfterDetach(): void {
    this.cdr.detach();

    this.count++;

    setTimeout(() => {
      this.count++;
    }, 1000);

    const intervalId = setInterval(() => {
      this.count++;
      clearInterval(intervalId);
    }, 2000);

    Promise.resolve().then(() => {
      this.count++;
    });
  }
  
  /*
  
  часть 3 - detectChanges()
  1. интерфейс не обновляется
  2. ngDoCheck выполняется
  3. ангуляр перестал проверять компонент, потому что мы прописали detach
  4. все способы изменения значения работают, но проверка компонента на изменения игнорится
  
  */
 
  incrementCountAfterDetachAndReattach(): void {
    this.cdr.detach();

    this.count++;

    setTimeout(() => {
      this.count++;
    }, 1000);

    const intervalId = setInterval(() => {
      this.count++;
      clearInterval(intervalId);
    }, 2000);

    Promise.resolve().then(() => {
      this.count++;
    });
    
    this.cdr.reattach();
  }
  
  /*
  
  часть 4 - reattach()
  1. после reattach() интерфейс снова начал обновляться
  2. компонент снова начал участвовать в Change Detection после this.cdr.reattach();
  3. detectChanges() или markForCheck() вызывать не нужно
  
  */
  
}
