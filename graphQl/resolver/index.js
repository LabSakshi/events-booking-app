const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
};

module.exports = rootResolver;

// .populate("creator") //This replaces creator ObjectId with actual User object
// now users could book event as well
// every user should have access to all the events
// user should have bookedEvents extra key
// book events mutataion with input as userId and event id
// event should get updated with userId that has booked the event
// and user should get updated with event it has booked
