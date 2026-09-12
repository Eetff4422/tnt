# Maquettes — Technital

Planche de maquettes destinée à accompagner la proposition commerciale
*Technital_Proposition_ESNO.docx* (ESNO Poly Services, septembre 2026).

- **Fichier** : `index.html` — autonome, à ouvrir dans un navigateur.
- **Fichier Figma** : https://www.figma.com/design/2DSteZ3h6qMuhVkKIX82hv
  (11 des 12 écrans ; les écrans 3.1 et 3.2 n'y figurent pas — voir *Limite Figma* plus bas.)

## Présenter ou imprimer

Ouvrir `index.html`, puis **Imprimer → Enregistrer en PDF**, format **A4 paysage**.
La mise en page d'impression place une planche par page, dans l'ordre du document.
Le PDF obtenu s'annexe tel quel à la proposition.

## Les douze écrans

| Écran | Titre | Renvoi à la proposition |
|---|---|---|
| 1.1 | Connexion agent | §5, étape 1 — comptes nominatifs |
| 1.2 | File du jour | §5, étape 1 — poste agent |
| 1.3 | Fiche véhicule et historique | §5, étape 1 — référentiel et historique horodaté |
| 1.4 | Saisie du contrôle | §5, étape 1 — formulaire paramétrable |
| 1.5 | Procès-verbal de visite | §5, étape 1 — génération du PV ; §4, opposabilité |
| 1.6 | Tableau de bord direction | §5, étape 1 — pilotage ; §4, indicateurs |
| 1.7 | Poste agent sur téléphone | §13 — interface responsive, saisie hors connexion |
| 2.1 | Échéancier des visites | §5, étape 2 — relance avant échéance |
| 2.2 | Fiche flotte | §5, étape 2 — vue consolidée par flotte |
| 2.3 | Campagne de relance et suivi | §5, étape 2 — SMS / WhatsApp, suivi des envois |
| 3.1 | Site vitrine | §5, étape 3 — présence en ligne |
| 3.2 | Site vitrine sur téléphone | §5, étape 3 — connexions mobiles à faible débit |

Ne sont volontairement pas représentés les éléments exclus en §6 : attestation
dématérialisée, espace automobiliste, tableau de bord Mairie, reprise de
l'historique antérieur.

## Données affichées

Toutes les valeurs sont illustratives. Les immatriculations, noms, tarifs et
horaires reprennent ceux du prototype du dépôt (`src/data/`) et de la grille du
Ministère des Transports. Aucune donnée réelle de Technital n'a été utilisée —
nous n'en disposons pas, comme indiqué en §2 de la proposition.

## Limite Figma

Le fichier Figma a été construit avec le plan *Starter*, plafonné à 20 appels
d'outil MCP par mois. Le quota a été atteint après l'écran 3.1 : celui-ci y est
tronqué en hauteur et l'écran 3.2 n'y a pas été créé. `index.html` fait foi et
contient les douze écrans complets. La reprise du fichier Figma suppose un plan
Professional (ou une édition manuelle dans l'interface Figma, qui n'est pas
soumise à cette limite).

## Rendu technique

Page HTML statique, sans dépendance hors la police Inter (Google Fonts).
Chaque écran est une maquette à taille réelle (1280 × 800 pour les écrans
ordinateur, 390 × 844 pour les écrans téléphone), réduite à l'affichage par
`zoom` CSS. Palette et composants alignés sur le prototype du dépôt
(`tailwind.config.js`, `src/utils/constants.js`).
