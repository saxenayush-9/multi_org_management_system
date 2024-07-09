const { catchAsyncError } = require("../../../middleware/handleError");
const { organization, organization_user, user } = require("../../model");
const { session, session } = require("../model");

const createSession = catchAsyncError(async (req, res) => {
  try {
    const { user_id } = req.body;

    const newSession = await session.create({
      user_id,
      start_time: new Date(),
    });

    res.status(201).json({
      session_id: newSession.id,
      user_id: newSession.user_id,
      start_time: newSession.start_time,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getSession = catchAsyncError(async (req, res) => {
  try {
    const data = await session.findAll({
      where: Object.assign({}, req.query.id ? { uuid: req.query.id } : {}),
    });

    if (!data) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json({
      session_id: data.id,
      user_id: data.user_id,
      start_time: data.start_time,
      end_time: data.end_time,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const switchOrg = catchAsyncError(async (req, res) => {
  try {
    const { organization_id } = req.body;
    const session_id = req.params.session_id;

    const session = await session.findByPk(session_id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.organization_id = organization_id;
    await session.save();

    res.status(200).json({ message: "Organization switched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createSession,
  getSession,
  switchOrg
};
