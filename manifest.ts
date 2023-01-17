import { Manifest } from "deno-slack-sdk/mod.ts";
import PostMetadataWorkflow from "./workflows/post_metadata_workflow.ts";
import ReactToMetadataWorkflow from "./workflows/react_to_metadata_workflow.ts";
import SecretEvent from "./events/metadata.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "deno-message-metadata",
  description:
    "A sample that demonstrates the sending of and listening to message metadata",
  icon: "assets/default_new_app_icon.png",
  workflows: [PostMetadataWorkflow, ReactToMetadataWorkflow],
  events: [SecretEvent],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "metadata.message:read",
    "reactions:write",
  ],
});
