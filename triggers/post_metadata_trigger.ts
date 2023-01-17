import { Trigger } from "deno-slack-api/types.ts";
import PostMetadataWorkflow from "../workflows/post_metadata_workflow.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const messageTrigger: Trigger<typeof PostMetadataWorkflow.definition> = {
  type: "shortcut",
  name: "Send a metadata-ful message",
  description: "Send a message to channel with metadata attached",
  workflow: "#/workflows/post_metadata_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default messageTrigger;
