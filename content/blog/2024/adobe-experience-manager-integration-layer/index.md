---
title: How incorporating an integration layer in Adobe Experience Manager (AEM) project saved our clients money
date: "2024-02-27"
description: Knot.x serves as a pivotal integration layer, seamlessly blending content and style from Adobe Experience Manager with data from various sources to create sophisticated personalized websites, revolutionizing the construction and performance of digital platforms while offering flexibility and cost savings, making it a widely adopted solution in Adobe Experience Manager (AEM) projects.
featuredImage: ./composable-aem-architecture.png
---

![Composable AEM architecture](composable-aem-architecture.png)

[Adobe Experience Manager](https://business.adobe.com/products/experience-manager/adobe-experience-manager.html) (AEM) is more than a content management solution for building websites. It is a powerful tool that allows you to create, manage, and deliver digital experiences across different channels. However, when it comes to integrating AEM with other systems, it can be challenging to ensure seamless communication between different platforms. We learned that during work on several global brand projects in earlier stages of our careers.

The recurring challenge of integrating AEM with other systems, such as product information management (PIM), while also ensuring that experiences are delivered in a performant and scalable way to the end-users pushed us to create a dedicated integration layer that helped us to overcome these challenges. This layer was designed to ease delivering complex platforms consisting of AEM (or other CMS) and systems that were delivering content, data, or services. What is more, the concept of the integration layer is still valid today, and we believe that it can be beneficial for many AEM projects. This is why we decided to share our thoughts on this topic with you.

## When you don't know what it is about - it's all about licensing

For those who work with Digital Experiences Platforms, it should be no surprise that a major concern was related to the financial aspect. AEM licenses (on-premises) come at a significant cost, and reducing the number of AEM Publish instances yields substantial savings. Decreasing the number of Publish instances from `10+` to `2` was a transformative step for both international and regional brands.

This transition was made possible by redefining the responsibilities of CMS-centric systems and introducing a dedicated integration layer. Instead of housing all business logic and integrations within a monolithic system, we shifted AEM's role to focus solely on content management (which is its core strength) and the generation of static pages, fragments, or templates. The heavy lifting of data processing, business logic, and integrations was shifted to a place that was designed to handle these tasks efficiently. This approach allowed us to reduce the number of AEM Publish instances, which resulted in significant cost savings.

## Performance and scalability

Another challenge we faced was related to performance and scalability. AEM is a powerful tool, but it is not designed to handle high traffic or complex integrations. We learned it the hard way not once or twice. This was especially true during peak loads, such as marketing campaigns. Scaling AEM instances to handle these loads was not only costly but also inefficient. 

The thin integration layer, a lightweight application written in a reactive paradigm, required significantly less CPU and RAM and was a much better fit for these tasks. Transferring CPU-intensive tasks, such as rendering pages with dynamic content like product details, ratings, prices, cart items, or personalized offers, to the integration layer allowed us to deliver performant and scalable experiences to the end-users. Not to mention reducing the infrastructure costs compared to traditional, CMS-centric architecture.

## Feasibility and maintainability

The third money-saving factor for introducing an integration layer was related to the feasibility and maintainability of the solution. Developing and maintaining AEM projects is expensive. By moving part of the platform outside of AEM, we were able to execute projects with fewer AEM developers, who tend to be quite expensive.

After delivering the first projects it became clear that a great part of the integration patterns, such as circuit breakers, API caching techniques, API fallback strategies, sequenced API invocations, and more, can be abstracted and exposed via "no-code" configuration. This allowed our projects to address integration challenges, not only during happy-case scenarios but also in the event of failures, such as temporary unavailability of APIs. This approach made it easier to find developers with the right skill set and made it easier to maintain the solution for many years. The integration layer was also designed to be modular, which made it easier to add new features or integrations. This was crucial for brands that were constantly evolving and adding new systems to their digital experience platforms.

## Composability and flexibility

There is one more cost-related reason to introduce an integration layer in AEM projects. While integrating data inside AEM is possible, it leads to a tightly coupled solution where replacing or adding new systems is difficult and costly.

The integration layer that we introduced was designed to bring composability into the digital experience platform. It enabled combining different integrations and features to create a custom solution that fits the specific needs of the brand and incorporate the tools that were already in use and people were used to. This was especially important for global brands that had different systems and requirements in different regions. The integration layer allowed us to create a custom solution for each region, while still maintaining a consistent user experience across different channels.

Additionally, the flexibility that came with the integration layer allowed developers to use the best tools for the job. To name a few examples from the projects we worked on, we integrated search engines using Apache Solr, personalization engines, Commerces, PIMs, and more. This flexibility allowed us to effectively solve specific problems, rather than being confined to Adobe's offerings.

## Reusability

That brings us to the last point. Gathering experience from multiple projects, we realized that the integration layer was not only beneficial for the projects we were working on but also for other projects. This is why we decided to wrap the integration layer into a framework called [Knot.x](https://knotx.io/). Our solution was widely embraced across over 10 projects, including several platforms hosting more than 400 brand sites. We shared our insights and concepts at various industry events such as GeeCon, Devoxx, and numerous local tech gatherings. We open-sourced the framework and created a community around it.

## Conclusion

The open-source project *Knot.x* acts as a pivotal integration layer that molds customer experiences across diverse channels by blending content and layout from Adobe Experience Manager with data sourced from various repositories such as Product Information Management (PIM), Commerce, or Customer Relationship Management (CRM) systems. This integration layer enabled Cognifide / Wunderman Thompson Technology to develop sophisticated personalized "dynamic" websites for global brands, thereby reshaping the architecture from AEM-centric to modular and composable. Knot.x revolutionized the creation of product listing pages, product details pages, search result displays, and the dynamic adjustment of related content components like tagged content fragments/pages, blog listings, sitemaps, and navigations. Its impact on server-side generated sites was groundbreaking from development, infrastructure, and cost perspectives. Finally, the reusability of the integration layer allowed us to deliver projects faster and with fewer resources, which resulted in significant cost savings for our clients.