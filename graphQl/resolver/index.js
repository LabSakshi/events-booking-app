const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");

const getUserById = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) throw new Error("User not found");

    return {
      ...foundUser._doc,
      _id: foundUser.id,
      createdEvents: getEventsByIds.bind(this, foundUser._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const getEventsByIds = async (eventIds) => {
  try {
    const foundEvents = await Event.find({ _id: { $in: eventIds } });
    return foundEvents.map((event) => ({
      ...event._doc,
      id: event.id,
      date: event._doc.date.toISOString(),
      creator: getUserById.bind(this, event.creator),
    }));
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const allEvents = await Event.find();
      return allEvents.map((event) => ({
        ...event._doc,
        _id: event.id,
        creator: getUserById.bind(this, event._doc.creator),
      }));
    } catch (err) {
      throw err;
    }
  },

  users: async () => {
    try {
      const allUsers = await User.find();
      return allUsers.map((user) => ({
        ...user._doc,
        _id: user.id,
        createdEvents: getEventsByIds.bind(this, user._doc.createdEvents),
      }));
    } catch (err) {
      throw err;
    }
  },

  createEvent: async ({ eventInput }) => {
    const { title, description, price, date } = eventInput;
    const creatorId = "682ff4affc6aef88a98951aa"; // hardcoded for now

    const event = new Event({
      title,
      description,
      price,
      date: new Date(date),
      creator: creatorId,
    });

    try {
      const savedEvent = await event.save();

      const createdEvent = {
        ...savedEvent._doc,
        _id: savedEvent._id.toString(),
        date: savedEvent._doc.date.toISOString(),
        creator: getUserById.bind(this, savedEvent._doc.creator),
      };

      const creatorUser = await User.findById(creatorId);
      if (!creatorUser) throw new Error("User not found");

      creatorUser.createdEvents.push(event);
      await creatorUser.save();

      return createdEvent;
    } catch (err) {
      throw err;
    }
  },

  createUser: async ({ userInput }) => {
    const { email, password } = userInput;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User exists already");

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      return {
        ...savedUser._doc,
        password: null,
        _id: savedUser.id,
      };
    } catch (err) {
      throw err;
    }
  },
};

// .populate("creator") //This replaces creator ObjectId with actual User object
// now users could book event as well
// every user should have access to all the events
// user should have bookedEvents extra key
// book events mutataion with input as userId and event id
// event should get updated with userId that has booked the event
// and user should get updated with event it has booked
