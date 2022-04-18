const rgba = (c: number, a: number) => `rgba(${(c >> 16) & 0xFF},${(c >> 8) & 0xFF},${c & 0xFF},${a})`;

class Zone {
    div: HTMLDivElement;
    css: CSSStyleDeclaration;

    constructor(public id: string, x: number, y: number, largeur: number, hauteur: number) {

        this.div = document.createElement("div");
        this.div.id = this.id;
        this.css = this.div.style;
        this.placer(x, y, largeur, hauteur);
        this.mettreSur(document.body);
    }

    private _x: number = 0;
    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
        this.css.left = this._x + "px";
    }

    private _y: number = 0;
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
        this.css.top = this._y + "px";
    }

    private _lg: number = 0;
    public get largeur(): number {
        return this._lg;
    }
    public set largeur(value: number) {
        this._lg = value;
        this.css.width = this._lg + "px";
    }

    private _ht: number = 0;
    public get hauteur(): number {
        return this._ht;
    }
    public set hauteur(value: number) {
        this._ht = value;
        this.css.height = this._ht + "px";
    }

    private _cFond: number = 0xFFFFFF;
    public get couleurFond(): number {
        return this._cFond;
    }
    public set couleurFond(value: number) {
        this._cFond = value;
        this.css.backgroundColor = rgba(this._cFond, this._aFond);
    }

    private _aFond: number = 1;
    public get alphaFond(): number {
        return this._aFond;
    }
    public set alphaFond(value: number) {
        this._aFond = value;
        this.css.backgroundColor = rgba(this._cFond, this._aFond);
    }

    private _cBord: number = 0x000000;
    public get couleurBord(): number {
        return this._cBord;
    }
    public set couleurBord(value: number) {
        this._cBord = value;
        this.css.border = `${this._eBord}px ${this._sBord} ${rgba(this._cBord, this._aBord)}`;
    }

    private _aBord: number = 1;
    public get alphaBord(): number {
        return this._aBord;
    }
    public set alphaBord(value: number) {
        this._aBord = value;
        this.css.border = `${this._eBord}px ${this._sBord} ${rgba(this._cBord, this._aBord)}`;
    }

    private _ray: number = 0;
    public get arrondi(): number {
        return this._ray;
    }
    public set arrondi(value: number) {
        this._ray = value;
        this.css.borderRadius = this._ray === 0 ? "" : `${this._ray}px`;
    }

    private _sBord: string = "solid";
    public get styleBord(): string {
        return this._sBord;
    }
    public set styleBord(value: string) {
        this._sBord = value;
        this.css.border = `${this._eBord}px ${this._sBord} ${rgba(this._cBord, this._aBord)}`;
    }
    private _eBord: number = 1;
    public get epaisseurBord(): number {
        return this._eBord;

    }
    public set epaisseurBord(value: number) {
        this._eBord = value;
        this.css.border = `${this._eBord}px ${this._sBord} ${rgba(this._cBord, this._aBord)}`;
    }

    private _police: string = 'verdana';
    public get police(): string {
        return this._police;
    }
    public set police(value: string) {
        this._police = value;
        this.css.fontFamily = this._police;
    }

    private _tailleCar: number = 12;
    public get tailleCar(): number {
        return this._tailleCar;
    }
    public set tailleCar(value: number) {
        this._tailleCar = value;
        this.css.fontSize = `${this._tailleCar}px`;
    }

    private _couleurCar: number = 0x000000;
    public get couleurCar(): number {
        return this._couleurCar;
    }
    public set couleurCar(value: number) {
        this._couleurCar = value;
        this.css.color = rgba(this._couleurCar, this._alphaCar);
    }

    private _alphaCar: number = 1.0;
    public get alphaCar(): number {
        return this._alphaCar;
    }
    public set alphaCar(value: number) {
        this._alphaCar = value;
        this.css.color = rgba(this._couleurCar, this._alphaCar);
    }

    private _align: string = "left";
    public get align(): string {
        return this._align;
    }
    public set align(value: string) {
        this._align = value;
        this.css.textAlign = this._align;
    }

    private _htLgn: number = 1;
    public get hauteurLigne(): number {
        return this._htLgn;
    }
    public set hauteurLigne(value: number) {
        this._htLgn = value;
        this.css.lineHeight = this._htLgn + "";
    }

    public get curseur(): string {
        return this.css.cursor || "";
    }

    public set curseur(value: string) {
        this.css.cursor = value;
    }

    public get html(): string {
        return this.div.innerHTML;
    }

    public set html(value: string) {
        this.div.innerHTML = value;
    }

    public get texte(): string {
        return this.div.textContent || "";
    }

    public set texte(value: string) {
        this.div.textContent = value;
    }

    /**
     * contenu textuel éditable ?
     */
    get editable(): boolean {
        return this.div.hasAttribute("contenteditable");
    }
    set editable(value: boolean) {
        value ?
            this.div.setAttribute("contenteditable", "true") :
            this.div.removeAttribute("conteneditable");
    }

    /**
     * sensible à la souris ?
     */
    get reactif(): boolean {
        return this.css.pointerEvents !== "none";
    }
    set reactif(value: boolean) {
        this.css.pointerEvents = value ? "" : "none";
    }

    /**
     * contenu textuel surlignable ?
     */
    get selectionnable(): boolean {
        return this.css.userSelect !== "none";
    }
    set selectionnable(value: boolean) {
        this.css.userSelect = value ? "" : "none";
    }

    enfant(id: string, x: number, y: number, largeur: number, hauteur: number, couleurFond: number, hauteurLigne: number, html = ""): Zone {
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

    mettreSur(alt: HTMLElement) {
        alt.appendChild(this.div);
        return this;
    }

    placer(x: number, y: number, lg: number, ht: number, arrondi = 0): Zone {

        this.x = x;
        this.y = y;
        this.largeur = lg;
        this.hauteur = ht;
        this.arrondi = arrondi;
        return this;

    }

    remplir(couleurFond: number, alphaFond: number = 1.0) {

        this.couleurFond = couleurFond;
        this.alphaFond = alphaFond;
        return this;

    }

    border(couleurBord: number, styleBord: string, epaisseurBord: number, alphaBord: number = 1.0) {

        this.couleurBord = couleurBord;
        this.alphaBord = alphaBord;
        this.styleBord = styleBord;
        this.epaisseurBord = epaisseurBord;
        return this;

    }

    formater(police: string, tailleCar: number, couleurCar: number, alphaCar: number, alignement: string) {

        this.police = police;
        this.tailleCar = tailleCar;
        this.couleurCar = couleurCar;
        this.alphaCar = alphaCar;
        this.align = alignement;
        return this;

    }
    ombrer(ombre: string, frange: string) {
        this.css.boxShadow = ombre;
        this.css.outline = frange;
    }
}

