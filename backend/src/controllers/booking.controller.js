import VisitBooking from '../models/visitBooking.model.js';

// Admin: Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await VisitBooking.find()
      .populate('property_id', 'title')
      .populate('agent_id', 'full_name')
      .sort({ visit_date: -1 });

    const mappedBookings = bookings.map(b => {
      const doc = b.toObject();
      return {
        ...doc,
        id: doc._id,
        property_title: doc.property_id ? doc.property_id.title : 'N/A',
        agent_name: doc.agent_id ? doc.agent_id.full_name : 'Unassigned'
      };
    });

    res.json(mappedBookings);
  } catch (error) {
    console.error('Get Bookings Error:', error);
    res.status(500).json({ message: 'Error fetching lead orchestration' });
  }
};

// Public: Initiate booking
export const addBooking = async (req, res) => {
  const { property_id, agent_id, visitor_name, visitor_email, visit_date, visit_time, notes } = req.body;
  try {
    const newBooking = await VisitBooking.create({
      property_id, agent_id, visitor_name, visitor_email, visit_date, visit_time, notes,
      booking_status: 'Pending'
    });
    res.status(201).json({ message: 'Booking request sent', bookingId: newBooking._id });
  } catch (error) {
    console.error('Add Booking Error:', error);
    res.status(500).json({ message: 'Error initiating booking' });
  }
};

// Admin: Update booking status
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { booking_status } = req.body;
  try {
    await VisitBooking.findByIdAndUpdate(id, { booking_status });
    res.json({ message: 'Booking status synchronized' });
  } catch (error) {
    console.error('Update Booking Error:', error);
    res.status(500).json({ message: 'Error updating booking' });
  }
};
