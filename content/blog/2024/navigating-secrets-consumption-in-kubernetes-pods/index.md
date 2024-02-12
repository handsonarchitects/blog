---
title: Navigating Secrets Consumption in Kubernetes Pods
date: "2024-02-13"
description: In the intricate world of Kubernetes, the management and utilization of secrets within pods and containers demand careful consideration. In this article, we delve into available options, shedding light on how pods and containers are impacted across different scenarios.
featuredImage: ./secrets-in-kubernetes.png
---

![Using secrets in Kubernetes](secrets-in-kubernetes.png)

Kubernetes offers several avenues for consuming secrets within pods and containers, each tailored to accommodate diverse requirements. Understanding the distinctive characteristics of each option is vital for ensuring optimal functionality and resilience in your Kubernetes environment.

One crucial aspect to ponder is the adaptability of secrets to potential changes. Whether your secrets might undergo alterations, expand with new values (keys), or even vanish unexpectedly, it's imperative to evaluate how these transformations could affect your pods. This is particularly crucial when apply such mechanisms as Helm charts, which can dynamicaaly calculate secrets' hashes and update the pods with new values. Then pods should be restarted automatically to apply the new values.

The following paragraphs will explore the various secret consumption options in Kubernetes. All scenarios below are tested on a Kubernetes cluster running version `1.29.1`.


> Important:
> This article does not cover any security aspects of the secrets management in Kubernetes. It is important to remember that secrets are not encrypted by default and are stored in etcd in base64 encoded form.


## Secret as Volume

We begin our exploration with the secret as a volume, a method that mounts the secret data entries as files within the pod's filesystem. This approach is particularly useful when your application requires access to the secret as a file, such as when reading a certificate or key file.

To illustrate the behavior of a pod with a secret mounted as a volume, consider the following scenario:

1. Create a pod with the secret mounted as a volume.
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: pod-with-secret-as-volume
  name: pod-with-secret-as-volume
spec:
  volumes:
  - name: keys
    secret:
      secretName: keys-secret
  containers:
  - image: nginx
    name: pod-with-secret-as-volume
    env:
    - name: PRIVATE_KEY
      value: /etc/keys/key.pem
    - name: PUBLIC_KEY
      value: /etc/keys/key.pub
    volumeMounts:
    - name: keys
      readOnly: true
      mountPath: "/etc/keys"
```
2. Check the status of the pod.
```bash
kubectl get pod pod-with-secret-as-volume
```
The pod will not be created until the secret is present.

3. Create a secret with RSA keys
```bash
openssl genrsa -out key.pem 2048
openssl rsa -in key.pem -pubout -out key.pub
kubectl create secret generic keys-secret --from-file=key.pem --from-file=key.pub
```
4. Check the status of the pod.
```bash
kubectl get pod pod-with-secret-as-volume
kubectl -it exec pod-with-secret-as-volume -- ls -al /etc/keys
kubectl -it exec pod-with-secret-as-volume -- env | grep KEY
```
The expected result is:
```bash
pod-with-secret-as-volume   1/1     Running...
...
lrwxrwxrwx 1 root root   14 Feb 10 12:26 key.pem -> ..data/key.pem
lrwxrwxrwx 1 root root   14 Feb 10 12:26 key.pub -> ..data/key.pub
...
PRIVATE_KEY=/etc/keys/key.pem
PUBLIC_KEY=/etc/keys/key.pub
```
5. Delete the secret and observe the behavior of the pod.
```bash
kubectl delete secret keys-secret
kubectl get pod pod-with-secret-as-volume
kubectl -it exec pod-with-secret-as-volume -- env | grep KEY
```
The expected result is:
```bash
pod-with-secret-as-volume   1/1     Running...
...
PRIVATE_KEY=/etc/keys/key.pem
PUBLIC_KEY=/etc/keys/key.pub
```
When a secret is mounted as a volume, the pod retains the secret's data even if the secret is deleted. This means that the pod continues to function normally, oblivious to the absence of the secret. However, if the pod is deleted and recreated when the secret is not present, the pod will fail to start, as it will be unable to access the secret.

6. Check that files are still present in the pod.
```bash
kubectl -it exec pod-with-secret-as-volume -- cat /etc/keys/key.pub
```
The mounted files are still present in the pod.

When to Use Secret as Volume:
- when your application requires access to the secret as a file
- when you want to mount all the keys from the secret as files
- when the new files should be automatically available in the containers after the new version of an application is deployed (POD is recreated automatically) 
- when the pod's container is aware of the secret's files paths

## Secret as Environment Variables (envFrom)

Another method for consuming secrets in Kubernetes is by injecting them as environment variables using the `envFrom` field in the pod specification. This approach is suitable when your application requires access to the secret as environment variables.

1. Create a pod with the secret injected as environment variables.
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: pod-with-secret-env-from
  name: pod-with-secret-env-from
spec:
  containers:
  - image: nginx
    name: pod-with-secret-env-from
    envFrom:
    - secretRef:
        name: db-secret
```
2. Check the status of the pod.
```bash
kubectl get pod pod-with-secret-env-from
```
The pod will not be created until the secret is present.

