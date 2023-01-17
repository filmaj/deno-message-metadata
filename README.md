# Deno Message Metadata Slack App

This sample app demonstrates how to use a function, two workflows, and two triggers
to a) send messages with metadata embedded to a channel and b) emoji react with a heart
to any message in the channel that contains this app's specific metadata.

## Quick Setup

1. Clone this repo, and either `slack run` or `slack deploy` this app to create an app instance on a Slack workspace somewhere.
2. Create a shortcut trigger for the first workflow in this app (posts a message with metadata to a channel): `slack triggers create --trigger-def ./triggers/post_metadata_trigger.ts`
3. Paste the outputted URL to a channel where you will trigger the bot.
4. Invite the bot to this channel in the workspace you deployed to.
5. You can invoke the trigger, if you want, but this will only execute one of the workflows (posting the message with metadata). If you want to exercise the second workflow, which will listen to this app's specific message metadata / custom event and emoji react to the message with a heart, then continue on!
6. **WARNING** this app is for demonstration purposes, so this part is kinda lazy: in the message metadata event trigger definition file (`triggers/metadata_event_trigger.ts`), at the bottom, is a hard-coded `channel_ids` array. To make this part work, replace this channel ID with a channel ID from the workspace you will be testing this app out in.
  - Very hacky. The 'proper' way to do this would be to [create a trigger at runtime](https://api.slack.com/future/triggers/event#create-runtime) so that this `channel_ids` property could be assigned dynamically.
7. Create an event trigger for the second workflow in this app (reacts with a heart to any message that contains this app's specific metadata custom event - see `events/`): `slack triggers create --trigger-def ./triggers/metadata_event_trigger.ts`
8. Invoke the trigger from step 2, fill out and submit the form. The app will post a message, and shortly after, will react to its own message with a heart.

glhf
