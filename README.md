# SmartModal (React)

Composant de modale React basé sur styled-components : animations douces, clic backdrop, touche Escape, positionnement flexible et bouton de fermeture inclus.

## Prérequis
- Node.js >= 18 et npm (testé avec npm 10+)
- React 18 ou 19 dans le projet hôte
- Editeur conseillé : VS Code ou tout IDE avec ESLint/Prettier

## Installation
```bash
npm install smart-modal-hrnet styled-components react react-dom
```
`react`, `react-dom` et `styled-components` sont déclarés en peerDependencies : ils doivent déjà être présents dans votre application.

## Utilisation rapide
```jsx
import { useState } from "react";
import { SmartModal } from "smart-modal-hrnet";

function DemoModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Ouvrir</button>
      <SmartModal
        open={open}
        onOpenChange={setOpen}
        onClose={() => console.log("fermé")}
        position="center"
        showBackdrop
        closeOnBackdropClick
        closeOnEsc
        showCloseButton
      >
        <p>Contenu de la modale</p>
      </SmartModal>
    </>
  );
}
```

## Props principales
- `open` (bool) : état contrôlé d'ouverture.
- `onOpenChange(isOpen)` (func) : synchronise l'état avec le parent.
- `onClose()` (func) : callback appelé à chaque fermeture.
- `position` (string) : `center` | `top-left` | `top-right` | `bottom-left` | `bottom-right` | `top-center` | `bottom-center`.
- `showBackdrop` (bool) : affiche le backdrop semi-transparent.
- `closeOnBackdropClick` (bool) : autorise la fermeture au clic backdrop.
- `closeOnEsc` (bool) : ferme avec la touche Escape.
- `showCloseButton` (bool) : affiche le bouton de fermeture.
- `rootClassName` / `contentClassName` / `backdropClassName` (string) : classes supplémentaires pour surcharger le style.
- `children` : contenu à rendre dans la modale.

## Développement local
- Installer les dépendances : `npm install`
- Lancer la démo Vite : `npm run dev`
- Build lib : `npm run build`
- Lint : `npm run lint`

## Publier sur npm
1) Connectez-vous : `npm login` (ou `npm adduser` si compte neuf).
2) Vérifiez le nom : `npm view smart-modal-hrnet version` (doit répondre 404 avant publication).
3) Build : `npm run build`.
4) Publiez : `npm publish --access public`.
5) L'URL attendue sera `https://www.npmjs.com/package/smart-modal-hrnet`.

### Si npm marque la publication comme spam/robot
- Complétez votre profil npm (avatar, bio) et évitez les descriptions vides.
- Attendez quelques minutes entre deux tentatives, ajoutez un README détaillé (c'est fait ici).
- Sinon, publiez sur GitHub Packages :
  1. Créez un Personal Access Token avec le scope `write:packages`.
  2. Ajoutez un `.npmrc` (ou `npm config set`) avec `//npm.pkg.github.com/:_authToken=<TOKEN>` et `@<votre-github>:registry=https://npm.pkg.github.com`.
  3. Ajustez `publishConfig.registry` si besoin, puis `npm publish`.

## Métadonnées du package
Le `package.json` expose `name`, `version`, `description`, `keywords`, `author`, `license`, `exports` ES/CJS, `engines` (Node >= 18) et les peerDependencies nécessaires.