3. Create a secret with a database credentials.
```bash
kubectl create secret generic db-secret --from-literal=DB_ADMIN=myadmin --from-literal=DB_PASSWORD=mypass
```
4. Check the pod's details.
```bash
kubectl get pod pod-with-secret-env-from
kubectl describe pod pod-with-secret-env-from | grep -A 2 "Environment"
kubectl exec -it pod-with-secret-env-from  -- env | grep DB_
```
The result should be:
```bash
pod-with-secret-env-from   1/1     Running
...
    Environment Variables from:
      db-secret   Secret  Optional: false
    Environment:  <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-lbrbb (ro)
...
DB_ADMIN=myadmin
DB_PASSWORD=mypass
```
5. Delete the secret and observe the behavior of the pod.
```bash
kubectl delete secret db-secret
kubectl get pod pod-with-secret-env-from
kubectl exec -it pod-with-secret-env-from  -- env | grep DB_
```
The result should be:
```bash
pod-with-secret-env-from   1/1     Running
...
DB_ADMIN=myadmin
DB_PASSWORD=mypass
```
As observed in this scenario, the pod is not restarted when the secret is deleted and environment variables loaded during the pod's creation still persist.

7. Recreate the secret with a new database password and a new key-value pair.
```bash
kubectl create secret generic db-secret \
--from-literal=DB_ADMIN=myadmin \
--from-literal=DB_PASSWORD=mynewpass \
--from-literal=DB_URL=mydb
```
8. View the environment variables in the pod.
```bash
kubectl exec -it pod-with-secret-env-from  -- env | grep DB_
```
The result should be:
```bash
DB_ADMIN=myadmin
DB_PASSWORD=mypass
```
Once the secret is created again and the pod is not restarted, then the environment variables are not refreshed.

When to Use Secret as Environment Variables (envFrom):
- when your application requires access to the secret as environment variables
- when we want to load all the key-value pairs from the secret as environment variables
- when the new environment variables should be automatically available in the containers when pod is recreated (pod recreaction can be triggered automatically by using Helm charts, when secret's hash is changed)
- when we expect the pod to be created even when the secret will not contain the required keys

## Secret as Environment Variables (secretKeyRef)

The final method for consuming secrets in Kubernetes is by injecting them as environment variables using the `secretKeyRef` field in the pod specification. This approach is suitable when your application requires access to specific keys from the secret as environment variables.

1. Create a pod with the secret injected as environment variables using `secretKeyRef`.
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: pod-with-secret-env-secret-key-ref
  name: pod-with-secret-env-secret-key-ref
spec:
    containers:
    - image: nginx
      name: pod-with-secret-env-secret-key-ref
      env:
      - name: APP_PREFIX_DB_PASS
        valueFrom:
          secretKeyRef:
            name: db-secret
            key: DB_PASSWORD
```
2. Check the status of the pod.
```bash
kubectl get pod pod-with-secret-env-secret-key-ref
```
The pod will not be created until the secret is present.

3. Create a secret with a database credentials.
```bash
kubectl create secret generic db-secret --from-literal=DB_ADMIN=myadmin --from-literal=DB_PASSWORD=mypass
```
4. Check the status of the pod.
```bash
kubectl get pod pod-with-secret-env-secret-key-ref
kubectl exec -it pod-with-secret-env-secret-key-ref  -- env | grep APP_PREFIX_
```
The expected result is:
```bash
pod-with-secret-env-secret-key-ref   1/1     Running...
...
APP_PREFIX_DB_PASS=mypass
```
5. Delete the secret and observe the behavior of the pod.
```bash
kubectl delete secret db-secret
kubectl get pod pod-with-secret-env-secret-key-ref
kubectl exec -it pod-with-secret-env-secret-key-ref  -- env | grep APP_PREFIX
```
The expected result is:
```bash
pod-with-secret-env-secret-key-ref   1/1     Running...
...
APP_PREFIX_DB_PASS=mypass
```
6. Recreate the secret with a new database password.
```bash
kubectl create secret generic db-secret --from-literal=DB_ADMIN=myadmin --from-literal=DB_PASSWORD=mynewpass
```
7. View the environment variables in the pod.
```bash
kubectl exec -it pod-with-secret-env-secret-key-ref  -- env | grep APP_PREFIX
```
The result should be:
```bash
APP_PREFIX_DB_PASS=mypass
```
As observed in this scenario, the pod is not affected if the secret is deleted. Container environment variables are not updated when the secret is recreated.

When to Use Secret as Environment Variables (secretKeyRef):
- when the secret's data key is different than the one required by the application
- when your application requires access to specific keys from the secret as environment variables (more control over the keys, more secure)
- when the pod should not be created if the specific key is not present in the secret during the pod's creation

The difference between the `envFrom` and `secretKeyRef` methods is that the `envFrom` method loads all the key-value pairs from the secret as environment variables, while the `secretKeyRef` method allows you to specify the keys from the secret that should be injected as environment variables. With the default settings, **if the key is not present in the secret, the pod will not be created (during pod creation time).**

## Summary

The consumption of secrets in Kubernetes pods and containers in all scenarios above follows similar behavior patterns.
- by default, the pod is not created until the secret is present
- the pod keeps the secret's data even if the secret is deleted
- the pod is not restarted when the secret is deleted

The key differences among the secret consumption options are:
- the method of accessing the secret's data (as files or environment variables)
- the level of control over the secret's keys

In conclusion, the choice of secret consumption method depends on the specific requirements of your application. Understanding the behavior of each method is crucial for ensuring the optimal functionality and resilience of your Kubernetes environment, especially when using Helm charts to manage your deployments that can dynamically update the secrets and recreate the pods with new values.
