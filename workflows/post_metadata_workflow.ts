import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import SecretEvent from "../events/metadata.ts";

/** */
const PostMetadataWorkflow = DefineWorkflow({
  callback_id: "post_metadata_workflow",
  title: "Send a message with metadata",
  description: "Send a message to channel that contains some metadata",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity"],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/future/functions#open-a-form
 */
const inputForm = PostMetadataWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Send message w/ metadata",
    interactivity: PostMetadataWorkflow.inputs.interactivity,
    submit_label: "Send metadata message",
    fields: {
      elements: [{
        name: "channel",
        title: "Channel to send message to",
        type: Schema.slack.types.channel_id,
        default: PostMetadataWorkflow.inputs.channel,
      }, {
        name: "message",
        title: "Message",
        type: Schema.types.string,
        long: true,
      }, {
        name: "metadata",
        title: "Metadata",
        type: Schema.types.string,
      }],
      required: ["channel", "message", "metadata"],
    },
  },
);

PostMetadataWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: inputForm.outputs.fields.channel,
  message: inputForm.outputs.fields.message,
  metadata: {
    event_type: SecretEvent,
    event_payload: {
      secret: inputForm.outputs.fields.metadata,
    },
  },
});

export default PostMetadataWorkflow;
