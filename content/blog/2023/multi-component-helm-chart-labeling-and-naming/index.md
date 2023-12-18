---
title: Multi-component Helm chart labeling and naming
date: "2023-12-19"
description: This post shows how to create a multi-component Helm chart and generate labels for each component
featuredImage: ./multi-component-chart.png
---

![multi-component chart](multi-component-chart.png)

In the world of Kubernetes, Helm charts are a powerful tool for deploying and managing applications. When you create a new chart using the `helm create` command, one of the artifacts generated is a set of helper functions in a file named `templates/_helpers.tpl`. These functions are designed with single-component charts in mind. But what happens when your application isn't so straightforward? What if your chart consists of multiple components, such as a frontend, backend, database, and cache?

The Helm documentation provides some guidance on this, suggesting the use of the `app.kubernetes.io/component` label for multi-component charts. However, it doesn't go into detail on how to implement these labels. In fact, a search for examples and best practices on this topic yields surprisingly few results. That's why I've decided to share my approach to this problem. In this post, I'll provide an example of a multi-component helper function for Helm charts, and explain how you can use it in your own projects.

## Example helper methods

Going straight to the code, here's an example of a helper function that generates labels for a multi-component chart:

```go
{{/*
Create a default fully qualified component name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
Usage:
{{ include "my-chart.component.fullname" (dict "componentName" "component-name" "context" $) }}
*/}}
{{- define "my-chart.component.fullname" -}}
{{- if .context.Values.fullnameOverride }}
{{- printf "%s-%s" .context.Values.fullnameOverride .componentName | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .context.Chart.Name .context.Values.nameOverride }}
{{- if contains $name .context.Release.Name }}
{{- printf "%s-%s" .context.Release.Name .componentName | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s-%s" .context.Release.Name $name .componentName | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Metadata labels for chart component
Usage:
{{ include "my-chart.component.labels" (dict "componentName" "component-name" "context" $) }}
*/}}
{{- define "my-chart.component.labels" -}}
helm.sh/chart: {{ include "my-chart.chart" .context }}
{{ include "my-chart.component.selectorLabels" (dict "componentName" .componentName "context" .context) }}
{{- if .context.Chart.AppVersion }}
app.kubernetes.io/version: {{ .context.Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .context.Release.Service }}
{{- end }}

{{/*
Selector labels for chart component
Usage:
{{ include "my-chart.component.selectorLabels" (dict "componentName" "component-name" "context" $) }}
*/}}
{{- define "my-chart.component.selectorLabels" -}}
{{ include "my-chart.selectorLabels" .context }}
app.kubernetes.io/component: {{ .componentName }}
{{- end }}
```

Now, you can simply include this helper function in your chart's `templates/_helpers.tpl` file, and use it to generate labels for each component in your chart. For example, here's how you might use it to generate labels for a frontend component:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "my-chart.component.fullname" (dict "componentName" "frontend" "context" $) }}
  labels:
    {{- include "my-chart.component.labels" (dict "componentName" "frontend" "context" $) | nindent 4 }}
spec:
  selector:
    matchLabels:
      {{- include "my-chart.component.selectorLabels" (dict "componentName" "frontend" "context" $) | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "my-chart.component.labels" (dict "componentName" "frontend" "context" $) | nindent 8 }}
    spec:
      containers:
        - name: frontend
          image: nginx
```

Here is the output created by the `helm template` command:

```yaml
---
# Source: my-chart/templates/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-chart-frontend
  labels:
    helm.sh/chart: my-chart-1.0.0
    app.kubernetes.io/name: my-chart
    app.kubernetes.io/instance: my-chart
    app.kubernetes.io/component: frontend
    app.kubernetes.io/version: "0.1.0"
    app.kubernetes.io/managed-by: Helm
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: my-chart
      app.kubernetes.io/instance: my-chart
      app.kubernetes.io/component: frontend
  template:
    metadata:
      labels:
        helm.sh/chart: my-chart-1.0.0
        app.kubernetes.io/name: my-chart
        app.kubernetes.io/instance: my-chart
        app.kubernetes.io/component: frontend
        app.kubernetes.io/version: "0.1.0"
        app.kubernetes.io/managed-by: Helm
    spec:
      containers:
        - name: frontend
          image: nginx
```

## How it works
In short words, most of the work is done by the default helper function `selectorLabels`. Also, the default behavior of `fullname` function is preserved (when the Chart name is the same as the Release name, the Chart name is used as the full name). The only thing that is added is the `componentName` parameter, which is used to generate the `app.kubernetes.io/component` label and component's name postfix.

If you have any questions or suggestions, feel free to leave a comment on social media or send me an email.

Happy helming!