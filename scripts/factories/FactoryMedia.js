import Video from '../models/Video.js'
import Image from '../models/Image.js'
/**
 * Classe factory pour créer différents types d'objets média
 * @class
 */
class FactoryMedia {
    /**
     * Crée un nouvel objet média basé sur les données fournies
     * @param {Object} data - Les données du média
     * @param {string} [data.image] - Chemin vers le fichier image (si le média est une image)
     * @param {string} [data.video] - Chemin vers le fichier vidéo (si le média est une vidéo)
     * @param {string} data.date - Date de création du média
     * @param {string|number} data.id - Identifiant unique du média
     * @param {number} data.likes - Nombre de likes sur le média
     * @param {string|number} data.photographerId - ID du photographe qui a créé le média
     * @param {number} data.price - Prix du média
     * @param {string} data.title - Titre du média
     * @returns {Image|Video} Une nouvelle instance d'Image ou de Video
     */
    constructor(data) {
        if (data.image) {
            return new Image(data)
        } else if (data.video) {
            return new Video(data)
        } else {
            throw new Error('Type de média invalide')
        }
    }
}

export default FactoryMedia