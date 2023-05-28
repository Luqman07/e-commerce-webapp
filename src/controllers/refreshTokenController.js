const jwt = require("jsonwebtoken");
const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) return res.sendStatus(401);
    const sql = "SELECT * FROM users WHERE refreshToken = ?";

    const user = await getUser(sql, refreshToken);
    if (!user) throw createApiError("User not found", 401);
    const payload = { username: user.id };

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.id !== decoded.id) throw err;
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "30s",
        });
        res.json({ message: "Access token created", data: accessToken });
      }
    );
  } catch (error) {
    res.sendStatus(500)
  }
};

module.exports = handleRefreshToken
