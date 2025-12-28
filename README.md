# Systems Lab

Personal collection of scripts, configurations, and experiments used to manage my VPS infrastructure and practice DevOps workflows.

This repository exists to avoid manual setups, keep servers reproducible, and maintain a consistent baseline for security, networking, and deployments.

## Overview

### VPS Administration
Bash scripts and systemd units for bootstrapping and maintaining Linux nodes.

- SSH hardening and firewall rules (UFW)
- Tailscale mesh networking for node-to-node access
- Automated backups (MongoDB and local data)
- Basic health checks and log rotation via systemd

### Docker & Nginx
Reusable configuration patterns for running web services consistently.

- Multi-stage Dockerfiles with non-root execution
- Nginx reverse proxy configs (gzip, security headers, SSL termination)
- Docker Compose templates with network isolation

### Kubernetes
Manifests and experiments with core Kubernetes primitives.

- Deployments, Services, Ingress
- Traffic routing and basic resilience testing

This section is mainly for learning and experimentation. For most VPS workloads, Docker Compose is still the default choice.

## Tech Stack

- Linux (Debian / Ubuntu), Bash, systemd  
- Docker, Docker Compose  
- Kubernetes  
- Nginx, Tailscale, Certbot  

## Notes
This is a living repo. Things here change as my setup evolves.  

