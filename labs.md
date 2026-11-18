---
layout: page
title: Labs
permalink: /labs/
---

Hands-on notes from building an ML training and serving platform: distributed training (PyTorch DDP), Kubernetes, and Linux troubleshooting. Each lab starts from a question, runs on real code, and explains what the result means.

### Interactive labs

[ML platform interactive labs](/labs/ml-platform.html): 14 step-through labs in three areas. Each area starts with the big picture, then zooms in.

- **Training (DDP), 9 labs:** one training step on a hardware map (CPU, PCIe, GPU), with the functions called and the settings they read; then the DataLoader loop, `DistributedSampler`, `set_epoch`, DataLoader workers, `persistent_workers`, `zero_grad()`, gradient buckets and hooks, and gradient accumulation with `no_sync`.
- **Kubernetes, 3 labs:** which component reads which YAML field from `kubectl apply` to traffic; deleting or crashing Pods behind a Service; and whether the API server or the scheduler refused a Pod.
- **Linux, 2 labs:** what each `vmstat` number means in the hardware (tasks on CPU cores, pages moving between RAM, page cache and swap), then reading a `vmstat` line to find the bottleneck.

### Flashcards

[ML platform flashcards](/labs/flashcards.html): tap-to-reveal cards on DDP, data loading, Kubernetes, Linux troubleshooting, and system design, written as *what / how / so what*.

### Code

[ml-systems-lab on GitHub](https://github.com/syenpark/ml-systems-lab): the experiments behind these pages (DDP benchmarks, Kubernetes labs, Linux troubleshooting, C++).
