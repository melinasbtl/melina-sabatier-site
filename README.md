# Dossier images/

Place ici toutes tes images de projet.

## Nommage des fichiers

Chaque projet dans `index.html` utilise une image nommée ainsi :

| Fichier          | Projet dans index.html |
|------------------|------------------------|
| `project-01.jpg` | Projet 1 — Editions    |
| `project-02.jpg` | Projet 2 — Identities  |
| `project-03.jpg` | Projet 3 — Motion      |
| `project-04.jpg` | Projet 4 — Exhibitions |
| `project-05.jpg` | Projet 5 — Media       |

## Pour ajouter un nouveau projet

1. Dépose ton image ici sous le nom `project-06.jpg` (ou `.png`, `.webp`)
2. Dans `index.html`, copie un bloc `<article class="project">` existant,
   change `data-category`, le `src` de l'image, les textes de description,
   et les `<span class="meta-*">` dans `.project-meta`.

## Formats recommandés
- `.jpg` ou `.webp` pour les photos (compression optimale)
- `.png` si transparence nécessaire
- Largeur conseillée : 2400px minimum pour une qualité correcte sur grands écrans
- Ratio conseillé : 16/9 (ou proche) — le site s'adapte au ratio de l'image

## Structure du dossier

```
portfolio/
├── index.html
├── style.css
├── script.js
└── images/
    ├── project-01.jpg
    ├── project-02.jpg
    ├── project-03.jpg
    ├── project-04.jpg
    └── project-05.jpg
```
