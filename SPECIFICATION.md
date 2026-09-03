# Technital Libreville — Spécification technique du prototype

Document de référence décrivant l'intégralité de la maquette : architecture, données,
composants, comportements, build et déploiement. Rédigé pour permettre à un
intervenant (humain ou assistant) de reprendre le projet sans le découvrir par lecture
exhaustive du code.

- **Dépôt** : https://github.com/Eetff4422/tnt
- **Site publié** : https://eetff4422.github.io/tnt/
- **Nature** : prototype front-end uniquement. Aucun backend, aucune base de données,
  aucune transaction réelle. Toutes les données sont statiques et vivent dans `src/data/`.

---

## 1. Produit

Le prototype présente **deux produits distincts dans une seule application React** :

1. **Un site vitrine public** — présentation de l'entreprise, tarifs, prise de rendez-vous,
   vérification d'attestation, actualités.
2. **Une application de gestion** — accessible via une connexion, avec **trois profils**
   disposant chacun de son interface : automobiliste, agent de contrôle, Mairie.

La maquette de téléphone présente la **déclinaison mobile de cette même application de
gestion**. Elle n'est pas un produit séparé.

### Contexte métier

Technital est un cabinet d'expertise et de contrôle technique automobile situé au
Boulevard de l'Indépendance, quartier des Trois Quartiers, à Libreville (Gabon). Il opère
en convention avec la Mairie de Libreville pour l'inspection des véhicules de transport
public et commercial.

- Horaires : lundi–vendredi 07h30–15h30, samedi 08h00–12h00, dimanche fermé.
- Téléphone utilisé sur le site : 066 85 60 46.
  *(Un annuaire en ligne mentionne un autre numéro, (+241) 01 72 80 99, et la boîte postale
  BP 20024. Non intégré au site faute de confirmation.)*
- Technital n'a **ni email public, ni site web, ni réseau social** identifiable. La page
  Contact prévoit des emplacements inactifs plutôt que des coordonnées inventées.

### Parcours de la visite technique (3 étapes)

1. Contrôle administratif au guichet (pièces + concordance du numéro de châssis).
2. Passage sur bancs de test (freinage, parallélisme, suspensions).
3. Inspection visuelle sur fosse (structure, carrosserie, éléments mécaniques inférieurs).

### Grille tarifaire (barèmes du Ministère des Transports)

| Catégorie | Identifiant interne | Tarif |
|---|---|---|
| Véhicule léger / particulier | `leger` | 16 000 FCFA |
| Utilitaire, taxi ou minibus | `taxi` | 16 000 – 19 000 FCFA |
| Poids lourd / gros porteur | `poids-lourd` | 19 000 – 22 000 FCFA |

Contre-visite à tarif réduit après réparation.

---

## 2. Stack

| Élément | Version | Rôle |
|---|---|---|
| React | 18.3.1 | Composants fonctionnels, hooks uniquement |
| Vite | 5.4.x | Build et serveur de développement |
| react-router-dom | 7.18.x | Routage client |
| Tailwind CSS | 3.4.x | Styles, `darkMode: 'class'` |
| lucide-react | 0.462.x | Icônes |
| qrcode.react | 4.2.x | QR code de confirmation de rendez-vous |
| gh-pages | 6.3.x | Publication sur la branche `gh-pages` |

JavaScript, pas TypeScript. Aucune librairie d'état global : `useState`, `useMemo`,
`useEffect` et un `Context` unique pour la session.

### Scripts npm

```
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualisation du build
npm run deploy   # build + publication sur la branche gh-pages
```

---

## 3. Arborescence

