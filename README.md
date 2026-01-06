# Systems-Lab

This repository manages my VPS infrastructure using an Infrastructure-as-Code (IaC) approach.

It documents the transition from manual bash-based server management to a fully automated, reproducible provisioning workflow.


## Tech Stack

| Layer             | Technology    | Purpose                                                  |
| ----------------- | ------------- | -------------------------------------------------------- |
| **Cloud**         | Hetzner Cloud | Virtual infrastructure provider                          |
| **IaC**           | Terraform     | Automated resource provisioning (VPS, network, SSH keys) |
| **Configuration** | Ansible       | OS hardening and service orchestration                   |
| **Proxy**         | Nginx         | Reverse proxy and traffic routing                        |
| **SSL**           | Certbot       | Automated SSL/TLS management (cert-only workflow)        |
| **Runtime**       | Docker        | Container engine and backend runtime environment         |


## Project Structure

The project is split into two main areas:

```
provisioning-lab/       # Current IaC stack (Terraform + Ansible)
infrastructure_old/     # Legacy bash scripts and manual configurations (reference only)
```

## Project Evolution

This repository tracks the evolution from manual server management to modern DevOps practices.

The `infrastructure_old` directory contains standalone Bash scripts and manual systemd configurations, while `provisioning-lab` replaces manual intervention with a fully automated IaC stack.

This shift was driven by the need for scalability, security hardening, and reproducible infrastructure.


## The Provisioning Stack


###  Infrastructure Provisioning (Terraform)

I use Terraform to manage the lifecycle of cloud resources on Hetzner Cloud through code, avoiding manual configuration via the web console.

- **Code-defined**: Servers, SSH keys, and networks are managed via configuration files.

- **State tracking**: Uses state files to track changes and prevent inconsistent configurations.

- **Base Layer**: Sets up the underlying infrastructure required to run the VPS services.


### Configuration & Hardening (Ansible)

After the server is provisioned, Ansible automates the internal setup and security.

- **Repeatable Setup**: Playbooks can be run multiple times to ensure the server is always configured correctly without breaking anything.

- **Security**: Automated firewall (UFW) setup and SSH hardening to secure the server from the start.

- **Clean SSL & Nginx**: Managed via certbot certonly. By separating the certificates from the Nginx config, the web server files stay clean and easy to manage manually.

- **Docker Environment**: Automated installation of the Docker engine and required system dependencies for containerized workloads.
