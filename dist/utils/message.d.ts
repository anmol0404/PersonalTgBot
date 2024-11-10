export declare const delMessagesDescription: string;
export declare const addCommandDescription = "\uD83D\uDCE5 Add Command Usage\n\nUse `/add` with the following details:\n\n`/add botusername promoUsername startId fromChat toChat collectionAIO endFrom`\n\nArguments:\n- botusername: Bot's username for the command.\n- promoUsername: Username for promotions.\n- startId: Starting message ID.\n- fromChat: Source chat ID.\n- toChat: Destination chat ID.\n- collectionAIO: Collection identifier.\n- endFrom: Last message ID in the range.\n\nExample:\n`/add myUsername promoUser 1000 -123456789 -987654321 42 1100`\n\nNote: Ensure all IDs (startId, fromChat, toChat, collectionAIO, endFrom) are numeric to avoid errors. Authorized users only.";
export declare const mkcollectionDescription = "\uD83D\uDCC2 Collection Command Usage\n\nUse this command with these details:\n\n`/mkc botUsername backupLink collectionAIO`\n\nArguments:\n- botUsername: Bot\u2019s username related to the command.\n- backupLink: Backup link for this bot.\n- collectionAIO: Numeric identifier for the collection.\n\nExample:\n`/mkc myBot backupLinkHere -1003878894784`\n\nNote: If any argument is missing or `collectionAIO` is non-numeric, an error will occur. Authorized users only.";
export declare const aifileCommandDescription = "\uD83D\uDCC1 AI File Command Usage\n\nUse `/aifile` with these details:\n\n`/aifile botUsername promoUsername quality startId fromChat toChat collectionAIO endFrom`\n\nArguments:\n- botUsername: Bot\u2019s username associated with the command.\n- promoUsername: Username for promotions.\n- quality: Content quality setting (e.g., 480p, 720p, 1080p, HD, 4K).\n- startId: Starting message ID.\n- fromChat: Source chat ID.\n- toChat: Destination chat ID.\n- collectionAIO: Collection identifier.\n- endFrom: Ending message ID.\n\nExample:\n`/aifile myBot promoUser 480p 1000 -123456789 -987654321 42 1100`\n\nNote: All IDs (startId, fromChat, toChat, collectionAIO, endFrom) must be numeric. Authorized users only.";
export declare const postBotDescription = "\nUsage of /post command:\n\nTo create a post with caption, image, and buttons, follow this format:\n\n`/post <caption> , <image URL> , <button1(label)(link)> <button2(label)(link)> ...`\n\n### Parameters:\n\n1. Caption (Optional):\n   - The first part can be your caption (text) for the post. \n   - If no caption is provided, the post will be sent without any text above the image or content.\n   \n2. Image URL (Optional):\n   - The second part is an image URL (image url  or telegram photo link). \n   - If no image is provided, the post will display only the caption and buttons.\n   - Example: `https://example.com/image.jpg`\n\n3. Buttons:\n   - Buttons are defined in the format: `button1(label)(link)`\n   - You can add multiple buttons, and they will be grouped into rows.\n   - Buttons in the same row are separated by spaces, and rows are separated by commas.\n   \n### Example Commands:\n\n1. Post with Caption, Image, and Buttons in One Row:";
