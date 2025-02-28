# FishEye - Plateforme pour Photographes

## Installation et Configuration

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (inclus avec Node.js)
- SASS installé globalement ou localement
- Un navigateur web moderne
- Un éditeur de code (VS Code recommandé)

### 1. Installation du projet

```bash
# Cloner le projet
git clone https://github.com/lanageuse/Front-End-Fisheye.git

# Accéder au répertoire
cd fisheye

# Installer les dépendances
npm install

# Installation globale de SASS (si pas déjà installé)
npm install -g sass

# Compiler et surveiller les changements SCSS
sass --watch scss/main.scss css/main.css

# Mode développement avec source maps
sass --watch scss/main.scss:css/main.css --style expanded

# Mode production (minifié)
sass scss/main.scss:css/main.css --style compressed
```
### 3. Scripts disponibles
```bash
# Linting JavaScript
npm run lint
npm run lint:fix
```