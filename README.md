# tamangular
Tamagotchi project developped with AngularJS&amp;Typescript

Pour cloner le répertoire:
- lancer un terminal
- se rendre dans /var/www/html/
- taper la commande suivante : git clone https://github.com/brouviere/tamangular.git

#Installation

* Cloner le repertoire comme indiquer ci-dessus  
* lancer `npm install angular` 
* Lancer votre serveur web sur tamangular/index.html

#Game PLay
#### But du jeu
	Atteindre le plus haut score en mainenant votre tamangular le plus longtemps en vie avec un bon niveau de vie et de santé. 

#### Les jauges du jeu
* en vert :  La jauge de Vie sur 100%
* en bleu : la jauge du Bonheur sur 100%
* en rouge: La jauge de fatigue : sur 100%
* L'argent dont vous disposez

#### Les actions
* Démarrer le jeu: Initialise les jauges et démarre les cycles de vie. Chaque cycle dure 60 secondes.
Durant chaque, vous devez réaliser certaines actions pour ne pas avoir de pénalités sur les jauges du jeu.

* Work (Travailler) : Action obligatoire par cycle sous peine d'une pénalité de la jauge de vie
* Feed (Manger) : Nourrissez votre tamagular. Attention, certains aliments sont bon pour la santé, d'autres bon pour le moral.
