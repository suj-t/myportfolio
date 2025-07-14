import { NgFor } from '@angular/common';
import { Component,HostListener} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [NgFor],
  templateUrl: './hero-section.component.html',
  styleUrls: [
    './hero-section.component.css',
    '../../shared/common.css'
  ]
})
export class HeroSectionComponent {
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const trail = document.querySelector('.neon-trail') as HTMLElement;
    const bubble = document.querySelector('.bubble-follow') as HTMLElement;

    if (trail) {
      trail.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    }

    if (bubble) {
      bubble.style.transform = `translate(${e.clientX - 80}px, ${e.clientY - 80}px)`;
    }
  }

  ngAfterViewInit() {
    this.initFallingStars();
  }

  initFallingStars() {
    const canvas = document.querySelector('.stars-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; size: number; speed: number }[] = [];

    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 2 + 0.5
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowColor = '#0ff';
      ctx.shadowBlur = 10;

      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      }

      requestAnimationFrame(drawStars);
    }

    drawStars();

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
  }
}