```
├── index.html                  meta SEO/Open Graph + script anti-flash de thème
├── vite.config.js              base conditionnelle, plugin de repli 404 + .nojekyll
├── tailwind.config.js          palette primary, darkMode: 'class', ombre "phone"
├── postcss.config.js
├── public/
│   ├── favicon.svg             marque complète (hexagone + T + coche)
│   ├── logo-technital.svg      logo autonome, fond clair
│   └── logo-technital-fond-sombre.svg
└── src/
    ├── main.jsx                BrowserRouter > AuthProvider > App
    ├── App.jsx                 layout + table de routage
    ├── index.css               directives Tailwind, focus visible, styles d'impression
    ├── context/
    │   └── AuthContext.jsx     session simulée, persistée en localStorage
    ├── hooks/
    │   └── useInView.js        IntersectionObserver, déclenchement unique
    ├── utils/
    │   └── constants.js        STATUT_STYLES, CONTROLE_STYLES, CATEGORIE_ICONS
    ├── data/                   10 fichiers, toutes les données simulées
    ├── components/
    │   ├── ui/                 Badge, Button, Card, CountUp, Logo, Reveal,
    │   │                       SectionTitle, ThemeToggle
    │   ├── layout/             Navbar, Footer, MenuUtilisateur, RouteProtegee,
    │   │                       ScrollRestoration
    │   ├── site/               14 sections du site vitrine
    │   ├── mobile-app/         8 composants de la maquette téléphone
    │   └── espace/
    │       └── EnteteEspace.jsx
    └── pages/
        ├── Home.jsx, APropos.jsx, NosServices.jsx, Actualites.jsx,
        │   ActualiteDetail.jsx, VisionProduit.jsx, Contact.jsx,
        │   ApplicationMobile.jsx, Connexion.jsx, NotFound.jsx
        └── espace/
            └── Espace.jsx, EspaceAutomobiliste.jsx, EspaceAgent.jsx, EspaceMairie.jsx
```

---

## 4. Routage

Défini dans `src/App.jsx`. `basename` vaut `import.meta.env.BASE_URL` (`/` en local,
`/tnt/` en production).

| Route | Composant | Accès |
|---|---|---|
| `/` | `Espace` si session, sinon `Home` | public / conditionnel |
| `/vitrine` | `Home` | public — accueil vitrine forcé, utilisé par « Retour au site » |
| `/services` | `NosServices` | public |
| `/a-propos` | `APropos` | public |
| `/actualites` | `Actualites` | public |
| `/actualites/:slug` | `ActualiteDetail` | public — redirige vers la liste si slug inconnu |
| `/vision` | `VisionProduit` | public |
| `/application-mobile` | `ApplicationMobile` | public |
| `/contact` | `Contact` | public |
| `/connexion` | `Connexion` | public — redirige vers `/` si déjà connecté |
| `/espace` | `Espace` via `RouteProtegee` | connecté |
| `*` | `NotFound` | public |

`App` retourne `null` tant que `pretsAAfficher` est faux, afin de ne pas afficher
brièvement la vitrine à un utilisateur dont la session est en cours de restauration.

### ScrollRestoration

`components/layout/ScrollRestoration.jsx` écoute `useLocation()`. À chaque changement :
si l'URL porte un hash et que l'élément existe, `scrollIntoView({ behavior: 'smooth' })` ;
sinon `window.scrollTo({ top: 0 })`. Nécessaire car React Router ne traite pas les ancres
lors d'une navigation côté client.

---

## 5. Authentification simulée

`src/context/AuthContext.jsx` — aucun serveur, aucune vérification de mot de passe.

```js
{
  utilisateur,        // objet profil ou null
  estConnecte,        // booléen
  pretsAAfficher,     // false tant que la restauration localStorage n'a pas eu lieu
  connecter(profilId),// résout le profil, le stocke, retourne l'objet ou null
  deconnecter(),      // vide l'état et le stockage
}
```

- Clé de stockage : `technital-session`, contenant l'identifiant du profil.
- Tous les accès à `localStorage` sont enveloppés dans `try/catch` (navigation privée,
  stockage désactivé).
- `RouteProtegee` attend `pretsAAfficher` avant de rediriger, sinon un rafraîchissement
  sur `/espace` éjecterait l'utilisateur.

### Page de connexion (`pages/Connexion.jsx`)

Trois boutons de profil au-dessus des champs. La sélection alimente les deux champs
`identifiant` et `motDePasse`, tous deux `readOnly` : la démonstration ne demande aucune
saisie. Le bouton « Connexion » applique un `setTimeout` de 700 ms (crédibilité), appelle
`connecter()` puis `navigate('/', { replace: true })`. Un encart précise qu'aucun compte
réel n'est utilisé.

---

## 6. Modèle de données

Tout est statique, dans `src/data/`. Aucune donnée n'est écrite ou persistée hors session.

### `profils.js`
```js
PROFILS: [{ id, role, nom, fonction, identifiant, motDePasse, icone, description }]
// id: 'automobiliste' | 'agent' | 'mairie'
// icone: nom lucide résolu par table locale ('Car' | 'ClipboardCheck' | 'Landmark')
getProfil(id)
```
Comptes : `jean.ndong` (Jean Ndong), `agent.mbina` (Sylvie Mbina), `mairie.transports`
(Direction des Transports). Mot de passe factice commun : `demo1234`.

