#Endpoints del Servidor

A continuación están **todos los endpoints**, agrupados por módulos.
---

# USERS ROUTES (`/api/users`)

| Método | Ruta | Descripción |
|-------|-------|------|-------------|
| GET | `/api/users/` | Obtiene todos los usuarios |
| GET | `/api/users/:uid` | Obtiene un usuario por ID |
| POST | `/api/users/` | Crea un usuario |
| PUT | `/api/users/:uid` |Actualiza un usuario |
| DELETE | `/api/users/:uid` | Elimina un usuario |

---
#  PRODUCTS ROUTES (`/api/products`)

| Método | Ruta | Descripción |
|-------|-------|------|-------------|
| GET | `/api/products` | Lista productos |
| GET | `/api/products/:pid` | Obtiene un producto |
| POST | `/api/products` | Crea producto |
| PUT | `/api/products/:pid`  | Actualiza producto |
| DELETE | `/api/products/:pid` | Elimina producto |

---

# 🛒 CARTS ROUTES (`/api/carts`)

| Método | Ruta| Descripción |
|-------|-------|------|-------------|
| GET | `/api/carts/:cid` | Obtiene carrito |
| POST | `/api/carts` | Crea un carrito |
| POST | `/api/carts/:cid/product/:pid` | Agrega producto |
| POST | `/api/carts/:cid/purchase` | Finaliza compra |
| DELETE | `/api/carts/:cid/product/:pid` | Elimina producto del carrito |
| DELETE | `/api/carts/:cid` | Vacía el carrito |

# SESSIONS ROUTES (`/api/sessions`)

| Método | Ruta | Descripción |
|-------|-------|------|-------------|
| POST | `/api/sessions/register`| Registro de usuario |
| POST | `/api/sessions/login` | Login |
| GET | `/api/sessions/current` | Usuario autenticado actual |
| POST | `/api/sessions/recover` | Envía email con token para resetear password |
| POST | `/api/sessions/restore` | Restablece password con token |
| POST | `/api/sessions/logout` | Cierra sesión |

---

##  **Flujo de Recuperación de Contraseña**

1. Enviás un POST a:

```
POST /api/sessions/recover
Body: { "email": "tucorreo@example.com" }
```

2. Te llega un email con un botón.  
   Al hacer clic, se abre una página que muestra el **token en la URL** en la parte superior.

   **Debés copiar ese token**.

3. En Postman llamás a:

```
POST /api/sessions/restore
Body: {
  "token": "EL_TOKEN_QUE_TE_LLEGÓ",
  "newPassword": "tuNuevaPassword"
}
```

4. Si todo sale bien, la Password debería de ser cambiada.


