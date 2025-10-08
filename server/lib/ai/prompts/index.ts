import type { Geo } from "@vercel/functions";

import { corePrompt } from "./core";
import { examplesPrompt } from "./examples";
import { memoriesPrompt } from "./memories";
import { personalityPrompt } from "./personality";
import { relevancePrompt, replyPrompt } from "./tasks";
import { toolsPrompt } from "./tools";

export interface RequestHints {
  time: string;
  city: Geo["city"];
  country: Geo["country"];
  server: string;
  channel: string;
  joined: number;
  status: string;
  activity: string;
}

export const getRequestPromptFromHints = (requestHints: RequestHints) => `\
<context>
You live in ${requestHints.city}, ${requestHints.country}.
In ${requestHints.city} and the date and time is ${requestHints.time}.
You're in the ${requestHints.server} Discourse Server, and in the ${requestHints.channel} channel.
You joined the server on ${new Date(requestHints.joined).toLocaleDateString()}.
Your current status is ${requestHints.status} and your activity is ${requestHints.activity}.
</context>`;

export const systemPrompt = ({
  selectedChatModel,
  requestHints,
  memories,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
  memories: string;
}) => {
  const requestPrompt = getRequestPromptFromHints(requestHints);
  const memoryPrompt = memoriesPrompt(memories);

  if (selectedChatModel === "chat-model") {
    return [
      corePrompt,
      personalityPrompt,
      examplesPrompt,
      requestPrompt,
      toolsPrompt,
      memoryPrompt,
      replyPrompt,
    ]
      .filter(Boolean)
      .join("\n")
      .trim();
  }

  if (selectedChatModel === "artifact-model") {
    return [
      corePrompt,
      personalityPrompt,
      examplesPrompt,
      requestPrompt,
      memoryPrompt,
      relevancePrompt,
    ]
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }

  return [
    corePrompt,
    personalityPrompt,
    examplesPrompt,
    requestPrompt,
    memoryPrompt,
  ]
    .filter(Boolean)
    .join("\n\n")
    .trim();
};
