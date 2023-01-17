import { DefineEvent, Schema } from "deno-slack-sdk/mod.ts";

const SecretEvent = DefineEvent({
  name: "secret_message_metadata_event",
  title: "Secret Payload",
  type: Schema.types.object,
  properties: {
    secret: { type: Schema.types.string },
  },
  required: ["secret"],
  additionalProperties: false,
});

export default SecretEvent;
