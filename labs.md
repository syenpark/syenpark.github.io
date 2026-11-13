---
layout: page
title: Labs
permalink: /labs/
---

Hands-on notes from building an ML training and serving platform: distributed training (PyTorch DDP), Kubernetes, and Linux troubleshooting. Each lab starts from a question, runs on real code, and explains what the result means.

### Interactive labs

[ML platform interactive labs](/labs/ml-platform.html): 12 step-through labs.

- **Data loading:** the DataLoader loop, training with and without `DistributedSampler`, `set_epoch`, DataLoader workers, and where time goes with `persistent_workers`.
- **DDP training step:** where data and weights live (CPU, PCIe, GPU) and which function calls which, why `zero_grad()` runs every step, gradient buckets and hooks, and gradient accumulation with `no_sync`.
- **Kubernetes:** deleting or crashing Pods behind a Service, and whether the API server or the scheduler refused a Pod.
- **Linux:** reading a `vmstat` line to find the bottleneck.

### Flashcards

[ML platform flashcards](/labs/flashcards.html): tap-to-reveal cards on DDP, data loading, Kubernetes, Linux troubleshooting, and system design, written as *what / how / so what*.

### Code

[ml-systems-lab on GitHub](https://github.com/syenpark/ml-systems-lab): the experiments behind these pages (DDP benchmarks, Kubernetes labs, Linux troubleshooting, C++).
