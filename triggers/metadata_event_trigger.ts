import { Trigger } from "deno-slack-api/types.ts";
import ReactToMetadataWorkflow from "../workflows/react_to_metadata_workflow.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const metadataEventTrigger: Trigger<typeof ReactToMetadataWorkflow.definition> =
  {
    type: "event",
    name: "Secret Metadata Posted",
    description:
      "Reacji to a message if it was posted with this app's metadata",
    workflow: "#/workflows/react_to_metadata_workflow",
    inputs: {
      channel: {
        value: "{{data.channel_id}}",
      },
      ts: {
        value: "{{data.message_ts}}",
      },
    },
    event: {
      event_type: "slack#/events/message_metadata_posted",
      metadata_event_type: "secret_message_metadata_event",
      channel_ids: ["C02ARJE6XNU"],
    },
  };

export default metadataEventTrigger;
