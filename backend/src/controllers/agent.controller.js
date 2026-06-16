import Agent from '../models/agent.model.js';

// Public: Get all experts
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ rating: -1 });
    // Map _id to id for frontend compatibility
    const mappedAgents = agents.map(agent => ({ ...agent.toObject(), id: agent._id }));
    res.json(mappedAgents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expert network' });
  }
};

// Admin: Onboard expert
export const addAgent = async (req, res) => {
  const { full_name, email, cell_no, cnic, operational_area, office_address, experience, rating, specialization, commission, status, bio } = req.body;
  const profile_image = req.file ? req.file.path.replace(/\\/g, '/') : 'default_agent.png';
  
  try {
    const newAgent = await Agent.create({
      full_name, email, cell_no, cnic, operational_area, office_address, experience, rating, specialization, commission, status, bio, profile_image
    });
    res.status(201).json({ 
      message: 'Expert successfully onboarded', 
      agentId: newAgent._id,
      agent: newAgent 
    });
  } catch (error) {
    console.error('Add Agent Error:', error);
    res.status(500).json({ message: 'Error during expert onboarding', error: error.message });
  }
};

// Admin: Update expert
export const updateAgent = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  // Remove _id from updateData to prevent Mongoose errors
  delete updateData._id;
  delete updateData.id;

  if (req.file) {
    updateData.profile_image = req.file.path.replace(/\\/g, '/');
  }

  try {
    const updatedAgent = await Agent.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAgent) {
      return res.status(404).json({ message: 'Expert record not found' });
    }
    res.json({ message: 'Expert identity synchronized', agent: updatedAgent });
  } catch (error) {
    console.error('Update Agent Error:', error);
    res.status(500).json({ message: 'Error updating expert record', error: error.message });
  }
};

// Admin: Remove expert
export const deleteAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAgent = await Agent.findByIdAndDelete(id);
    if (!deletedAgent) {
      return res.status(404).json({ message: 'Expert record not found' });
    }
    res.json({ message: 'Expert record purged from network' });
  } catch (error) {
    console.error('Delete Agent Error:', error);
    res.status(500).json({ message: 'Error purging expert record' });
  }
};
