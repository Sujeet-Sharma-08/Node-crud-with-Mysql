const db = require("../config/db");

// Controller for creating a user
const createUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId,
        });
    });
};


// getting all the users
const getAllUsers = (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        return res.status(200).json(results); // results is an array of rows
    });
};


// get user by id 
const getUserById = async (req, res) => {
  const { id } = req.params;

  const sql = "SELECT id, name, email FROM users WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(results[0]); // return single user object
  });
};


// updating the user from the database
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // Basic validation
  if (!name && !email) {
    return res.status(400).json({ message: "Please provide name or email to update" });
  }

  const sql = "UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?";

  db.query(sql, [name, email, id], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully" });
  });
};


// deleting the user from the database 
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  });
};

module.exports = { createUser, getAllUsers,getUserById, updateUserById, deleteUserById  };