### `tarifs.js`
```js
CATEGORIES: [{ id, label, labelLong, icon, tarifMin, tarifMax, description }]
PIECES_REQUISES: [{ id, label, icon }]   // carte grise, assurance, TVM, ancienne attestation
formatFCFA(montant)                      // "16 000 FCFA", séparateur fr-FR
getCategorie(id)                         // repli sur CATEGORIES[0]
```

### `pointsControle.js`
```js
ETAPES_VISITE: [{ id, titre, description, icon }]        // les 3 étapes de la visite
POINTS_CONTROLE_PAR_CATEGORIE: { leger: [...], taxi: [...], 'poids-lourd': [...] }
```
Le nombre de points croît avec la catégorie (5 / 6 / 7).

### `creneaux.js`
```js
CRENEAUX: [{ heure, complet }]   // 11 créneaux de 07h30 à 15h00, pas de 45 min
```
Deux créneaux sont marqués `complet: true` pour rendre la démonstration crédible.

### `vehicules.js`
```js
VEHICULES_FLOTTE: [{ id, nom, immatriculation, categorie, statut, dateExpiration }]
// statut: 'valide' | 'expire_bientot' | 'expire'
```
Quatre véhicules : taxi Corolla (valide), camion Isuzu (expire bientôt), minibus Hiace
(expiré), Renault Clio (valide).

### `attestations.js`
```js
rechercherAttestation(immatriculation)  // normalise (trim, majuscules, espaces) -> objet ou null
EXEMPLE_IMMATRICULATION                 // 'LBV 4521 GA', proposée en placeholder
// retour: { statut, dateVisite, dateExpiration, categorie }
```
Quatre immatriculations connues couvrant les trois statuts ; toute autre saisie retourne
`null`, ce qui déclenche l'état « non trouvé ».

### `historique.js`
```js
HISTORIQUE_VISITES: [{ id, vehicule, immatriculation, date, resultat, montant }]
// resultat: 'conforme' | 'contre_visite'
RESULTAT_STYLES: { conforme: {...}, contre_visite: {...} }  // label + classes Tailwind
```

### `fileInspection.js`
```js
FILE_INSPECTION: [{ id, creneau, immatriculation, vehicule, categorie, proprietaire, etat }]
// etat: 'termine' | 'en_cours' | 'attente'
ETATS_FILE: { termine, en_cours, attente }     // label + classes
DERNIERS_CONTROLES: [{ id, heure, immatriculation, categorie, resultat }]
// resultat: 'conforme' | 'avertissement' | 'non_conforme'
```

### `stats.js`
```js
STATS_JOUR: {
  vehiculesControles: 47,
  objectifJournalier: 60,
  tauxConformite: 82,
  repartition: [{ categorie, controles, conformes }]   // Taxis, Minibus, Bus urbains
}
```

### `actualites.js`
```js
ACTUALITES: [{ slug, titre, date, categorie, extrait, contenu: [paragraphes] }]
getActualiteBySlug(slug)
formatDateArticle(dateISO)   // toLocaleDateString('fr-FR', { day, month: 'long', year })
```
Quatre articles originaux : préparation au contrôle, TVM, sécurité des transports urbains,
ouverture du samedi.

### `utils/constants.js`
```js
STATUT_STYLES    // valide / expire_bientot / expire -> { label, text, bg, border, dot, solid }
CONTROLE_STYLES  // conforme / avertissement / non_conforme -> { label, active, icon }
CATEGORIE_ICONS  // { leger: 'Car', taxi: 'Bus', 'poids-lourd': 'Truck' }
```
Ces tables portent le **vocabulaire de statut commun** au site, à la maquette mobile et
aux espaces connectés. Les icônes sont stockées sous forme de chaînes, résolues par une
table locale dans chaque composant consommateur.

---

## 7. Design system

### Palette

`tailwind.config.js` étend une seule rampe, `primary`, un bleu industriel de `50` à `950`
(`600: #1f5590`, `700: #1a4474`, `800: #173a61`, `900: #142f4f`). Les statuts s'appuient sur
la palette Tailwind par défaut, sans alias :

| Sens | Couleur |
|---|---|
| Conformité, validité | `emerald` |
| Avertissement, expiration proche | `amber` |
| Non-conformité, expiration | `red` |
| Neutre, texte, fonds sombres | `slate` |

Une ombre personnalisée `shadow-phone` est définie pour la coque du téléphone.

### Composants `ui/`

