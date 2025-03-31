---
title: Using generative AI as an architect buddy for creating architecture decision records
date: "2025-03-31"
description: In this article, we’ll share our experiences with leveraging AI to efficiently generate high-quality Architecture Decision Records. We'll discuss practical techniques, provide examples, and outline the benefits and challenges we've encountered.
featuredImage: ./architect-ai-buddy.png
---

![AI buddy](./architect-ai-buddy.png)

As software architects, we know how valuable Architecture Decision Records (ADRs) are for documenting critical decisions clearly. However, we also understand that creating detailed ADRs can feel tedious and time-consuming. That's why we've started using generative AI as a helpful assistant to streamline the ADR creation process.

In this article, we’ll share our experiences with leveraging AI to efficiently generate high-quality Architecture Decision Records. We'll discuss practical techniques, provide examples, and outline the benefits and challenges we've encountered.


## How we practically use AI in the ADR process

An effective ADR typically consists of three key sections:
* **Context**: Explains the background and the critical factors that led to the decision. Even if not every detail is captured, a well-described context helps future readers understand the reasoning behind our choices.
* **Considered options**: Lists possible alternatives we evaluated. Sometimes, if there was clearly only one viable option, we combine this section with the context.
* **Decision**: Clearly defines our selected solution, along with its rationale. We typically describe the expected consequences - what will become easier, what might get harder, and necessary adjustments for the team and architecture.

To effectively integrate generative AI into ADR creation, we've adopted a structured, iterative approach that involves carefully constructed prompts.

Since generative AI currently (checked on GPT 4o, 4.5, o1, o3; Claude 3.7 Sonet; Gemini 2) struggles with independently capturing accurate context, we always start by clearly providing that context ourselves. From there, we use iterative prompting with AI:

1. First, we provide a detailed context and ask AI to generate a few considered options, along with their pros and cons.
2. After reviewing these options, we prompt the AI again, explicitly asking it to recommend a decision based on deeper analysis and project-specific factors.
3. Once we select an option, we explicitly ask AI to outline its consequences - what will become easier, more difficult, and what adjustments may be necessary for the team and our architecture.
4. Finally, we prompt AI to re-examine the decision thoroughly to make sure no better solution exists, ensuring we haven't overlooked important aspects.

This iterative approach helps us progressively refine the AI-generated content, ensuring clarity, accuracy, and practical applicability.


## Example prompts

Here are some practical examples of prompts we’ve successfully used when leveraging AI for ADR creation. First prompt (`<base-prompt>`) to define context clearly:

```markdown
As an experienced software architect who specializes in modern software development, continuous delivery, and architecture trade-off analysis you were asked to prepare an architecture decision record.
You have an analytical approach to the topics you consider. You try to objectively see the advantages and disadvantages of each option so that you can choose the one that best suits the situation.

Given the following context (inside triple quotes):
"""
<Your detailed context here>
"""
```

When additional architectural drivers or user stories are relevant, we add those details as follows:


```markdown
<base-prompt>

Also, you consider the project in which you are working, the team, and the architecture drivers (inside triple quotes):
"""
<your archiecture drivers document>
"""
```

We recommend using a new session for each prompt to avoid AI using hallucinations from the previous session.

Next, we ask for considered options clearly detailed with pros and cons:


```markdown
<base-prompt>
Provide a list of 2 to 5 viable options with their pros and cons.
```

Then we review the options and typically we have our own (human) brainstorming session to decide which option is the best. After reviewing these options, we typically ask the AI to further refine the recommendation:


```markdown
<base-prompt>

The options you are considering are (inside triple quotes):
"""
1. Option 1 with pros and cons
2. Option 2 with pros and cons
3. Option 3 with pros and cons
"""
For each option consider pros and cons. Next, look at the list of options and consider the most fitting option to a given context and write the decision in the following form:
‌"""
In the context of <use case/user story u>, facing <concern c> we decided for <option o>, to achieve <system qualities/desired consequences>, accepting <downside d/undesired consequences>, because <additional rationale>.
"""
```

To explicitly address consequences, we ask:


```markdown
<base-prompt>
We decided on <option> because (inside triple quotes):
"""
<Decision and rationale>
"""
List the consequences clearly (what becomes easier, more difficult, and necessary adjustments) in the form:
"""
Easier:
<bullet points>
More difficult:
<bullet points>
Necessary adjustments:
<bullet points>
"""
```

Finally, to ensure thoroughness, we perform a final check:


```markdown
Look again at the context, considered options, the decision, and consequences. 
Confirm whether there's a better option (even new or combined) and state your final decision clearly, including the rationale.
```

The last prompt is a good way to ensure that you have considered all the options and their consequences before making the final decision. Be aware that 90% of the time AI will suggest some "hybrid" or "combination" of the previous options that needs to be ignored most of the time. But the important part of this check is the rationale behind the decision and the consequences of the decision. It sometimes shows the context aspects you forgot to mention in the context. And hence the iteration starts again.


## Benefits

Generative AI has notably improved our productivity by rapidly creating initial ADR drafts, allowing us to focus more on strategic thinking rather than manual documentation, fixing grammar and spellings. It has also helped us maintain consistency and clarity in our documents, reducing misunderstandings across teams (avoiding ambiguity and mind shortcuts). Additionally, AI suggests improved wording and structure, enhancing readability and quality.


## Challenges and limitations

While AI has been helpful, it’s not without challenges. The biggest limitation we've observed is its difficulty capturing context accurately without detailed guidance from us. Quality greatly depends on the clarity and completeness of the information we provide initially. We also learned to watch carefully for inaccuracies or "hallucinations," especially when AI generates pros and cons for each option. AI sometimes introduces incorrect or exaggerated details, so human validation remains essential.


## Summary

Generative AI has significantly improved how we create Architecture Decision Records, making the process faster and clearer, and helping ensure consistency across documents. However, AI isn't (yet?) a replacement for architect expertise. We must still carefully provide context, validate AI-generated information, and iteratively refine outputs. When combined with human judgment, AI serves as a powerful assistant that enhances our ADRs and makes the entire decision-making process smoother and more effective.
