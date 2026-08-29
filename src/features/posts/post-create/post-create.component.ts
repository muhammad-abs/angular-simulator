import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap, catchError, finalize, EMPTY } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PostService } from '../post.service';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private postService: PostService = inject(PostService);

  isSubmitting: boolean = false;

  createForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    userId: [1, [Validators.required, Validators.min(1)]],
    tagsString: [''],
    views: [0, [Validators.required, Validators.min(0)]],
    likes: [0],
    dislikes: [0],
  });

  onSubmit(): void {
    if (this.createForm.invalid) return;

    this.isSubmitting = true;
    const newPost: IPost = this.preparePostData();

    this.postService
      .createPost(newPost)
      .pipe(
        tap(() => {
          this.router.navigate(['/posts']);
        }),
        catchError(() => EMPTY),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe();
  }

  private preparePostData(): IPost {
    const parsedTags: string[] = this.createForm.value.tagsString
      ? this.createForm.value.tagsString
          .split(',')
          .map((tag: string) => tag.trim())
          .filter(Boolean)
      : [];

    return {
      id: 0,
      ...this.createForm.value,
      tags: parsedTags,
      reactions: {
        likes: this.createForm.value.likes,
        dislikes: this.createForm.value.dislikes,
      },
    };
  }
  
}