"use strict";
function creerInterface() {
    const categories = ["Auteurs", "Époques", "Mouvements", "Œuvres", "Textes"];
    const fiches = ["auteur", "epoque", "mouvement", "oeuvre", "texte"];
    const extensions = [".html", ".json", ".md", ".rtf", ".xml", ".docx", ".pptx"];
    /**
     * formulaire en cours
     */
    var formulaire;
    var xtension = ".docx", categorie = "Textes";
    new Radio(document.body, 2, 80, 176, 180, categories, (rad) => {
        categorie = rad;
        afficherForm();
    }, true);
    afficherForm();
    function afficherForm() {
        if (formulaire != undefined)
            formulaire.detruire();
        let index = categories.indexOf(categorie);
        let idCat = categorie.substring(0, categorie.length - 1);
        formulaire = Formulaire.Creer(fiches[index], idCat, xtension, 180, 80);
        let r = new Radio(formulaire.navig.div, 310, 0, 380, 28, extensions, (rad) => {
            xtension = rad;
            afficherForm();
        }, false);
        r.selectedIndex = extensions.indexOf(xtension);
    }
}
window.onload = () => {
    creerInterface();
};
//# sourceMappingURL=main.js.map