| Composant | API | Note |
|---|---|---|
| `Button` | `variant` (`primary`, `secondary`, `ghost`, `light`, `outline`), `icon`, `as` | `as` permet `Link` ou `a` ; les props restantes sont transmises |
| `Card` | `className` | Conteneur arrondi. **Ne jamais lui passer une classe `bg-*` conflictuelle** : son `bg-white` peut l'emporter selon l'ordre CSS |
| `Badge` | `className`, `icon`, `dotClassName` | Reçoit les classes issues de `STATUT_STYLES` |
| `SectionTitle` | `eyebrow`, `title`, `description`, `align`, `sombre` | `sombre` force l'encre claire sur les sections foncées dans les deux thèmes |
| `Logo` | `className`, `ton` (`marque`, `clair`, `mono`), `avecCoche` | SVG original, hexagone + monogramme T + coche |
| `Reveal` | `delay`, `className` | Apparition au scroll via `useInView` |
| `CountUp` | `valeur`, `suffixe`, `duree` | Animation `requestAnimationFrame`, easing cubique |
| `ThemeToggle` | `className` | Bascule la classe `dark` sur `<html>`, mémorise dans `localStorage` |

### Thème sombre

- `darkMode: 'class'`, classe posée sur `<html>`.
- Un script inline dans `index.html` applique le thème **avant le premier rendu** en lisant
  `technital-theme` puis `prefers-color-scheme`, ce qui évite tout flash.
- Le conteneur racine dans `App.jsx` porte `bg-white dark:bg-slate-950`. **Point de
  vigilance** : sans la variante sombre, ce conteneur peint du blanc derrière toutes les
  sections sans fond propre, rendant invisibles les titres blancs.
- `InfosPratiques` est sombre dans les deux thèmes ; ses cartes sont stylées en dur, pas
  via `Card`, et son titre utilise `SectionTitle sombre`.

---

## 8. Site vitrine

### `pages/Home.jsx` — ordre des sections

`HeroSection` → `PartenairesBand` → `ChiffresCles` → `SimulateurVisite` → `PriseRdv` →
`VerificateurAttestation` → `AppMobileShowcase` → `Temoignages` → `Faq` → `InfosPratiques`.

Le formulaire de contact ne figure **pas** sur l'accueil : il vit sur `/contact`. Le
formulaire de rendez-vous, lui, est présent aux deux endroits (choix assumé, parcours court).

### Sections

- **`HeroSection`** — ancre `#accueil`. Titre, deux appels à l'action, `AffluenceIndicator`,
  et `HeroIllustration` (SVG original : véhicule sur pont élévateur, pastilles de conformité,
  cadran de banc de test), masquée sous `lg`.
- **`AffluenceIndicator`** — pastille + texte d'attente. Trois niveaux préréglés, rotation
  toutes les 20 s via `setInterval`, animation `animate-ping`. Entièrement simulé.
- **`PartenairesBand`** — quatre mentions institutionnelles **en texte** (Mairie, Ministère
  des Transports, centre agréé, localisation). Aucun emblème officiel reproduit.
- **`ChiffresCles`** — quatre `CountUp` sous `Reveal`, valeurs de démonstration.
- **`SimulateurVisite`** — ancre `#simulateur`. Sélecteur de catégorie piloté par
  `CATEGORIES` ; affiche tarif, `PIECES_REQUISES`, `ETAPES_VISITE` et les points de contrôle
  de la catégorie choisie.
- **`PriseRdv`** — ancre `#rdv`. Formulaire (nom, téléphone, immatriculation, catégorie,
  date, créneau). Le jour de la semaine est déduit de la date : **dimanche désactive le
  sélecteur**, **samedi filtre les créneaux au-delà de 12h00** (comparaison en minutes via
  un utilitaire local `toMinutes`). À la soumission : génération d'une référence
  `RDV-XXXXX`, **QR code** encodant `TECHNITAL|référence|immatriculation|date heure`, et
  bouton d'impression. La carte porte la classe `zone-impression`, les actions la classe
  `sans-impression`, exploitées par les règles `@media print` de `index.css`.
- **`VerificateurAttestation`** — ancre `#verification`. Recherche dans `attestations.js`.
  Trois états : trouvé (carte colorée par statut), `null` (message « non trouvée »),
  `undefined` (aucune recherche effectuée).
- **`AppMobileShowcase`** — ancre `#app-mobile`. Argumentaire trois profils, mentions
  « Bientôt sur iOS / Android » en boutons neutres (**aucun badge officiel de store
  reproduit**), et `MaquetteMobile`.
