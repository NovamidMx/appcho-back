const express = require("express");
const router = express.Router();
const {
    validatorCreateItem,
    validatorGetItem,
} = require("../validators/users");

const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
} = require("../controllers/users");

/**
 * Get all users
 * @openapi
 * /users:
 *    get:
 *      tags:
 *        - users
 *      summary: "Listar Usuarios"
 *      description: Obten la lista de todos los usuarios
 *      responses:
 *        '200':
 *          description: Retorna la listas de usuarios.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", getItems);
/**
 * Get user
 * @openapi
 * /users/{id}:
 *    get:
 *      tags:
 *        - users
 *      summary: "Detalle del usuario"
 *      description: Obten el detalle de un usuario
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de usuario a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto del usuario.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/user'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Registrar un nuevo usuario
 * @openapi
 * /users:
 *    post:
 *      tags:
 *        - users
 *      summary: "Registrar usuario"
 *      description: Registra un nuevo usuario y obtiene el usuario registrado
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/user"
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
 * Update user
 * @openapi
 * /users/{id}:
 *    put:
 *      tags:
 *        - users
 *      summary: "actualizar usuario"
 *      description: Actualiza un usuario y obtenie el detalle del usuario actualizado
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID del usuario
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
 *                 $ref: "#/components/schemas/user"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/user'
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
 * Delete user
 * @openapi
 * /users/{id}:
 *    delete:
 *      tags:
 *        - users
 *      summary: "Eliminar usuario"
 *      description: Elimiar usuario
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de usuario a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto del usuario eliminado.
 *        '422':
 *          description: Error de validacion.
 */
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;