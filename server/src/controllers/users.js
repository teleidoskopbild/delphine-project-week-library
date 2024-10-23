import db from "../util/db-connect.js";

export const login = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await db("library_users").where({ name }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      message: "Login successful",
      userId: user.id,
      name: user.name,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
