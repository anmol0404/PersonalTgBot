
# Telegram Bot Commands - README

This repository contains the source code for a Telegram bot that provides various administrative commands to manage messages, posts, and collections in different Telegram chats. Below is a guide for each available command and its usage.

## Available Commands

### 1. `/del` - Bulk Delete Command
The `/del` command allows admins to delete a range of messages or all messages from a specified chat.

**Command Syntax:**
```
/del startId fromChat endFrom
/del all
```

- **startId**: The starting message ID to delete.
- **fromChat**: The ID of the chat from which to delete messages.
- **endFrom**: The last message ID to delete in the range.

**Examples:**
```
/del 1000 -100123456789 1100
/del all
```

**Note**: Only admins can use this command, and the bot must also be an admin in the target chat.

---

### 2. `/add` - Add Command
The `/add` command allows you to forward a range of messages from one chat to another, with an optional promotional username.

**Command Syntax:**
```
/add botusername promoUsername startId fromChat toChat collectionAIO endFrom
```

- **botusername**: The bot's username.
- **promoUsername**: The promotional username.
- **startId**: The starting message ID.
- **fromChat**: The source chat ID.
- **toChat**: The destination chat ID.
- **collectionAIO**: Numeric identifier for the collection.
- **endFrom**: The last message ID.

**Example:**
```
/add myUsername promoUser 1000 -123456789 -987654321 42 1100
```

**Note**: Ensure that all IDs are numeric to avoid errors.

---

### 3. `/mkc` - Create Collection Command
This command allows the creation of a new collection in the bot's backend system.

**Command Syntax:**
```
/mkc botUsername backupLink collectionAIO
```

- **botUsername**: The bot's username associated with the command.
- **backupLink**: The link to the backup for this bot.
- **collectionAIO**: Numeric identifier for the collection.

**Example:**
```
/mkc myBot backupLinkHere -1003878894784
```

**Note**: If any argument is missing or the collection identifier is non-numeric, an error will occur.

---

### 4. `/aifile` - AI File Command
This command allows you to process and forward AI-generated files from one chat to another with optional content quality settings.

**Command Syntax:**
```
/aifile botUsername promoUsername quality startId fromChat toChat collectionAIO endFrom
```

- **botUsername**: The bot's username.
- **promoUsername**: The promotional username.
- **quality**: Content quality setting (e.g., 480p, 720p, 1080p, HD, 4K).
- **startId**: The starting message ID.
- **fromChat**: The source chat ID.
- **toChat**: The destination chat ID.
- **collectionAIO**: Numeric identifier for the collection.
- **endFrom**: The last message ID.

**Example:**
```
/aifile myBot promoUser 480p 1000 -123456789 -987654321 42 1100
```

**Note**: All IDs must be numeric.

---

### 5. `/post` - Create Post with Caption, Image, and Buttons
The `/post` command creates a post with an optional caption, image, and buttons.

**Command Syntax:**
```
/post <caption> , <image URL> , <button1(label)(link)> <button2(label)(link)> ...
```

- **Caption**: The text caption for the post (optional).
- **Image URL**: The URL of the image (optional).
- **Buttons**: Buttons in the format `button(label)(link)`; multiple buttons can be grouped in rows.

**Example:**
```
/post Here is the post caption , https://example.com/image.jpg , button1(Label)(http://example.com) button2(Label)(http://example.com)
```

---

### 6. `/copy` - Copy Messages Command
The `/copy` command allows admins to copy messages from a source chat and forward them to one or more target chats, preserving the original message captions with optional edits.

**Command Syntax:**
```
/copy <promoUsername> <startId> <fromChat> <endId> <toChat1> <toChat2> ...
```

- **promoUsername**: The promotional username to include in the caption.
- **startId**: The message ID to start copying from.
- **fromChat**: The chat ID from where messages are copied.
- **endId**: The message ID to stop copying at.
- **toChat(s)**: One or more target chat IDs.

**Example:**
```
/copy promo123 100 123456789 200 987654321 123123123
```

---

## Requirements

- The bot must have admin permissions in both the source and target chats.
- Only authorized users can execute these commands.

## Setup

1. Clone the repository to your local machine or server.
2. Install necessary dependencies (e.g., Node.js, libraries).
3. Set up your environment variables as described in the `env.js` file.

---

## License

This repository is licensed under the MIT License. See LICENSE for more details.
