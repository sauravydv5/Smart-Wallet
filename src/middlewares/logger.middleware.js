module.exports = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${
        Date.now() - start
      }ms`
    );
  });

  next();
};
