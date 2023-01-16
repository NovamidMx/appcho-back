const express = require("express");
const router = express.Router();
const {
    validatorCreateItem,
    validatorGetItem,
} = require("../validators/clients");

const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
} = require("../controllers/clients");

/**
 * Get all clients
 * @openapi
 * /clients:
 *    get:
 *      tags:
 *        - clients
 *      summary: "Listar clientes"
 *      description: Obten la lista de todos los clientes
 *      responses:
 *        '200':
 *          description: Retorna la listas de clientes.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/client'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", getItems);
/**
 * Get client
 * @openapi
 * /clients/{id}:
 *    get:
 *      tags:
 *        - clients
 *      summary: "Detalle del cliente"
 *      description: Obten el detalle de un cliente
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de cliente a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto del cliente.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/client'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Registrar un nuevo cliente
 * @openapi
 * /clients:
 *    post:
 *      tags:
 *        - clients
 *      summary: "Registrar cliente"
 *      description: Registra un nuevo cliente y obtiene el cliente registrado
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/client"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post(
    "/",
    validatorCreateItem,
    createItem
);
/**
 * Update client
 * @openapi
 * /clients/{id}:
 *    put:
 *      tags:
 *        - clients
 *      summary: "actualizar cliente"
 *      description: Actualiza un cliente y obtenie el detalle del cliente actualizado
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID del cliente
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/client"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/client'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.put(
    "/:id",
    validatorGetItem,
    validatorCreateItem,
    updateItem
);
/**
 * Delete client
 * @openapi
 * /clients/{id}:
 *    delete:
 *      tags:
 *        - clients
 *      summary: "Eliminar cliente"
 *      description: Elimiar cliente
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de cliente a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto del cliente eliminado.
 *        '422':
 *          description: Error de validacion.
 */
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;