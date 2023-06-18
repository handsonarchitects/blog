---
title: Simple trick to use dynamic values in Helm
date: "2023-06-19"
description: This time we will show you a simple trick we found useful when setting up local or ephemeral k8s environments with a valid domain that supports multiple Ingress entries.
featuredImage: ./navigating-during-storm.png
---

![featured image](navigating-during-storm.png)

This time we will show you a simple trick we found useful when setting up local or ephemeral k8s environments with a valid domain that supports multiple Ingress entries.

## Problem
In the current project we are working on we use Kubernetes to run developer's and production environments to have the closest possible configuration of both. Sometimes developers use local environments, in other cases (when bigger computing power is required) we use ephemeral environments (created for a short time for development) created on-demand in Google Cloud.

Our system consists of multiple services and some of them are exposed via the [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/). To manage the application we use [Helm](https://helm.sh/). To have a near-to-production setup we decided to use [nip.io](https://nip.io/), the "Dead simple wildcard DNS for any IP Address".

At some point, we ended with a couple of entries in the Helm's `values.yaml` such as:

```yaml
serviceA:
  ingress:
    host: a-127-0-0-1.nip.io
# ...
serviceB:
  ingress:
    host: b-127-0-0-1.nip.io
# ...
serviceC:
  ingress:
    host: c-127-0-0-1.nip.io
# ...
serviceD:
  ingress:
    host: d-127-0-0-1.nip.io
```

For the local environment, it was working just fine. However, when we started to use ephemeral environments in GCP it required overriding values in a couple of places, to match the GKE cluster's external IP address.

```bash
   helm install \
      --set serviceA.ingress.host=a-34-117-173-194.nip.io \
      --set serviceB.ingress.host=b-34-117-173-194.nip.io \
      --set serviceC.ingress.host=c-34-117-173-194.nip.io \
      --set serviceD.ingress.host=d-34-117-173-194.nip.io \
      my-app . -f values.yaml
```

It would be much simpler to pass the ingress IP as a single value and use it in all the configurations. Until now, Helm does not support dynamic values in `values.yaml` with some good reasoning for that:
- https://github.com/helm/helm/issues/2492
- https://github.com/helm/helm/pull/6876

## Solution
Fortunately, we were able to use one of [Helm's tips and tricks](https://helm.sh/docs/howto/charts_tips_and_tricks/#using-the-tpl-function) to do the work in that case.

> The `tpl` function allows developers to evaluate strings as templates inside a template. This is useful to pass a template string as a value to a chart or render external configuration files. Syntax: `{{ tpl TEMPLATE_STRING VALUES }}`

Now, the Ingress config in our project's chart could use the `tpl` function:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
# ...
spec:
  rules:
  - host: {{ tpl .Values.serviceA.ingress.host . }}
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: serviceA
            port:
              number: 80
```

And we were able to leverage the chart's default `clusterIp` like:

```yaml
clusterIp: 127-0-0-1
# ...
serviceA:
  ingress:
    host: a-{{ .Values.clusterIp }}.nip.io
# ...
serviceB:
  ingress:
    host: b-{{ .Values.clusterIp }}.nip.io
# ...
serviceC:
  ingress:
    host: c-{{ .Values.clusterIp }}.nip.io
# ...
serviceD:
  ingress:
    host: d-{{ .Values.clusterIp }}.nip.io
```

With this config, overriding the local `127.0.0.1` with the cluster's external IP is as easy as running:

```bash
   helm install \
      --set clusterIp=34-117-173-198 \
      my-app . -f values.yaml
```

Notice, this config will work well if you don't use dynamic values in the `service.ingress.host`.

## Summary
In this short guide, we combined:
- [nip.io](https://nip.io/), the "Dead simple wildcard DNS for any IP Address",
- [Helm's `tpl` function](https://helm.sh/docs/howto/charts_tips_and_tricks/#using-the-tpl-function).

The result was a simpler way to configure Kubernetes external cluster's IP in multiple Ingerss entries.