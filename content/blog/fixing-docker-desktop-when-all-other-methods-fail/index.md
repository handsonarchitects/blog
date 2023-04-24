---
title: Fixing Docker Desktop when all other methods fail
date: "2023-04-25"
description: Docker Desktop is a great tool that helps to save a lot of time during local development. However, it is not perfect and can break down in ways that are hard to restore, especially when you are using an M1 Apple silicon processor...
featuredImage: ./broken-docker.png
---

![broken-docker](broken-docker.png)

Docker Desktop is a great tool that helps to save a lot of time during local development. However, it is not perfect and can break down in ways that are hard to restore, especially when you are using an M1 Apple silicon processor...

Today we would like to share a short script that helps with uninstalling Docker Desktop from MacBooks. The tool offers several [options to troubleshoot](https://docs.docker.com/desktop/troubleshoot/overview/). Unfortunately, there are times, when everything fails (including `purging data`, `resetting to factory defaults`, or even `uninstalling`), especially after quite extensive container deployments, uninstalls, scale-ups, and especially down (don't try to scale your k8s pods to `0`).

We use the following script to uninstall the Docker Desktop for Mac when the options mentioned above fail. It needs the administrator privileges to run:

```bash
#!/usr/bin/env bash
set -x

sudo rm -Rf /Applications/Docker.app
sudo rm -f /usr/local/bin/docker
sudo rm -f /usr/local/bin/docker-machine
sudo rm -f /usr/local/bin/com.docker.cli
sudo rm -f /usr/local/bin/docker-compose
sudo rm -f /usr/local/bin/docker-compose-v1
sudo rm -f /usr/local/bin/docker-credential-desktop
sudo rm -f /usr/local/bin/docker-credential-ecr-login
sudo rm -f /usr/local/bin/docker-credential-osxkeychain
sudo rm -f /usr/local/bin/hub-tool
sudo rm -f /usr/local/bin/hyperkit
sudo rm -f /usr/local/bin/kubectl.docker
sudo rm -f /usr/local/bin/vpnkit
sudo rm -Rf ~/.docker
sudo rm -Rf ~/Library/Containers/com.docker.docker
sudo rm -Rf ~/Library/Application\ Support/Docker\ Desktop
sudo rm -Rf ~/Library/Group\ Containers/group.com.docker
sudo rm -f ~/Library/HTTPStorages/com.docker.docker.binarycookies
sudo rm -f /Library/PrivilegedHelperTools/com.docker.vmnetd
sudo rm -f /Library/LaunchDaemons/com.docker.vmnetd.plist
sudo rm -Rf ~/Library/Logs/Docker\ Desktop
sudo rm -Rf /usr/local/lib/docker
sudo rm -f ~/Library/Preferences/com.docker.docker.plist
sudo rm -Rf ~/Library/Saved\ Application\ State/com.electron.docker-frontend.savedState
sudo rm -f ~/Library/Preferences/com.electron.docker-frontend.plist

sudo rm -rf ~/Library/Group\ Containers/group.com.docker/pki/
sudo rm -rf ~/.kube
```

It is a product of Reddit, StackOverflow and other sources research and we use it 2-3 times a month.

After removing Docker Desktop using the script above, install the new application as usually.
We hope it will help some of you.
