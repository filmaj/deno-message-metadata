import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { EmojiReactFunctionDefinition } from "../functions/emoji-react.ts";

/**
 */
const ReactToMetadataWorkflow = DefineWorkflow({
  callback_id: "react_to_metadata_workflow",
  title: "Emoji React to Metadata",
  description: "Emoji react to a message if it contains our app's metadata",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      ts: {
        type: Schema.types.string,
      },
    },
    required: ["channel", "ts"],
  },
});

ReactToMetadataWorkflow.addStep(EmojiReactFunctionDefinition, {
  channel: ReactToMetadataWorkflow.inputs.channel,
  ts: ReactToMetadataWorkflow.inputs.ts,
  emoji: "heart",
});

export default ReactToMetadataWorkflow;
