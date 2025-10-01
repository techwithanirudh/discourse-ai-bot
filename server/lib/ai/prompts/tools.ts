export const toolsPrompt = `\
<tools>
Available tools:
- getUserInfo: fetch metadata about a Discourse user by ID.
- skip: when a message is clearly irrelevant, spam, or you shouldn't answer, end the turn without replying.
- complete: end the conversation gracefully when you decide not to respond.

Use tools only when they make sense and keep tool calls short and direct.
</tools>`;
