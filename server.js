const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');

const app = express(); // ✅ Inicializamos la app

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS) desde la raíz
app.use(express.static(path.join(__dirname)));

// 👉 Servir también la carpeta "loggin" y "menú"
app.use('/loggin', express.static(path.join(__dirname, 'loggin')));
app.use('/menu', express.static(path.join(__dirname, 'menú')));

// Conexión a MySQL (usa tus credenciales reales)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',  // cámbialo por tu clave real
  database: 'sistema_login'
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a MySQL');
});

// 👉 Ruta inicial: mostrar login.html por defecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'loggin', 'login.html'));
});

// Ruta: registrar usuario
app.post('/register', async (req, res) => {
  const { usuario, password, nombre } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO usuarios (username, password, nombre) VALUES (?, ?, ?)';
    db.query(query, [usuario, hashedPassword, nombre], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al registrar usuario');
      }
      // Redirigir al login después de registrar
      res.redirect('/loggin/login.html');
    });
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

// Ruta: login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE username = ?';
  db.query(query, [usuario], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length === 0) {
      return res.status(401).send('❌ Usuario no encontrado');
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // 👉 Redirigir al menú después del login exitoso
      res.redirect('/menu/menu.html');
    } else {
      res.status(401).send('❌ Contraseña incorrecta');
    }
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});