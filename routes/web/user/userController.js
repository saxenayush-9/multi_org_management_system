const { catchAsyncError } = require("../../../middleware/handleError");
const { user } = require("../model");
const { role } = require("../masters/model");
const user_role = require("../../../models/mappers/user_role");

const addUser = catchAsyncError(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      user_id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      created_at: newUser.created_at,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getUsers = catchAsyncError(async (req, res) => {
  try {
    const user = await user.findAll({
      where: Object.assign({}, req.query.id ? { uuid: req.query.id } : {}),
      include: {
        model: role,
        through: UserRole,
        attributes: ["uuid", "name"],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const assignRole = catchAsyncError(async (req, res) => {
  try {
    const { role_id } = req.body;
    const user_id = req.params.user_id;

    await user_role.create({ user_id, role_id });

    res.status(200).json({ message: "Role assigned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getUserRoles = catchAsyncError(async (req, res) => {
  try {
    const roles = await role.findAll({
      include: {
        model: user_role,
        where: { user_id: req.params.user_id },
        attributes: [],
      },
    });

    res.status(200).json({
      user_id: req.params.user_id,
      roles: roles.map((role) => ({
        role_id: role.role_id,
        role_name: role.role_name,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  addUser,
  getUsers,
  assignRole,
  getUserRoles,
};
