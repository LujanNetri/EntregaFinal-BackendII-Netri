export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user)
      return res.status(401).json({ message: "No estás autenticado" });

    if (!allowedRoles.includes(user.role))
      return res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });

    next();
  };
};

export const authorizeUserOrAdmin = (req, res, next) => {
  const loggedUser = req.user;
  const { uid } = req.params;

  if (!loggedUser)
    return res.status(401).json({ message: "No estás autenticado" });

  if (loggedUser.role === "admin") return next();

  if (loggedUser.id === uid) return next();

  return res.status(403).json({
    message: "No puedes acceder al perfil de otro usuario"
  });
};

export const authorizeOnlyUser = (req, res, next) => {
  if (req.user.role !== "user")
    return res.status(403).json({ message: "Solo los usuarios pueden modificar o ver carritos" });

  next();
};

export const authorizeOnlyAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Solo el administrador puede realizar esta acción" });

  next();
};

export const validateCartOwner = (req, res, next) => {
  const cartIdFromRoute = req.params.cid;
  const userCartId = req.user?.cart?.toString();

  if (!req.user) {
    return res.status(401).json({ error: "Debes iniciar sesión" });
  }

  if (userCartId !== cartIdFromRoute) {
    return res.status(403).json({ error: "No puedes modificar o ver el carrito de otro usuario" });
  }

  next();
}