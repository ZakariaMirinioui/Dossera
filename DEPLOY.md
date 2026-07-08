# Déploiement — DOSSERA JAMS

## Prérequis

- **Node.js** >= 18
- **npm** >= 9
- **Surge.sh** (déploiement)

## 1. Installer Surge

```bash
npm install -g surge
```

Vérifier l'installation :

```bash
surge --version
```

## 2. Se connecter à Surge

```bash
surge login
```

Entrer votre email et mot de passe Surge. Si vous n'avez pas de compte, créez-en un à l'adresse [surge.sh](https://surge.sh).

## 3. Construire l'application

```bash
npm run build
```

Le build sera généré dans le dossier `dist/`.

## 4. Déployer

```bash
surge dist dossera-jams.surge.sh
```

Entrer votre mot de passe si demandé.

Le site sera accessible à : **https://dossera-jams.surge.sh**

## 5. Mettre à jour

Après des modifications, répéter les étapes 3 et 4 :

```bash
npm run build
surge dist dossera-jams.surge.sh
```

## 6. Domaine personnalisé (optionnel)

Pour utiliser `dossera.jams` comme domaine, configurer un enregistrement DNS :

### Avec un domaine personnalisé

```bash
surge dist dossera.jams
```

Surge vous demandera de configurer un enregistrement **CNAME** pointant vers `na-west1.surge.sh`.

### Configuration DNS

| Type | Nom | Cible |
|------|-----|-------|
| CNAME | `dossera.jams` | `na-west1.surge.sh` |

Cela peut prendre de quelques minutes à 48h pour se propager.

## 7. Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer le serveur de développement (Vite) |
| `npm run build` | Build de production |
| `surge list` | Lister tous les projets déployés |
| `surge teardown dossera-jams.surge.sh` | Supprimer le déploiement |
| `surge whoami` | Voir l'utilisateur connecté |

## 8. Fichiers importants

- `index.html` — Point d'entrée, métadonnées OG/Twitter
- `dist/` — Dossier de build généré
- `surge.json` (optionnel) — Configuration Surge (CORS, redirects, etc.)

## 9. Résolution de problèmes

- **Blanc ou erreur** : Vérifier que `npm run build` s'est bien terminé
- **404 sur les routes** : Surge ne gère pas les SPA par défaut. Ajouter un fichier `200.html` dans `dist/` pour le fallback :
  ```bash
  cp dist/index.html dist/200.html
  surge dist dossera-jams.surge.sh
  ```
- **CORS** : Créer un `surge.json` :
  ```json
  {
    "headers": {
      "/*": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  }
  ```
