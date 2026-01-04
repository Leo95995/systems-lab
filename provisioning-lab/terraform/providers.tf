# definisco il provider
terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45"
    }
  }
}

# fornisco il token
provider "hcloud" {
  token = var.hcloud_token
}