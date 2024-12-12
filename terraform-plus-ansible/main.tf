# adapted from
# https://austinsnerdythings.com/2021/09/01/how-to-deploy-vms-in-proxmox-with-terraform/

terraform {
  required_providers {
    proxmox = {
      source = "telmate/proxmox"
      version = "2.9.14"
    }
    ansible = {
      version = "~> 1.1.0"
      source  = "ansible/ansible"
    }
  }
}

provider "proxmox" {
  pm_api_url = "https://${var.proxmox_host}:8006/api2/json"
  pm_api_token_id = "your-name@pam!your-token-id"
  pm_api_token_secret = "your-secret"
  pm_tls_insecure = true
}

resource "proxmox_lxc" "test_server" {
  count = 2 # create 2
  hostname = "mytest-${count.index + 1}" #count.index starts at 0

  # assign ids
  vmid = count.index + 3001 # choose your starting number

  target_node = var.proxmox_node
  ostemplate = "local:vztmpl/alpine-3.18-default_20230607_amd64.tar.xz"
  password = "your-password"
  unprivileged = true

  cores = 1
  memory = 512

  rootfs {
    storage = "machines" # your storage
    size    = "5G"
  }

  network {
    name   = "eth0"
    bridge = "vmbr0"
    ip     = "dhcp"
  }

  # not required if using lxc-ssh connector in ansible
  #ssh_public_keys = file("~/.ssh/id_rsa.pub")

  start = true
}

resource "ansible_host" "my_host" {
  count = 2
  name = proxmox_lxc.test_server[count.index].vmid
  groups = ["containers"]
  variables = {
    lxc_host = proxmox_lxc.test_server[count.index].vmid
    physical_host = "pve"
  }
}

resource "ansible_host" "my_host2" {
  name = "pve"
  groups = ["hosts"]
  variables = {
    ansible_host = "actual proxmox address not container"
    ansible_user = "root"
  }
}

#resource "local_file" "ansible_inventory" {
#  content = templatefile("inventory_old.tmpl",
#    {
#     hostnames = [for s in proxmox_lxc.test_server : s.hostname]
#    }
#  )
#  filename = "inventory_old"
#}