- **`Temoignages`** — trois avis de démonstration, notation en étoiles.
- **`Faq`** — ancre `#faq`. Accordéon à ouverture unique, cinq questions.
- **`ContactForm`** — ancre `#contact-form`. Validation locale, confirmation simulée.
- **`InfosPratiques`** — ancre `#contact`. Horaires, adresse, téléphone, carte
  **OpenStreetMap en iframe** (aucune clé d'API), encart conseil, bouton vers `/contact`.

### Pages de contenu

- **`APropos`** — mission, rôle institutionnel, chiffres, valeurs.
- **`NosServices`** — développement des trois catégories, parcours de visite, pièces à fournir.
- **`Actualites` / `ActualiteDetail`** — liste puis article ; slug inconnu → `Navigate` vers
  la liste.
- **`VisionProduit`** — feuille de route en quatre phases (livré / prochaine étape /
  planifié), utile en présentation commerciale.
- **`Contact`** — coordonnées, carte, **trois emplacements en pointillés inactifs**
  (e-mail, Facebook, WhatsApp) marqués « à communiquer / à créer / à confirmer », puis
  `ContactForm` et `PriseRdv`.
- **`ApplicationMobile`** — maquette en grand (`sticky` sur grand écran), trois profils,
  atouts du mobile (rappels, Mobile Money, saisie hors réseau), lien vers `/connexion`.
- **`NotFound`** — page 404 stylée.

---

## 9. Maquette mobile

`components/mobile-app/` — simulateur de téléphone, réutilisé sur l'accueil et sur
`/application-mobile` via `MaquetteMobile.jsx`, qui porte tout l'état (connexion, onglet
actif, notification).

- **`PhoneFrame`** — coque. Props : `children`, `tabBar`, `overlay`, `pleinEcran`.
  **Détail technique important** : le bezel porte la classe `transform`, ce qui en fait le
  bloc conteneur des descendants en `position: fixed`. Les feuilles modales et la
  notification utilisent donc `fixed inset-0` et restent **confinées à l'écran du
  téléphone**, en échappant au `overflow-y-auto` de la zone de contenu.
- **`LoginScreen`** — écran d'accueil de l'app mobile, bouton de connexion simulé (900 ms).
- **`TabBar`** — trois onglets (Ma Flotte, Inspection, Mairie).
- **`ClientFlotteView`** — bascule « Mes véhicules » / « Historique ». Paiement Mobile Money
  en feuille basse : choix Airtel / Moov (**pastilles colorées, pas de logos de marque**),
  état « en cours » puis « confirmé » via `setTimeout`.
