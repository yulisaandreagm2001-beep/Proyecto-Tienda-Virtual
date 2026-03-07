const express = require("express");
const router = express.Router();
const { getPool } = require("../database/connection");

// --- OBTENER PRODUCTOS ---
router.get("/", async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.query("SELECT * FROM productos");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// --- OBTENER UN PRODUCTO POR ID ---
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();
        const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el producto" });
    }
});

// --- CREAR PRODUCTO (Actualizado con Fix para Stock) ---
router.post("/", async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, imagen } = req.body;

        // FIX: Si el stock llega vacío o null desde el frontend, le asignamos 0 
        // para evitar el error 'Column stock cannot be null' que te salía en consola.
        const stockSeguro = (stock === null || stock === undefined || stock === "") ? 0 : stock;

        const pool = getPool();
        const sql = "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, [nombre, descripcion, precio, stockSeguro, imagen]);

        res.status(201).json({
            message: "Producto creado con éxito",
            id: result.insertId
        });
    } catch (error) {
        console.error("Error al crear producto:", error.message);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

// --- ACTUALIZAR PRODUCTO ---
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, imagen } = req.body;
        
        // También aplicamos el fix de stock aquí por seguridad
        const stockSeguro = (stock === null || stock === undefined || stock === "") ? 0 : stock;

        const pool = getPool();
        const sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ? WHERE id = ?";
        const [result] = await pool.query(sql, [nombre, descripcion, precio, stockSeguro, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado para actualizar" });
        }

        res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar:", error.message);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

// --- ELIMINAR PRODUCTO ---
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();
        const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "El producto ya no existe" });
        }

        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar:", error.message);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});

module.exports = router;