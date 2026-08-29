import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { IPost } from '../IPost';

@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);

  editingPost: IPost | null = null;

  editForm: FormGroup = this.fb.group({
    title: [''],
    tags: [''],
    views: [0],
  });

  ngOnInit(): void {
    this.editingPost = this.config.data ?? null;

    if (this.editingPost) {
      this.editForm.patchValue({
        title: this.editingPost.title,
        tags: this.editingPost.tags ? this.editingPost.tags.join(', ') : '',
        views: this.editingPost.views,
      });
    }
  }

  savePost(): void {
    if (this.editForm.invalid || !this.editingPost) return;

    const parsedTags: string[] = this.editForm.value.tags
      ? this.editForm.value.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0)
      : [];

    const updatedPost: IPost = {
      ...this.editingPost,
      title: this.editForm.value.title,
      tags: parsedTags,
      views: this.editForm.value.views,
    };

    this.ref.close(updatedPost);
  }

  closeDialog(): void {
    this.ref.close();
  }
  
}