const { catchAsyncError } = require("../../../middleware/handleError");
const { organization, organization_user, user } = require("../../model");

const addOrg = catchAsyncError(async (req, res) => {
  try {
    const { organization_name, created_by } = req.body;

    const newOrganization = await organization.create({
      organization_name,
      created_by,
    });

    res.status(201).json({
      organization_id: newOrganization.id,
      organization_name: newOrganization.organization_name,
      created_by: newOrganization.created_by,
      created_at: newOrganization.created_at,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getOrgs = catchAsyncError(async (req, res) => {
  try {
    const org = await organization.findAll({
      where: Object.assign({}, req.query.id ? { uuid: req.query.id } : {}),
      include: {
        model: user,
        attributes: ["uuid", "name"],
      },
    });

    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.status(200).json({
      data: org,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const assignOrg = catchAsyncError(async (req, res) => {
  try {
    const { user_id } = req.body;
    const organization_id = req.params.organization_id;

    await organization_user.create({ organization_id, user_id });

    res
      .status(200)
      .json({ message: "User added to organization successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getUserOrgs = catchAsyncError(async (req, res) => {
  try {
    const users = await user.findAll({
      include: {
        model: organization_user,
        where: { organization_id: req.params.organization_id },
        attributes: [],
      },
    });

    res.status(200).json({
      organization_id: req.params.organization_id,
      users: users.map((user) => ({
        user_id: user.id,
        username: user.username,
        email: user.email,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  addOrg,
  getOrgs,
  assignOrg,
  getUserOrgs,
};
