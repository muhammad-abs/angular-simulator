import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { IPost } from '../IPost';
import { IPostResponse } from '../IPostResponse';
import { PostService } from '../post.service';
import { MessageService } from '../../../services/message.service';

import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  providers: [DialogService],
  imports: [TableModule, ContextMenuModule, SkeletonModule, ButtonModule, RouterLink, AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private messageService: MessageService = inject(MessageService);

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  posts$: Observable<IPostResponse | null> = this.postService.posts$;

  pageSize: number = 10;
  currentPage: number = 1;
  totalElements: number = 0;
  first: number = 0;

  posts: IPost[] = [];
  skeletonRows: unknown[] = [];
  selectedContextPost: IPost | null = null;
  contextMenuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.loadPostsPage();
    this.initContextMenu();

    this.postService.posts$
      .pipe(
        takeUntilDestroyed(),
        tap((data: IPostResponse | null) => {
          if (data) {
            this.posts = data.posts;
            this.totalElements = data.total;
            this.cd.markForCheck();
          }
        }),
      )
      .subscribe();
  }

  initContextMenu(): void {
    this.contextMenuItems = [
      {
        label: 'Просмотр',
        icon: 'pi pi-fw pi-search',
        command: () => this.viewPost(),
      },
      {
        label: 'Редактировать',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.openEditDialog(),
      },
      {
        label: 'Удалить',
        icon: 'pi pi-fw pi-trash',
        command: () => this.deletePost(),
      },
    ];
  }

  loadPostsPage(): void {
    this.isLoadingSubject.next(true);
    this.skeletonRows = Array.from({ length: this.pageSize }).map((_, i) => `Item #${ i }`);

    const skip: number = (this.currentPage - 1) * this.pageSize;

    this.postService
      .showPosts(this.pageSize, skip)
      .pipe(
        tap((response: IPostResponse) => {
          this.posts = response.posts;
          this.totalElements = response.total;
        }),
        catchError(() => {
          this.messageService.showError('Не удалось загрузить посты');
          return EMPTY;
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
          this.cd.markForCheck();
        }),
      )
      .subscribe();
  }

  onPageChange(event: TablePageEvent): void {
    this.pageSize = event.rows;
    this.first = event.first;
    this.currentPage = event.first / event.rows + 1;
    this.loadPostsPage();
  }

  viewPost(): void {
    if (this.selectedContextPost) {
      this.router.navigate(['/posts', this.selectedContextPost.id]);
    }
  }

  onRowDoubleClick(post: IPost): void {
    this.router.navigate(['/posts', post.id]);
  }

  openEditDialog(): void {
    if (!this.selectedContextPost) return;

    const ref: DynamicDialogRef<PostEditDialogComponent> | null = this.dialogService.open(
      PostEditDialogComponent,
      {
        header: 'Редактировать пост',
        width: '500px',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: this.selectedContextPost,
      },
    );

    ref?.onClose
      .pipe(
        tap((updatedPost: IPost | undefined) => {
          if (updatedPost) {
            this.onSaveEditedPost(updatedPost);
          }
        }),
      )
      .subscribe();
  }

  onSaveEditedPost(updatedPost: IPost): void {
    this.postService
      .updatePost(updatedPost)
      .pipe(
        catchError(() => {
          this.messageService.showError('Не удалось обновить пост');
          return EMPTY;
        }),
        finalize(() => {
          this.cd.markForCheck();
        }),
      )
      .subscribe();
  }

  deletePost(): void {
    if (!this.selectedContextPost) return;

    const idToDelete: number = this.selectedContextPost.id;

    this.postService
      .deletePostById(idToDelete)
      .pipe(
        catchError(() => {
          this.messageService.showError('Не удалось удалить пост');
          return EMPTY;
        }),
        finalize(() => {
          this.selectedContextPost = null;
          this.cd.markForCheck();
        }),
      )
      .subscribe();
  }

}
