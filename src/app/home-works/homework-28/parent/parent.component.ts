import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  
  user = {
    name: 'Alex',
    age: 20
  };
  
  changeName() {
    this.user = {
      ...this.user, 
      name: 'Eugene'
    };
  }
  
  // интерфейс не обновляется, потому что во-первых используется стратегия onPush, во-вторых ссылка на объект не поменялась, в итоге это приводит к тому что Ангуляр не проверяет этот компонент на изменения
  
  // способы исправления: 
  // первый: поменять стратегию на Default, что в итоге приведет к тому, что все компоненты проверятся
  // второй: не мутировать объект, а перезаписать в новый с помощь spread оператора, Ангуляр увидит что появился новый объект в компоненте, проверит компонент и перезапишет значение на новое
  
}
