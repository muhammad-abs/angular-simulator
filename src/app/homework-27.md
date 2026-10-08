1. 1 экземпляр CounterService будет создан, потому что оба компонента запрашивают зависимость из одного Root инжектора 

2. Будет создано 2 экземпляра CounterService для каждого app-child Parent компонента, providedIn: 'root' посидит

3. ChildComponent получит экземпляр LoggerService из ParentComponent, потому что Angular ищет зависимость начиная с самого близкого инжектора и поднимается вверх по иерархии инжекторов, providedIn: 'root' посидит x2

4. экземпляров LoggerService существует 1, потому что инжектор ищет по токену LOGGER провайдер, находит, переиспользует LoggerService, так как у нас useExisting

5. При первом inject(), потому что при первом запросе к токену Injector найдет провайдер и по инструкции выполнит useFactory, сохранит значение, при последующих вызовах будет возвращаться к сохраненному значению

6. ['A', 'B'], потому что multi: true говорит собирать значения нескольких provider'ов одного токена в массив

7. приложение не упадет с ошибкой, потому что optional: true вернет null вместо ошибки

8. Приложение упадёт с ошибкой, потому что self: true говорит искать зависимость только в текущем injector'е. А в текущем injector'е LoggerService не зарегистрирован

9. Экземпляр родительского компонента будет получен, skipSelf: true пропускает текущий инжектор

10. Приложение упадет с ошибкой NullInjectorError: No provider for ApiService

11. Будет создан 1 экземпляр LoggerService, потому что оба инжекта запрашивают одну и ту же зависимость, которая зарегана в Root инжекторе

12.1 Существует 2 экземпляра LoggerService, один рутовый, другой компонента
12.2 HeaderComponent получит экземпляр который зареган у него элемент инжектором в компоненте
12.3 DashboardComponent поднимется по иерархии и получит рутовый экземпляр
12.4 UserCardComponent поднимется по иерархии и получит рутовый экземпляр
12.5 Element Injector UserCardComponent → Element Injector DashboardComponent → Element Injector AppComponent → Root/Environment Injector.

13. Чтобы создать A, Angular начинает выполнять его зависимости и так вплоть до создание экземпляра LoggerService, создается все в обратном порядке начиная с LoggerService, кешируется тоже начиная с LoggerService

14. Изначально существует 0 объектов в памяти, потому что сервисы зарегестрированы, но не созданы, после всех действий появится 3 объекта, потому что создано 3 сервиса

15.1 ApiService. providedIn: 'root', потому что ко всему приложению
15.2 AuthService. providedIn: 'root', потому что предоставляет несколько методов
15.3 CartService. providers компонента, потому что выполняет одно действие
15.4 ProductFilterService. providers роутинга, потому что связано с маршрутами
15.5 NotificationService. providedIn: 'root', потому что может быть использован во всем приложении
15.6 ThemeService. providedIn: 'root', меняем тему во всем приложении
15.7 DashboardStatisticsService. providers компонента, потому что одно действие
15.8 UserTableStateService. providers компонента, потому что используется только внутри страницы пользователей
15.9 ModalService. root, потому что может быть использован во всем приложении
15.10 LoggerService. useFactory, потому что должен че то отправлять, короче функция
15.11 AppConfig. InjectionToken, потому что конфиг
15.12 CurrencyFormatter. useValue, потому что хранит значение
15.13 AnalyticsService. useFactory, потому что есть условие, условие можно запухнуть в функцию