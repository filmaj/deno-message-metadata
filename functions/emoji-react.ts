import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in Workflows.
 * https://api.slack.com/future/functions/custom
 */
export const EmojiReactFunctionDefinition = DefineFunction({
  callback_id: "emoji_react_function",
  title: "Reacji a message",
  description: "React with a specific emoji to a specific message in a specific channel",
  source_file: "functions/emoji-react.ts",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel ID",
      },
      ts: {
        type: Schema.types.string,
        description: "Message timestamp",
      },
      emoji: {
        type: Schema.types.string,
        description: "Name of the emoji to react with (without colons)"
      }
    },
    required: ["channel", "ts", "emoji"],
  },
});

export default SlackFunction(
  EmojiReactFunctionDefinition,
  async ({ inputs, client }) => {
    try {
      await client.reactions.add({
        channel: inputs.channel,
        name: inputs.emoji,
        timestamp: inputs.ts,
      });
    } catch (e) {
      return { error: e.message };
    }
    return { outputs: { } };
  },
);
