---
title: Making better architectural decisions thanks to slow thinking
date: "2025-05-19"
description: In this blog post, we explore how embracing slow, analytical thinking, supported by Architecture Decision Records, can lead to more deliberate and durable architectural decisions.
featuredImage: ./software-architecture-slow-thinking.png
---

![Software architecture](./software-architecture-slow-thinking.png)

Have you ever made a technical decision and later questioned if it was truly the best choice? As software architects, we've all experienced situations where quick, intuitive decisions seemed correct initially but later created unexpected problems. This is exactly why Architecture Decision Records (ADRs) are invaluable. ADRs encourage a deliberate and analytical approach to decision-making, known as System 2 thinking, a concept described by Daniel Kahneman in his influential book ["Thinking, Fast and Slow"](https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555).

## **ADRs**

Architecture Decision Records are short, structured documents that clearly record key architectural decisions and the reasons behind them. Typically, ADRs include:

* Context: Information about why a decision is necessary, including background and relevant factors.
* Considered Options: Alternatives evaluated while making the decision.
* Decision: The chosen solution, along with the reasons behind it and expected outcomes.

Writing decisions this way forces you to explicitly compare your options, clearly showing benefits and trade-offs.


## **Why context matters**

Context is essential because architects often need to compare technologies that initially seem very different, like comparing apples to oranges. While these may seem impossible to compare directly, establishing clear criteria (like comparing fruits based on "skin hardness") allows for meaningful evaluation. Similarly, when choosing technologies, clearly defined context reveals exactly what attributes matter most.

For example, comparing a serverless solution to Kubernetes might initially seem impossible. However, once you define the context clearly, such as "ease of scaling under variable load," you have a specific criterion to help compare the solutions effectively.


## **Activating slow (System 2) thinking**

According to Kahneman, our minds operate in two modes:
* *System 1*: Intuitive, fast, and automatic. It relies on immediate impressions and quick judgment.
* *System 2*: Analytical, slower, and deliberate. It requires careful evaluation and logical reasoning.

Architectural decisions often have long-lasting consequences, making them expensive or difficult to reverse. Relying exclusively on intuition (System 1) can be risky. Taking time to create ADRs explicitly activates System 2, encouraging architects to carefully articulate context, consider multiple alternatives, and thoughtfully evaluate their implications.


## **Improving context and decisions**

In practice, your first attempt at defining the context and options is rarely perfect. As you explore alternatives, you’ll often discover additional factors you hadn’t initially considered. Regularly updating and refining the ADR context ensures your decisions become stronger and more complete.

Imagine deciding on a database solution. Initially, your primary context might be focused on read performance. But as you dig deeper, you realize ease of operational maintenance is equally critical. Updating the ADR context to include this criterion encourages a more balanced, thoughtful decision.

Another useful practice is clearly documenting Architecture Drivers (key architectural requirements or principles important to your project) and reviewing them with every major decision.


## **Joint evaluations**

Kahneman highlights that joint evaluations (assessing multiple alternatives simultaneously) lead to better, more consistent decisions than evaluating options individually. Single evaluations, based mostly on intuition, tend to miss key differences because they lack a direct comparison.

To illustrate, Kahneman describes an experiment comparing two used dictionaries:
* `Dictionary A`: Published in 1993, 10,000 entries, condition "like new".
* `Dictionary B`: Published in 1993, 20,000 entries, slightly damaged cover but otherwise "like new".

When evaluated separately, people preferred Dictionary A due to its better condition. But when evaluated together, Dictionary B became clearly preferable, as it offered twice the number of entries - an advantage that was more obvious when compared side-by-side.

This insight directly applies to software architecture. Instead of evaluating technologies individually, use ADRs to evaluate them side-by-side. Joint evaluations help reveal key differentiators, leading to more informed and consistent decisions.


## **Lessons from other domains**

Kahneman points out that fields like justice or public policy sometimes make mistakes by relying heavily on single, isolated evaluations, leading to inconsistent or unfair outcomes. Similarly, in software architecture, narrow or intuitive decision making can lead to costly mistakes or regrets.

Incorporating ADRs into your decision making process helps avoid these pitfalls by encouraging joint evaluations, careful comparisons, and deeper analytical thinking.


## **Final thoughts**

As software architects and technology leaders, the decisions we make significantly impact the projects we work on. Using ADRs intentionally engages our analytical System 2 thinking, ensures clearer contexts, facilitates iterative improvements, and encourages consistent, joint evaluations of technology choices.

By adopting ADRs, you become a more thoughtful decision maker and clearer communicator, ultimately improving the quality and durability of the architectures you create.

If you frequently make important technical decisions at work, we highly recommend reading Daniel Kahneman's "Thinking, Fast and Slow". It provides invaluable insights to enhance decision-making in professional and personal contexts alike.
