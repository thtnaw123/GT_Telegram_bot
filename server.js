const TelegramBot = require("node-telegram-bot-api");
const token = "6867433759:AAHiB4h6nFbVmvBk0A5oD-ocGz4gSG-OHQ8"; // Replace with your actual bot token

const bot = new TelegramBot(token, { polling: true });

const extractAlphanumeric = (msg) => {
  const regex = /[A-Za-z0-9]{8}/; // Replace X with the desired character length
  const match = msg.text.match(regex);
  return match ? match[0].toUpperCase() : null;
};

const blacklist = new Set();

// Add monitoring for specific keywords and thresholds (optional)
const monitoredKeywords = ["keyword1", "keyword2"];
const thresholds = {
  key1: { value: 10, operator: "gt" }, // gt - greater than, lt - less than
  key2: { value: 5, operator: "lt" },
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const alphanumeric = extractAlphanumeric(msg);

  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    bot.sendMessage(chatId, "Hello dear user");
  }

  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(chatId, "Hope to see you around again , Bye");
  }

  //   console.log(checkThreshold(msg, thresholds));
  //   if (monitoredKeywords.includes(msg.text) && checkThreshold(msg, thresholds)) {
  if (monitoredKeywords.includes(msg.text)) {
    if (!blacklist.has(alphanumeric) && alphanumeric) {
      // Check if alphanumeric has a value
      const channelUsername = "@monitor_test_rrrr"; // Replace with target channel username
      try {
        // Send extracted text to the channel
        await bot.sendMessage(channelUsername, alphanumeric);
        blacklist.add(alphanumeric);
      } catch (error) {
        console.error("Error sending message:", error);
        if (error.message.includes("chat not found")) {
          console.error(
            "Target channel might not exist, have the wrong username, or bot lacks permissions."
          );
        } else if (error.message.includes("Unauthorized")) {
          console.error(
            "Bot might lack 'Send Messages' permission in the channel."
          );
        }
      }
    }
  }
});

// Function to check message against thresholds (optional)
function checkThreshold(msg, thresholds) {
  const value = extractValueFromMessage(msg);
  // Implement logic to extract value from message
  for (const key in thresholds) {
    // console.log("key ", key);
    // console.log(msg.text.includes(monitoredKeywords[0]));
    if (msg.text.includes(key)) {
      const threshold = thresholds[key];
      if (threshold.operator === "gt" && value > threshold.value) {
        return true;
      } else if (threshold.operator === "lt" && value < threshold.value) {
        return true;
      }
    }
  }
  return false;
}

// Function to extract value from message (optional, implement your logic here)
function extractValueFromMessage(msg) {
  // Replace with your logic to extract the value from the message based on your needs
  const regex = /\d+/; // Example: Extract numbers
  const match = msg.text.match(regex);
  return match ? parseInt(match[0]) : null;
}

// Add-on functionality for interacting with channels (further development required)
// This part requires additional libraries and Telegram Bot API exploration to interact with buttons and forms.
// It's beyond the scope of this basic example.

console.log("Bot started...");
