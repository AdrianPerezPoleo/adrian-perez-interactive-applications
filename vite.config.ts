import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/adrian-perez-interactive-applications/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hangman: resolve(__dirname, 'src/games/hangman/perez-poleo-adrian-hangman.html'),
        puzzle: resolve(__dirname, 'src/games/8-puzzle/perez-poleo-adrian-8-puzzle.html'),
        balatro: resolve(__dirname, 'src/games/balatro/perez-poleo-adrian-balatro.html'),
        
        trapezoidal: resolve(__dirname, 'src/visualizers/trapezoidal-rule/perez-poleo-adrian-trapezoidal-rule.html'),
        projectile: resolve(__dirname, 'src/visualizers/projectile-animation/perez-poleo-adrian-projectile-animation.html'),
        lissajous: resolve(__dirname, 'src/visualizers/lissajous-curves/perez-poleo-adrian-lissajous-curves.html'),
        
        umlMenu: resolve(__dirname, 'docs/uml/index.html'),
        umlBalatro: resolve(__dirname, 'docs/uml/uml-balatro.html'),
        umlHangman: resolve(__dirname, 'docs/uml/uml-hangman.html'),
        umlLissajous: resolve(__dirname, 'docs/uml/uml-lissajous.html'),
        umlProjectile: resolve(__dirname, 'docs/uml/uml-projectile.html'),
        umlTrapezoidal: resolve(__dirname, 'docs/uml/uml-trapezoidal.html'),
      },
    },
  },
});