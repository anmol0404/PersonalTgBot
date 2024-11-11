import env from "../services/env.js";

export const delMessagesDescription = `🗑️ Bulk Delete Command

To delete messages in a specific range use:

\`/del startId fromChat endFrom\`

Example:
\`/del 1000 -100123456789 1100\`

Parameters:
- startId: Starting message ID to delete.
- fromChat: Chat ID with the messages.
- endFrom: Last message ID in the range.
 

\`/del all\`

- all: Delete all messages in a chat.
Example: \`/del all\` (used in the chat where the bot is).

Note: Only admins can use this command. Bot must also be an admin in the target chat. [mustAdminThisID](tg://user?id=${
  env.userId ? env.userId.toString() : "6950261247"
})`;

export const addCommandDescription = `📥 Add Command Usage

Use \`/add\` with the following details:

\`/add botusername promoUsername startId fromChat toChat collectionAIO endFrom\`

Arguments:
- botusername: Bot's username for the command.
- promoUsername: Username for promotions.
- startId: Starting message ID.
- fromChat: Source chat ID.
- toChat: Destination chat ID.
- collectionAIO: Collection identifier.
- endFrom: Last message ID in the range.

Example:
\`/add myUsername promoUser 1000 -123456789 -987654321 42 1100\`

Note: Ensure all IDs (startId, fromChat, toChat, collectionAIO, endFrom) are numeric to avoid errors. Authorized users only.`;

export const mkcollectionDescription = `📂 Collection Command Usage

Use this command with these details:

\`/mkc botUsername backupLink collectionAIO\`

Arguments:
- botUsername: Bot’s username related to the command.
- backupLink: Backup link for this bot.
- collectionAIO: Numeric identifier for the collection.

Example:
\`/mkc myBot backupLinkHere -1003878894784\`

Note: If any argument is missing or \`collectionAIO\` is non-numeric, an error will occur. Authorized users only.`;

export const aifileCommandDescription = `📁 AI File Command Usage

Use \`/aifile\` with these details:

\`/aifile botUsername promoUsername quality startId fromChat toChat collectionAIO endFrom\`

Arguments:
- botUsername: Bot’s username associated with the command.
- promoUsername: Username for promotions.
- quality: Content quality setting (e.g., 480p, 720p, 1080p, HD, 4K).
- startId: Starting message ID.
- fromChat: Source chat ID.
- toChat: Destination chat ID.
- collectionAIO: Collection identifier.
- endFrom: Ending message ID.

Example:
\`/aifile myBot promoUser 480p 1000 -123456789 -987654321 42 1100\`

Note: All IDs (startId, fromChat, toChat, collectionAIO, endFrom) must be numeric. Authorized users only.`;
export const postBotDescription = `
Usage of /post command:

To create a post with caption, image, and buttons, follow this format:

\`/post <caption> , <image URL> , <button1(label)(link)> <button2(label)(link)> ...\`

### Parameters:

1. Caption (Optional):
   - The first part can be your caption (text) for the post. 
   - If no caption is provided, the post will be sent without any text above the image or content.
   
2. Image URL (Optional):
   - The second part is an image URL (image url  or telegram photo link). 
   - If no image is provided, the post will display only the caption and buttons.
   - Example: \`https://example.com/image.jpg\`

3. Buttons:
   - Buttons are defined in the format: \`button1(label)(link)\`
   - You can add multiple buttons, and they will be grouped into rows.
   - Buttons in the same row are separated by spaces, and rows are separated by commas.
   
### Example Commands:

1. Post with Caption, Image, and Buttons in One Row:`;

export const copyCommandDescription = `
This command allows admins to copy messages from a specified chat and forward them to multiple target chats, preserving the original message captions with customizable edits.

Command Format:
/copy <promoUsername> <startId> <fromChat> <endId> <toChat1> <toChat2> ...

Parameters:
- \`promoUsername\`: A username or identifier to be added in the caption.
- \`startId\`: The message ID from which to start copying.
- \`fromChat\`: The chat ID from where messages will be copied.
- \`endId\`: The message ID at which to stop copying.
- \`toChat(s)\`: One or more chat IDs where messages will be forwarded.

Requirements:
- The bot must have admin permissions in both the source and target chats.
- \`startId\`, \`fromChat\`, \`endId\`, and each \`toChat\` must be valid numeric IDs.

Example Usage:
\`/copy promo123 100 123456789 200 987654321 123123123\`

This command starts copying from message ID 100 in chat 123456789, ending at message ID 200, and forwards each message to chats 987654321 and 123123123.
`;
export const howToCreateSession = `
### How to Create a String Session

To create a string session for your Telegram bot, follow these steps:

1. Send the Command:
   - Start by sending the command /css in your Telegram bot. This command will initiate the process of creating a new string session.

2. Provide Your API Key:
   - Go to [Telegram API](https://my.telegram.org/auth) and generate your API Key.
   - Once you have it, send the API Key to the bot.

3. Provide Your API Hash:
   - Along with the API Key, you will also need to provide the API Hash. This is also available in your Telegram API settings.
   - Send the API Hash to the bot.

4. Enter Your Phone Number:
   - The bot will ask for your phone number. Make sure to enter it in the international format, e.g., +1234567890.
   - Send your phone number to the bot.

5. Receive OTP:
   - The bot will send an OTP (One-Time Password) to your phone number. Check your phone for the code.

6. Provide the OTP:
   - Enter the OTP that was sent to your phone and send it to the bot.

7. Session Creation:
   - Once the OTP is verified, the bot will create a string session for you. 
   - The bot will then send you the session string. This is a long alphanumeric string that represents your active session.
`;
