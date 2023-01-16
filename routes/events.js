/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middleware/validar-campos');
// const { validarJWT } = require('../middleware/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

// Todas tienes que pasar por la validación del JWT
// router.use( validarJWT );

// Obtener eventos 
/**
 * Get all eventos
 * @openapi
 * /events:
 *    get:
 *      tags:
 *        - eventos
 *      summary: "Listar eventos"
 *      description: Obten la lista de todos los eventos
 *      responses:
 *        '200':
 *          description: Retorna la listas de eventos.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/eventos'
 *        '422':
 *          description: Error de validacion.
 */
router.get('/', getEventos );

// Crear un nuevo evento
/**
 * Registrar un nuevo evento
 * @openapi
 * /events:
 *    post:
 *      tags:
 *        - eventos
 *      summary: "Registrar evento"
 *      description: Registra un nuevo evento y obtiene el evento registrado
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/eventos"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

// Borrar evento
router.delete('/:id', eliminarEvento );

module.exports = router;