# Section 05: Infrastructure Deployment with Terraform and Kasm

## Overview

This section covers the deployment of your development environment using Terraform to provision infrastructure on Proxmox and configure Kasm workspaces with Kali Linux. We'll walk through:

1. Setting up Terraform configuration for Proxmox
2. Creating cloud-init templates for automated VM provisioning
3. Deploying Kasm workspaces
4. Configuring Kali Linux environments

## Prerequisites

- Completed sections 01-04
- Terraform installed (from Section 04)
- SSH access to Proxmox server
- Basic understanding of YAML and HCL (HashiCorp Configuration Language)

## Infrastructure Deployment Steps

### Step 1: Terraform Configuration

First, we'll set up our Terraform configuration for Proxmox. Create a new directory for your Terraform files:

```bash
mkdir terraform-kasm-deploy
cd terraform-kasm-deploy
```

Create the following files:

1. `provider.tf`:

```hcl
terraform {
  required_providers {
    proxmox = {
      source = "telmate/proxmox"
      version = "2.9.14"
    }
  }
}

provider "proxmox" {
  pm_api_url = "https://${var.proxmox_host}:8006/api2/json"
  pm_api_token_id = var.pm_api_token_id
  pm_api_token_secret = var.pm_api_token_secret
  pm_tls_insecure = true
}
```

1. `variables.tf`:

```hcl
variable "proxmox_host" {
  description = "Proxmox host IP or FQDN"
  type = string
}

variable "pm_api_token_id" {
  description = "Proxmox API token ID"
  type = string
}

variable "pm_api_token_secret" {
  description = "Proxmox API token secret"
  type = string
  sensitive = true
}

variable "ssh_key" {
  description = "SSH public key for VM access"
  type = string
}
```

1. `main.tf`:

```hcl
resource "proxmox_vm_qemu" "kasm_server" {
  count = 1
  name = "kasm-workspace-${count.index + 1}"
  target_node = var.proxmox_node
  clone = var.template_name
  os_type = "cloud-init"
  cores = 4
  sockets = 1
  cpu = "host"
  memory = 8192
  scsihw = "virtio-scsi-pci"
  bootdisk = "scsi0"
  agent = 1

  disk {
    size = "50G"
    type = "scsi"
    storage = "local-lvm"
  }

  network {
    model = "virtio"
    bridge = "vmbr0"
  }

  cloud_init = true
  cicustom = "user=local:snippets/cloud-init-kasm.yml"

  # Cloud-init config
  ipconfig0 = "ip=dhcp"
}
```

### Step 2: Cloud-Init Template Configuration

Create a cloud-init template for Kasm workspace deployment:

```yaml
#cloud-config
users:
  - name: kasm
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: sudo
    shell: /bin/bash
    ssh_authorized_keys:
      - ${ssh_key}

package_update: true
package_upgrade: true

packages:
  - curl
  - wget
  - git
  - docker.io
  - docker-compose

runcmd:
  - systemctl start docker
  - systemctl enable docker
  - curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_1.10.0.238225.tar.gz
  - tar -xf kasm_release_1.10.0.238225.tar.gz
  - bash kasm_release/install.sh
```

### Step 3: Kasm Workspace Setup

After the infrastructure is provisioned, we'll configure the Kasm workspace:

1. Access the Kasm web interface at <https://your-vm-ip:443>
2. Complete the initial setup wizard
3. Configure authentication settings
4. Add Kali Linux workspace image:

```yaml
# kali-workspace.yaml
version: "2.4"
services:
  kali:
    image: kalilinux/kali-rolling
    security_opt:
      - seccomp=unconfined
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    environment:
      - KASM_USER=developer
    volumes:
      - /home/kasm-user/persistent:/persistent
```

### Step 4: Deployment

Execute the Terraform deployment:

```bash
# Initialize Terraform
terraform init

# Review the deployment plan
terraform plan

# Apply the configuration
terraform apply
```

### Step 5: Verification and Testing

1. Verify Kasm workspace accessibility:
   - Access the Kasm web interface
   - Test user authentication
   - Check Kali Linux workspace launch

2. Test development environment functionality:
   - Confirm tool availability in Kali Linux
   - Verify persistent storage
   - Test network connectivity

## Next Steps

After completing this section, you will have:

- A fully provisioned Kasm workspace environment
- Configured Kali Linux development spaces
- Infrastructure defined as code with Terraform
- Automated deployment capability

The next section will cover advanced configuration and customization options for your development environment.

## Troubleshooting

Common issues and their solutions:

1. Terraform Provider Connection Issues:
   - Verify Proxmox API token permissions
   - Check network connectivity
   - Confirm SSL/TLS settings

2. Cloud-Init Template Problems:
   - Validate YAML syntax
   - Check cloud-init logs: `/var/log/cloud-init.log`
   - Verify template accessibility in Proxmox

3. Kasm Workspace Access:
   - Check firewall rules
   - Verify SSL certificate configuration
   - Review Kasm service logs
