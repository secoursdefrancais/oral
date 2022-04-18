"use strict";
const rgba = (c, a) => `rgba(${(c >> 16) & 0xFF},${(c >> 8) & 0xFF},${c & 0xFF},${a})`;
class Zone {
    constructor(id, x, y, largeur, hauteur) {
        this.id = id;
        this._x = 0;
        this._y = 0;
        this._lg = 0;
        this._ht = 0;
        this._cFond = 0xFFFFFF;
        this._aFond = 1;
        this._cBord = 0x000000;
        this._aBord = 1;
        this._ray = 0;
        this._sBord = "solid";
        this._eBord = 1;
        this._police = 'verdana';
        this._tailleCar = 12;
        this._couleurCar = 0x000000;
        this._alphaCar = 1.0;
        this._align = "left";
        this._htLgn = 1;
        this.div = document.createElement("div");
        this.div.id = this.id;
        this.css = this.div.style;
        this.placer(x, y, largeur, hauteur);
        this.mettreSur(document.body);
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.css.left = this._x + "px";
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.css.top = this._y + "px";
    }
    get largeur() {
        return this._lg;
    }
    set largeur(value) {
        this._lg = value;
        this.css.width = this._lg + "px";
    }
    get hauteur() {
        return this._ht;
    }
    set hauteur(value) {
        this._ht = value;
        this.css.height = this._ht + "px";
    }
    get couleurFond() {
        return this._cFond;
    }
    set couleurFond(value) {
        this._cFond = value;
        this.css.backgroundColor = rgba(this._cFond, this._aFond);
    }
    get alphaFond() {
        return this._aFond;
    }
    set alphaFond(value) {
        this._aFond = value;
        this.css.backgroundColor = rgba(this._cFond, this._aFond);
    }
    get couleurBord() {
        return this._cBord;
    }
    set couleurBord(value) {
        this._cBord = value;
        this.css.border = `${this._eBord}px ${this._sBord} ${rgba(this._cBord, this._aBord)}`;
    }
    get alphaBord() {
        return this._aBord;
    }
    set alphaBord(value) {
        this._aBord = value;
        this.css.border = `${this._eBord}px ${this._sBord} ${rgba(this._cBord, this._aBord)}`;
    }
    get arrondi() {
        return this._ray;
    }
    set arrondi(value) {
        this._ray = value;
        this.css.borderRadius = this._ray === 0 ? "" : `${this._ray}px`;
    }
    get styleBord() {
        return this._sBord;
    }
    set styleBord(value) {
        this._sBord = value;
        this.css.border = `${this._eBord}px ${this._sBord} ${rgba(this._cBord, this._aBord)}`;
    }
    get epaisseurBord() {
        return this._eBord;
    }
    set epaisseurBord(value) {
        this._eBord = value;
        this.css.border = `${this._eBord}px ${this._sBord} ${rgba(this._cBord, this._aBord)}`;
    }
    get police() {
        return this._police;
    }
    set police(value) {
        this._police = value;
        this.css.fontFamily = this._police;
    }
    get tailleCar() {
        return this._tailleCar;
    }
    set tailleCar(value) {
        this._tailleCar = value;
        this.css.fontSize = `${this._tailleCar}px`;
    }
    get couleurCar() {
        return this._couleurCar;
    }
    set couleurCar(value) {
        this._couleurCar = value;
        this.css.color = rgba(this._couleurCar, this._alphaCar);
    }
    get alphaCar() {
        return this._alphaCar;
    }
    set alphaCar(value) {
        this._alphaCar = value;
        this.css.color = rgba(this._couleurCar, this._alphaCar);
    }
    get align() {
        return this._align;
    }
    set align(value) {
        this._align = value;
        this.css.textAlign = this._align;
    }
    get hauteurLigne() {
        return this._htLgn;
    }
    set hauteurLigne(value) {
        this._htLgn = value;
        this.css.lineHeight = this._htLgn + "";
    }
    get curseur() {
        return this.css.cursor || "";
    }
    set curseur(value) {
        this.css.cursor = value;
    }
    get html() {
        return this.div.innerHTML;
    }
    set html(value) {
        this.div.innerHTML = value;
    }
    get texte() {
        return this.div.textContent || "";
    }
    set texte(value) {
        this.div.textContent = value;
    }
    /**
     * contenu textuel éditable ?
     */
    get editable() {
        return this.div.hasAttribute("contenteditable");
    }
    set editable(value) {
        value ?
            this.div.setAttribute("contenteditable", "true") :
            this.div.removeAttribute("conteneditable");
    }
    /**
     * sensible à la souris ?
     */
    get reactif() {
        return this.css.pointerEvents !== "none";
    }
    set reactif(value) {
        this.css.pointerEvents = value ? "" : "none";
    }
    /**
     * contenu textuel surlignable ?
     */
    get selectionnable() {
        return this.css.userSelect !== "none";
    }
    set selectionnable(value) {
        this.css.userSelect = value ? "" : "none";
    }
    enfant(id, x, y, largeur, hauteur, couleurFond, hauteurLigne, html = "") {
        let z = new Zone(id, x, y, largeur, hauteur);
        z.couleurFond = couleurFond;
        z.hauteurLigne = hauteurLigne;
        z.mettreSur(this.div);
        z.html = html;
        return z;
    }
    enlever() {
        this.div.remove();
        return this;
    }
    mettreSur(alt) {
        alt.appendChild(this.div);
        return this;
    }
    placer(x, y, lg, ht, arrondi = 0) {
        this.x = x;
        this.y = y;
        this.largeur = lg;
        this.hauteur = ht;
        this.arrondi = arrondi;
        return this;
    }
    remplir(couleurFond, alphaFond = 1.0) {
        this.couleurFond = couleurFond;
        this.alphaFond = alphaFond;
        return this;
    }
    border(couleurBord, styleBord, epaisseurBord, alphaBord = 1.0) {
        this.couleurBord = couleurBord;
        this.alphaBord = alphaBord;
        this.styleBord = styleBord;
        this.epaisseurBord = epaisseurBord;
        return this;
    }
    formater(police, tailleCar, couleurCar, alphaCar, alignement) {
        this.police = police;
        this.tailleCar = tailleCar;
        this.couleurCar = couleurCar;
        this.alphaCar = alphaCar;
        this.align = alignement;
        return this;
    }
    ombrer(ombre, frange) {
        this.css.boxShadow = ombre;
        this.css.outline = frange;
    }
}
class Saisie extends Zone {
    constructor(id, x, y, largeur, hauteur, contenu, action) {
        super(id, x, y, largeur, hauteur);
        this.couleurFond = 0xFFFFCC;
        this.texte = contenu;
        this.editable = true;
        this.hauteurLigne = 2;
        this.arrondi = 6;
        this.formater("verdana", 13, 0x000000, 1, "center");
        this.ombrer("0 0 4px #719ECE", "none");
        const input = this;
        input.div.onfocus = () => {
            input.couleurFond = 0xFFFFFF;
        };
        input.div.onblur = () => {
            input.couleurFond = 0xFFFFCC;
            action(input.texte);
        };
    }
}
class Bouton extends Zone {
    /**
     * Bouton réagissant au clic
     * @param x gauche du bouton
     * @param y haut du bouton
     * @param largeur largeur du bouton
     * @param hauteur hauteur du bouton
     * @param texte texte affiché sur le bouton
     * @param action fonction appelée sur clic avec comme seul paramètre le texte affiché
     */
    constructor(id, x, y, largeur, hauteur, texte, action) {
        super(id, x, y, largeur, hauteur);
        this.couleurFond = 0x9999FF;
        this.formater("verdana", 14, 0x333399, 1, "center");
        this.texte = texte;
        this.hauteurLigne = hauteur / 14;
        this.selectionnable = false;
        this.curseur = "pointer";
        this.div.onmouseover = () => this.couleurFond = 0xCCCCFF;
        this.div.onmouseout = () => this.couleurFond = 0x9999FF;
        this.div.onclick = () => action(texte);
    }
}
class Radio extends Array {
    /**
     * Liste de choix exclusifs. L'élément choisi est signalé
     * @param x gauche du premier bouton
     * @param y haut du premier bouton
     * @param largeur largeur totale de la liste
     * @param hauteur hauteur totale de la liste
     * @param choix liste des options
     * @param action réaction au clic avec comme paramètre le texte choisi
     * @param vertical [superposition:true | jusxtaposition:false] de boutons
     */
    constructor(cible, x, y, largeur, hauteur, choix, action, vertical = false) {
        super();
        this.choix = choix;
        this.action = action;
        this.vertical = vertical;
        this._index = 0;
        this._bound = [0, 0, 0, 0];
        this._bound = [x, y, largeur, hauteur];
        this.mettreSur(cible, reaction);
        const radio = this;
        radio.selectedIndex = 0;
        function reaction(msg) {
            radio.selectedIndex = choix.indexOf(msg);
            action(msg);
        }
    }
    vider() {
        this.forEach(b => b.enlever());
        this.length = 0;
    }
    mettreSur(cible, reaction) {
        this.vider();
        let [x, y, largeur, hauteur] = this._bound;
        const choix = this.choix, nbItems = choix.length;
        const lg = this.vertical ? largeur : largeur / nbItems;
        const ht = this.vertical ? hauteur / nbItems : hauteur;
        const dx = this.vertical ? 0 : lg;
        const dy = this.vertical ? ht : 0;
        for (let i = 0; i < nbItems; i++) {
            const b = new Bouton(choix[i], x + (dx * i), y + (dy * i), lg, ht, choix[i], reaction);
            b.mettreSur(cible);
            b.hauteurLigne = (ht - 4) / 14;
            this.push(b);
        }
    }
    get selectedIndex() {
        return this._index;
    }
    set selectedIndex(value) {
        this._index = Math.max(Math.min(this.length - 1, value), 0);
        this.forEach((b, i) => {
            b.border(0x0, "solid", 2, i == this._index ? 1.0 : 0.0);
        });
    }
}
class Formulaire extends Zone {
    constructor(x, y, titre, lg, info) {
        super(titre, x, y, lg, 0);
        this.lignes = [];
        this.dy = 0;
        this.remplir(0xBBBBFF, 1);
        this.border(0x333399, "dashed", 1, 1);
        this.formater("verdana", 16, 0x333399, 1, "center");
        this.titre = this.enfant("titre", 2, 2, lg - 6, 40, 0xFFFFFF, 2, "<h2>" + titre + "</h2>");
        this.info = this.enfant("info", 2, 42, lg - 6, 30, 0xDDDDFF, 1.8);
        this.navig = this.enfant("navig", 2, 74, lg - 6, 28, 0x9999FF, 1);
        this.bouton("debut", 0, 40, 28, "|<", naviguer);
        this.bouton("recul", 40, 40, 28, "<", naviguer);
        this.saisie("pos", 80, 38, 24, "0", naviguer);
        this.saisie("ref", 120, 98, 24, "indéfini", naviguer);
        this.bouton("avance", 220, 40, 28, ">", naviguer);
        this.bouton("fin", 260, 40, 28, ">|", naviguer);
        function naviguer() {
        }
        this.dy = 104;
    }
    bouton(id, x, largeur, hauteur, texte, action) {
        new Bouton(id, x, 0, largeur, hauteur, texte, action).mettreSur(this.navig.div);
    }
    saisie(id, x, largeur, hauteur, texte, action) {
        new Saisie(id, x, 2, largeur, hauteur, texte, action).mettreSur(this.navig.div);
    }
    informer(information) {
        this.info.html = "<i>" + information + "</i>";
    }
    static Creer(fiche, categorie, ext, x, y) {
        const fichier = "data/" + fiche + ".xml";
        let xml = new XMLHttpRequest();
        xml.open("GET", fichier, true);
        xml.responseType = "document";
        const titre = "Édition d'une fiche " + categorie + " pour export au format " + ext;
        let f = new Formulaire(x, y, titre, 700, "");
        xml.onload = (r) => {
            let doc = xml.responseXML;
            let root = doc.childNodes[0];
            f.informer(root.getAttribute("hlp") || "");
            const premier = root.firstElementChild;
            let lgns = premier.children;
            for (let i = 0; i < lgns.length; i++) {
                let child = lgns.item(i);
                let id = child.getAttribute("id"), hlp = child.getAttribute("hlp"), ht = parseInt(child.getAttribute("ht") || "28");
                f.entree(id, hlp, ht);
            }
            ;
        };
        xml.send();
        return f;
    }
    detruire() {
        this.ecrireDonnees();
        this.enlever();
    }
    ecrireDonnees() {
        // collecter sous forme d'objet
        // transformer selon le format en cours
    }
    /**
     * ligne de saisie
     * @param label texte de la partie étiquette
     * @param contenu texte de la partie saisie
     * @param hauteur hauteur de l'espace de saisie
     * @returns un enfant du formulaire (div)
     */
    entree(label, contenu, hauteur = 28) {
        let lgn = new Zone(label, 2, this.dy, this.largeur - 6, hauteur);
        lgn.couleurFond = 0xCCCCFF;
        lgn.hauteurLigne = 1.8;
        lgn.mettreSur(this.div);
        let eti = lgn.enfant("lbl_" + label, 0, 0, 150, hauteur, 0x9999FF, 2, label + " :");
        eti.formater("verdana", 12, 0x000000, 1, "right");
        let txt = lgn.enfant("txt_" + label, 152, 0, this.largeur - 158, hauteur, 0xDDDDFF, 1.8, contenu);
        txt.align = "left";
        txt.editable = true;
        this.dy += hauteur + 1;
        this.hauteur = this.dy + 3;
        return lgn;
    }
}
function alerter(contenu) {
    // fenêtre modale 
    document.body.style.overflow = "hidden";
    const lg = window.innerWidth, ht = window.innerHeight - 1, mx = lg / 2, my = ht / 2;
    let voile = new Zone("voile", 0, 0, lg * 2, ht * 2);
    voile.remplir(0x0, 0.8);
    voile.reactif = true;
    let cadre = new Zone("cadre", mx - 200, my - 100, 400, 200);
    cadre.remplir(0xAAAAFF, 1);
    cadre.border(0x6666FF, "solid", 2);
    cadre.arrondi = 12;
    let message = new Zone("msg", mx - 200, my - 80, 400, 100);
    message.hauteurLigne = 1.5;
    message.formater("verdana", 18, 0x0, 1, "center");
    message.html = contenu;
    message.selectionnable = false;
    message.reactif = false;
    let boutonOk = new Bouton("OK", mx - 40, my + 50, 80, 30, "O.K", fermerBoite);
    function fermerBoite() {
        voile.enlever();
        cadre.enlever();
        message.enlever();
        boutonOk.enlever();
    }
}
//# sourceMappingURL=zone.js.map