- **`AgentInspectionView`** — scan de plaque simulé, checklist des quatre points majeurs
  (Freinage, Suspension, Pneumatiques, Châssis) en sélecteur trois états, pièce jointe via
  un **vrai `<input type="file">`** avec aperçu `URL.createObjectURL`, validation calculant
  le statut global (le pire l'emporte).
- **`MairieStatsView`** — tuiles de statistiques et jauges.
- **`NotificationPush`** — notification simulée en surimpression, animation d'entrée par
  keyframes injectées localement.

---

## 10. Espace connecté

`EnteteEspace` fournit le bandeau commun (titre, sous-titre, actions). `Espace.jsx`
aiguille vers l'interface du profil via une table `INTERFACES`.

### Automobiliste (`EspaceAutomobiliste.jsx`)
Salutation personnalisée, compteur de véhicules à renouveler, bandeau d'alerte listant les
immatriculations concernées, grille de cartes véhicules avec `Badge` de statut, bouton
« Payer la visite » sur les véhicules non valides ouvrant une modale Mobile Money
(choix → en cours → confirmé), et tableau d'historique des visites. Bouton
« Prendre rendez-vous » vers `/contact#rdv`.

### Agent (`EspaceAgent.jsx`)
Disposition deux colonnes (`lg:grid-cols-[340px_1fr]`) : file du jour sélectionnable à
gauche, fiche d'inspection à droite. Sélectionner un véhicule réinitialise résultats,
photos et validation. Checklist identique à la version mobile mais en grille deux colonnes,
avec photos en aperçu 80 px. Le bouton de validation reste désactivé tant que les quatre
points ne sont pas évalués ; le résultat global suit la même règle du pire état.

### Mairie (`EspaceMairie.jsx`)
Trois tuiles (véhicules contrôlés, taux de conformité, reste à contrôler) avec `CountUp`.
La jauge de conformité applique une logique de sévérité (`>= 80` satisfaisant, `>= 60` à
surveiller, sinon insuffisant) : **le remplissage porte la couleur de sévérité, la piste
reprend une teinte claire de la même gamme**, et chaque état s'accompagne d'une icône et
d'un libellé, jamais de la couleur seule. Suivent la répartition par catégorie en barres
fines et le tableau des derniers contrôles.

### Navigation connectée

`Navbar` bascule sur `LIENS_APP` : « Mon espace », « Contact », « Retour au site »
(`/vitrine`). `MenuUtilisateur` affiche icône, nom et rôle, avec fermeture au clic
extérieur et à la touche Échap, et propose la déconnexion.

---

## 11. Build et déploiement

### `vite.config.js`

```js
base: command === 'build' ? '/tnt/' : '/'
```
Le sous-chemin ne s'applique qu'en production : le développement reste à la racine.

Un plugin local `replierVers404` s'exécute au `closeBundle` :
1. copie `dist/index.html` vers `dist/404.html` — GitHub Pages sert ce fichier pour toute
   adresse sans fichier correspondant **en conservant l'URL**, ce qui laisse le routeur
   afficher la bonne page ;
2. écrit `dist/.nojekyll` — désactive le traitement Jekyll de la publication par branche.

### Publication

`npm run deploy` construit puis pousse `dist/` sur la branche **`gh-pages`** via le paquet
`gh-pages` (option `--dotfiles`, nécessaire pour `.nojekyll`). La branche `main` ne contient
jamais `dist/`. GitHub Pages est configuré en **Deploy from a branch → `gh-pages` → `/ (root)`**.

**Limite connue** : les liens profonds renvoient un statut HTTP 404 tout en affichant la
bonne page. Sans conséquence fonctionnelle, pénalisant pour le référencement de ces URL.
Un hébergeur avec règle de réécriture (Vercel, Netlify) supprimerait ce défaut.

**Effet de bord connu** : un fichier `.gitignore` hérité se retrouve publié sur `gh-pages`.
Sans effet sur le site servi ; le supprimer impliquerait de renoncer à `--dotfiles`.

### Contraintes du poste de développement

Deux réglages machine qui ont bloqué le projet et qu'il faut connaître :

1. **`NODE_ENV=production`** est défini au niveau système. Conséquence : tout `npm install`
   **supprime les devDependencies**, dont Vite. Utiliser systématiquement
   `npm install --include=dev`.
2. **Interception TLS** sur le réseau : Git échouait sur la validation de certificat. Corrigé
   par `git config --global http.sslBackend schannel`, qui délègue la validation au magasin
   de certificats Windows sans la désactiver.

---

## 12. Ce qui est simulé

À énoncer clairement en présentation : rien n'est connecté à un système réel.

| Fonction | Réalité technique |
|---|---|
| Connexion, profils | Objets statiques, aucun mot de passe vérifié, session en `localStorage` |
| Prise de rendez-vous | Confirmation locale, référence aléatoire, aucun agenda |
| Vérification d'attestation | Recherche dans quatre entrées codées en dur |
| Paiement Mobile Money | `setTimeout`, aucune transaction |
| Scan de plaque | Remplissage automatique d'un champ |
| Indicateur d'affluence | Rotation de trois valeurs préréglées |
| Statistiques Mairie | Objet statique |
| Formulaire de contact | Aucun envoi réseau |
| Photos d'anomalie | Réelles côté navigateur (`URL.createObjectURL`), jamais transmises |

---

## 13. Pistes d'évolution

Reprises dans la page `/vision` :

1. **Service réel** — base véhicules et attestations, agenda synchronisé avec les postes,
   confirmation SMS, rappels avant expiration, espace client avec historique.
2. **Mobile et paiement** — publication iOS/Android, intégration Mobile Money, application
   agent hors ligne, attestation dématérialisée signée.
3. **Interconnexion** — tableau de bord Mairie alimenté en direct, échanges avec les services
   de transport, statistiques par catégorie et par quartier.

### Dettes techniques identifiées

- Le mot « TECHNITAL » du verrouillage horizontal utilise une police système, non vectorisée.
- Les coordonnées en ligne (e-mail, réseaux) restent à obtenir auprès de l'entreprise.
- Le numéro de téléphone alternatif trouvé en annuaire est à vérifier.
- Quatre vulnérabilités npm signalées par GitHub, sur des dépendances de développement.
- Aucun test automatisé : la validation repose sur des scripts Playwright ponctuels
  (parcours des trois profils, thèmes clair et sombre, liens profonds en production).
