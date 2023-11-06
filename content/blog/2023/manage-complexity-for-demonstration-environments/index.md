---
title: Manage complexity for demonstration environments
date: "2023-11-08"
description: This blogpost presents an idea of using simplified environments for project demonstration purposes.
featuredImage: ./riding-backwards-on-rope.png
---

![featured image - riding-backwards-on-rope](riding-backwards-on-rope.png)

Dev/prod parity is one of the [twelve-factor app](https://12factor.net/) principles. It clearly encourages us to “Keep development, staging, and production as similar as possible”. It is a very important rule and we try to follow it in most of the projects we work on. However, as for every rule, we can see exceptions (that of course are followed by tradeoffs).

In the past we used Vagrant to create development environments using Chef cookbooks to provision them with the same software as production. Nowaday, we use Kubernetes to create development environments and Helm charts to provision them with the same software as production (using the same Docker images). 
From a developer's perspective these approaches have disadvantages. They are slow to start, developer’s experience is mediocre at best (compared e.g. to live-reload some frameworks provide), and troubleshooting requires understanding the technologies that are running them (e.g. Chef or Kubernetes). What is often worse, automation often does not help these problems. It is very hard to learn higher-level automation frameworks without understanding the basics. Writing Chef cookbooks without basic knowledge of Linux and Ruby or creating Helm charts without understanding Docker and Kubernetes is like trying to learn to ride a bike for the first time by riding backwards on a rope over a cliff.

For product development teams this steep learning curve is acceptable as they will use the tools on a daily basis (even if they need to learn them) and they will benefit greatly from using them. However, for the “scouts” like architects, who want to evaluate the software without investing much time in running and maintaining the environment, running a full-blown environment might be a big obstacle. They want to try the software as soon as possible, without spending time on learning how to use all the shiny tools the development team uses.

This is where we asked ourselves: is dev/prod parity the best solution for demo environments?

What alternatives do we have? The answer to this question is not as straightforward as we would like it to be, so let’s work on an example -  have a stateless web application that keeps its state in a database. Normally, (especially if this application is part of a more complex platform) we would containerize it and run with Kubernetes Deployment together with database Stateful Set. But modern cloud offers much simpler methods of running containerized applications without the need to learn Kubernetes, Chef or any Infrastructure as Code frameworks like Terraform. Services such as Google Cloud Run or AWS Beanstalk enable running containers with just a few clicks in their web consoles or single CLI command in serverless fashion.

Of course, we are left with the issue of the database, which needs persistence (which, in turn, is not a native functionality of serverless platforms). But also in this case we can rely on cloud services e.g., we can configure managed database service and use it with our container running in GCP Cloud Run (such setup is usually equally simple as using aforementioned container execution services).. In some cases, we can go a step further and completely abandon the external database (e.g. replacing it with in-memory database or local container filesystem).

As we mentioned at the beginning, this setup is not free of tradeoffs. Here are some of them:
- no dev/prod parity - the production environment is not the same as the demonstration environment and sometimes requires small hacks and/or workarounds (e.g. in-memory database),
- performance - the web application container resources are limited and the performance can be worse than on the production environment with e.g Kubernetes,
- the data is not persistent - the web application container is serverless, so the data stored in the container is not persistent,
- reliability - the number of application replicas is limited to single instance by lack of database sharing,
- costs - running workloads in serverless environments such as Google Cloud Run or AWS Beanstalk is more expensive than running the same workload using similar resources in Kubernetes.

As you can see, the list of tradeoffs is not a short one. This is the cost of making things simpler and reducing cognitive load required to attend potential partners and customers for more advanced products. Enabling engineering teams with various skill sets to explore or do a quick proof of concept is a key factor, which makes these tradeoffs acceptable in a given context.

This concludes our demo/prod environments parity discussion. The twelve-factor app principles are the foundation for building web applications. However, they are not the golden rules, and as always, everything depends on the context. 