class Saisie extends Zone {
    constructor(id: string, x: number, y: number, largeur: number, hauteur: number, contenu: string, action: Function) {
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
        }
        input.div.onblur = () => {
            input.couleurFond = 0xFFFFCC;
            action(input.texte);
        }
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
    constructor(id: string, x: number, y: number, largeur: number, hauteur: number, texte: string, action: Function) {
        super(id, x, y, largeur, hauteur);
        this.couleurFond = 0x9999FF;
        this.formater("verdana", 14, 0x333399, 1, "center");
        this.texte = texte;
        this.hauteurLigne = hauteur / 14
        this.selectionnable = false;
        this.curseur = "pointer";
        this.div.onmouseover = () => this.couleurFond = 0xCCCCFF;
        this.div.onmouseout = () => this.couleurFond = 0x9999FF;
        this.div.onclick = () => action(texte);
    }
}

class Radio extends Array<Bouton> {
    _index: number = 0;
    _bound = [0, 0, 0, 0];
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
    constructor(cible:HTMLElement, x: number, y: number, largeur: number, hauteur: number, public choix: string[], public action: Function, public vertical: boolean = false) {
        super();
        this._bound = [x, y, largeur, hauteur];
        this.mettreSur(cible, reaction);

        const radio = this;
        radio.selectedIndex = 0;

        function reaction(msg: string) {
            radio.selectedIndex = choix.indexOf(msg);
            action(msg);
        }
    }
    vider() {
        this.forEach(b => b.enlever());
        this.length = 0;
    }
    mettreSur(cible: HTMLElement, reaction: Function) {
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
    get selectedIndex(): number {
        return this._index;
    }
    set selectedIndex(value: number) {
        this._index = Math.max(Math.min(this.length - 1, value), 0);
        this.forEach((b, i) => {
            b.border(0x0, "solid", 2, i == this._index ? 1.0 : 0.0);
        })
    }
}

class Formulaire extends Zone {
    navig: Zone;
    titre: Zone;
    info: Zone;

    lignes: Zone[] = [];
    dy: number = 0;
    constructor(x: number, y: number, titre: string, lg: number, info: string) {
        super(titre, x, y, lg, 0);
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
    bouton(id: string, x: number, largeur: number, hauteur: number, texte: string, action: Function) {
        new Bouton(id, x, 0, largeur, hauteur, texte, action).mettreSur(this.navig.div);
    }
    saisie(id: string, x: number, largeur: number, hauteur: number, texte: string, action: Function) {
        new Saisie(id, x, 2, largeur, hauteur, texte, action).mettreSur(this.navig.div);
    }

    informer(information: string) {
        this.info.html = "<i>" + information + "</i>";
    }
    static Creer(fiche: string, categorie: string, ext: string, x: number, y: number): Formulaire {
        const fichier = "data/" + fiche + ".xml";
        let xml = new XMLHttpRequest();
        xml.open("GET", fichier, true);
        xml.responseType = "document";
        const titre = "Édition d'une fiche " + categorie + " pour export au format " + ext;
        let f = new Formulaire(x, y, titre, 700, "");
        xml.onload = (r) => {
            let doc = xml.responseXML as Document;
            let root = doc.childNodes[0] as Element;
            f.informer(root.getAttribute("hlp") || "");
            const premier = root.firstElementChild as Element;
            let lgns = premier.children;
            for (let i = 0; i < lgns.length; i++) {
                let child = lgns.item(i) as Element;
                let id = child.getAttribute("id") as string,
                    hlp = child.getAttribute("hlp") as string,
                    ht = parseInt(child.getAttribute("ht") || "28");
                f.entree(id, hlp, ht);
            };
        }
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
    entree(label: string, contenu: string, hauteur = 28) {
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

function alerter(contenu: string) {

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

