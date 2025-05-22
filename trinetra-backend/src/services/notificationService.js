module.exports.sendSOS = async (contacts, message) => {
  // Integrate with Twilio, SendGrid, or FCM here
  for (const contact of contacts) {
    // send SMS/email/push
    console.log(`Sending SOS to ${contact.phone || contact.email}: ${message}`);
  }
}; 