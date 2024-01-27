---
title: How to manage your time as a software engineer - 5 practical tips and tools
date: "2024-01-30"
description: In this post, we will share 5 practical tips and tools that help us manage time and keep our productivity high.
featuredImage: ./software-engineer-manages-time.png
---

![Software engineer manages time](software-engineer-manages-time.png)

In this post, we will share 5 practical tips and tools that help us manage time and keep our productivity high. 

> Spoiler alert: there will be no breakthroughs and no silver bullets in this post. You probably know or at least heard about most of the techniques and tools we will describe. What we want to do through this post is to add a software engineering perspective to the time management topic. We will also share some of the tools that we use to manage our time.

## 1. Deep focus and Pomodoro techniques
Working as a software engineer taught us that there is no silver bullet when it comes to productivity. Some days, you have many small tasks you need to complete, and some days, you have a single big task you need to focus on.

Depending on the type of our daily plan, we use different techniques and tools to help us stay focused and productive.

When we have many small tasks that we need to complete (e.g., writing documentation, reviewing pull requests, red-green-refactor coding of already designed applications, or writing an architecture decision record), we use the `Pomodoro` technique. This technique uses a timer to break down work into intervals, traditionally 25 minutes in length (however, depending on the type of tasks, we make it up to 55 min per task in a row), separated by short breaks. It is a great way to stay focused and get many small things done. Pomodoro also does a great job for pair programming sessions.

However, the Pomodoro technique is not the best way to get into the flow state (e.g., designing/coding a more demanding module, reverse engineering a system that needs refactoring, writing a blog post, preparing a presentation). These activities require "loading everything to your cache" to understand or present the problem. In these cases, we try to get into a `deep focus`, which is nothing else than giving all your brain power to a single but very complex task for a longer period. There is no rule on how long the deep focus session should last. It depends on the task, the person, the mood, and many other factors. However, there are two rules that we always try to follow: **limit distractions** and **take breaks**.

