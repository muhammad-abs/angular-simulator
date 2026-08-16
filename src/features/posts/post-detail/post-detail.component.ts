import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    RouterLink,
    CardModule,
    TagModule,
    ButtonModule
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);

  post: IPost | null = null;

  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];
  }
  
}