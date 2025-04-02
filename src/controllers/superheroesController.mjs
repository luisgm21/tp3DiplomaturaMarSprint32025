import exp from "node:constants";
import { obtenerSuperHeroePorId,buscarSuperHeroesPorAtributo,obtenerSuperHeroesMayoresDe30,obtenerTodosLosSuperHeroes, agregarSuperHeroe, editarSuperHeroe, eliminarSuperHeroePorId,eliminarSuperHeroePorNombreSuperHeroe} from "../services/superheroesService.mjs";
import { renderizarSuperHeroe,renderizarSuperHeroeEditado,renderizarSuperHeroes } from "../views/responseView.mjs";

export async function obtenerSuperHeroePorIdController(req ,res) {

    try {
        const { id } = req.params;
        const superHeroe = await obtenerSuperHeroePorId(id);
        if(!superHeroe) return res.status(404).json({message: 'Super Heroe no encontrado'});

        const superHeroeFormateado = renderizarSuperHeroe(superHeroe);

        res.status(200).json(superHeroeFormateado);
    } catch (error) {
        res.status(500).send({message: 'Error al obtener el super heroe', error: error.message});
    }
}

export async function obtenerTodosLosSuperHeroesController(req ,res) {
    
    try {
        const superHeroes = await obtenerTodosLosSuperHeroes();
    
        const superHeroesFormateados = renderizarSuperHeroes(superHeroes);

        res.status(200).json(superHeroesFormateados);
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los super heroes', error: error.message});
    }
}

export async function buscarSuperHeroesPorAtributoController(req ,res) {
    
    try {
        const { atributo, value } = req.params;
        const superHeroes = await buscarSuperHeroesPorAtributo(atributo, value);
        if(superHeroes.length === 0) return res.status(404).json({message: 'No hay super heroes con ese atributo'});

        const superHeroesFormateados = renderizarSuperHeroes(superHeroes);

        res.status(200).json(superHeroesFormateados);
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los super heroes', error: error.message});
    }
}

export async function obtenerSuperHeroesMayoresDe30Controller(req ,res) {
    
    try {
        const superHeroes = await obtenerSuperHeroesMayoresDe30();
        if(superHeroes.length === 0) return res.status(404).json({message: 'No se encontraron super heroes mayores de 30'});

        const superHeroesFormateados = renderizarSuperHeroes(superHeroes);

        res.status(200).json(superHeroesFormateados);
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los super heroes', error: error.message}); 
    }
}

export async function agregarSuperHeroeController(req ,res) {
    try {
        const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad , poderes, aliados, enemigos } = req.body;
        const superHeroe = await agregarSuperHeroe(nombreSuperHeroe , nombreReal , edad , planetaOrigen, debilidad , poderes , aliados , enemigos );
        if(!superHeroe) return res.status(404).json({message: 'Super Heroe no encontrado'});

        const superHeroeFormateado = renderizarSuperHeroe(superHeroe);
        
        res.status(200).json({message: 'Superhéroe registrado correctamente', data: superHeroeFormateado});
    } catch (error) {
        res.status(500).send({message: 'Error al obtener el super heroe', error: error.message});
    }
}

export async function editarSuperHeroeController(req ,res) {
    try {
        const { id } = req.params;
        const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad , poderes, aliados, enemigos } = req.body;
        const superHeroe = await obtenerSuperHeroePorId(id);
        if(!superHeroe) return res.status(404).json({message: 'Super Heroe no encontrado'});
        const superHeroeEditado = await editarSuperHeroe(id, nombreSuperHeroe , nombreReal , edad , planetaOrigen, debilidad , poderes , aliados , enemigos );
        

        const superHeroeFormateado = renderizarSuperHeroeEditado(superHeroe, superHeroeEditado);

        res.status(200).json({message: 'Superhéroe actualizado correctamente', data: superHeroeFormateado});
    } catch (error) {
        res.status(500).send({message: 'Error al obtener el super heroe', error: error.message});
    }
}
export async function eliminarSuperHeroePorIdController(req ,res) {
    try {
        const { id } = req.params;
        const superHeroe = await obtenerSuperHeroePorId(id);
        if(!superHeroe) return res.status(404).json({message: 'Super Heroe no encontrado'});
        const superHeroeEliminado = await eliminarSuperHeroePorNombreSuperHeroe(nombreSuperHeroe);
        const superHeroeFormateado = renderizarSuperHeroe(superHeroeEliminado);

        res.status(200).json({message: 'Superhéroe eliminado correctamente', data: superHeroeFormateado});
    } catch (error) {
        res.status(500).send({message: 'Error al obtener el super heroe', error: error.message});
    }
}

export async function eliminarSuperHeroePorNombreSuperHeroeController(req ,res) {
    try {
        const { nombreSuperHeroe } = req.body;
        const superHeroes = await buscarSuperHeroesPorAtributo("nombreSuperHeroe", nombreSuperHeroe);
        if(superHeroes.length === 0) return res.status(404).json({message: 'No hay super heroes con ese nombre.'}); 
        const superHeroeEliminado = await eliminarSuperHeroePorNombreSuperHeroe(nombreSuperHeroe);
        const superHeroeFormateado = renderizarSuperHeroe(superHeroeEliminado);

        res.status(200).json({message: 'Superhéroe eliminado correctamente', data: superHeroeFormateado});
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar el super heroe', error: error.message});
    }
}