**Tooling**
- For the Pomodoro technique, thanks to its simplicity, all you need is a timer. We use the following tools:
   - Physical timer (our favorite one)
   - [Pomodoro Timer](https://pomofocus.io/)
   - [Be Focused](https://xwavesoft.com/be-focused-pro-for-iphone-ipad-mac-os-x.html) (macOS app)
- While the deep focus technique we tend to limit the tooling to the minimum. Read the following sections to learn more about it.

## 2. Turn off notifications
Limiting distractions helps not only during the deep focus but also during the Pomodoro sessions. Of course we don't recommend ignoring your teammates for the whole day. Instead, we recommend planning your day with a few hours of uninterrupted time. One of the techniques we use in the teams we work with is so-called `focus hours`. As a team, we agree on a few (usually 2-3) hours during the day when we don't plan meetings and do not expect quick responses to our messages. This approach helps especially with deep focus sessions. When we work most of the day with the Pomodoro technique, we plan a session for communication every 2-3 Pomodoros. This way we can focus on the task at hand and still be available for our teammates.

**Tooling**
- macOS [Do Not Disturb](https://support.apple.com/guide/mac-help/turn-a-focus-on-or-off-mchl999b7c1a/mac) feature
- Slack [pause notifications](https://slack.com/help/articles/214908388-Pause-notifications-with-Do-Not-Disturb)
- Calendar `focus time` event (various calendars support this feature, e.g. [Google Calendar](https://support.google.com/calendar/answer/11190973?hl=en&co=GENIE.Platform%3DDesktop) or [Microsoft Teams](https://answers.microsoft.com/en-us/msteams/forum/all/focus-time-microsoft/d095b0bf-f5ea-4301-89f6-c79c5db9d02e))
- There are also hardware solutions that can help you limit distractions and communicate your availability to your teammates. Just as an example, look at the [busy light Amazon search results](https://www.amazon.com/s?k=busy+light).

## 3. Take breaks and drink water
We know it might sound cliché, but we tried both approaches with or without regular breaks. We can tell you that taking breaks is a game-changer for keeping your productivity high throughout the day.

During the Pomodoro we usually take a break after every session. We use this time to stand up, stretch, change the desk's position (from sitting to standing or back), drink coffee, and talk to our teammates. This way we get back to the next session with a fresh mind, ready to switch context and start working on a new task.

During the deep focus sessions, breaks are less frequent but even more important. We noticed that taking breaks that change the environment (e.g., going for a walk) helps us to get back to the task with a fresh mind, new ideas, and most often new perspective on the problem at hand (but this is a material for a separate blog post). Also, don't forget to have a glass of water on your desk. We know that might sound simple, but we noticed that staying hydrated helps us stay focused and productive for a longer time.

**Tooling**
- A simple timer will do the job.

## 4. Context switching is expensive, avoid it and use the right tools
This section will focus on the tools and techniques, as we believe there is consensus that context switching is expensive and should be avoided.

One of the techniques that we use to avoid unwanted context-switching is to plan our day. We use the [Getting Things Done](https://gettingthingsdone.com/) (GTD) approach to plan for it (however, we modified it a bit to fit our needs). In short, GTD is a methodology for organizing tasks into actionable items (it uses of the divide-and-conquer approach). One of the greatest benefits we like in GTD is that it makes more space in our "RAM" (brain) for the actual work. We don't need to remember what we need to do. We just need to check our GTD board and pick the next task. This way, we can focus on the task at hand and not worry about forgetting something. Here's a sample board that we use for managing our tasks (and yes, this probably looks familiar to you):

<table border="1">
  <tr>
    <th>Inbox</th>
    <th>Now</th>
    <th>Next</th>
    <th>Waiting for</th>
    <th>Done</th>
    <th>Backlog/Someday</th>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

We recommend reading the [GTD book](https://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563) to learn more about the approach, but in a nutshell, the board above works the following way:
- `Inbox` is our "brain dump" place. Whenever we think of something we need to do, we put it in the inbox. We don't worry about the task's priority or complexity at this stage. Only two things matter: **don't worry about this task any more** and **don't forget about it**.
- `Now` is where we put tasks that we want to complete during the next iteration (e.g., today, this week, sprint, etc.). We try to limit the number of tasks in this column so that we can focus on the most important ones.
- `Next` is the place where we put candidates for the next iteration. Most often they need some refinement before we can move them to the Now column.
- In `Waiting for` we put in here tasks that require some external action before we can complete them. For example, we put tasks that require a response from a customer or teammate in this column.
- `Done` is the place where we put tasks that we completed. We use this column to track our progress and to have a sense of accomplishment. We noticed that cleaning this column gives us a lot of satisfaction ;).
- Finally, `Backlog/Someday` is the place where we put tasks that we want to do in the future but not now. We use this column to keep our `Inbox` clean and to avoid forgetting about activities we want to do in the future. We review it regularly to make sure that we don't miss anything important but also to remove tasks that are not relevant anymore.

Now, some of you might ask how the GTD board complies with Jira or whatever tool your team uses to manage project. We treat GTD as a tool at a personal level. We often work on multiple projects at the same time, so we need a tool that helps us manage our time and tasks across and between projects. We use the GTD board to manage our time and tasks. We use the team's tooling to manage the project tasks. We found this approach to be the most effective for us. Also, ask yourself how many times there was an activity you had to do that was not worth putting in the team's Jira. In these cases, we have a go-to place to put these tasks.

**Tooling**
- [Trello](https://trello.com/) - for managing GTD tasks. It is so far the best tool we found because of its [automation capabilities](https://trello.com/guide/automate-anything).


## 5. When you don't know how, timebox it
The last one might also sound like a slogan (_hey, we didn't promise breakthroughs, remember?_), but we found it useful to keep tracking the time we spend on tasks. There are no rules on how long the timebox should be. The rule here is once the time is over, you need to decide. Either you:
- `know enough` and finish the timebox,
- you `don't know enough`, and you abort the task or find alternative solutions,
- or you `extend the timebox`.

Either of the outcomes is fine. The important thing is that you don't spend too much time on a single task if you don't believe that you are making progress or it is important enough to spend more time on it. Sometimes, we decide to put the task back to `Someday` and get back to it later when we know more about the problem or when we have more time to spend on it.

**Tooling**
- Yes, you guessed it right - a timer and a Trello displaying other tasks we need to complete are enough.

## Conclusion
We presented five techniques and tools that help us thrive as software engineers and keep our productivity stable and at a high level. We hope you find them useful. If you have any questions or comments, please let us know using social media.
