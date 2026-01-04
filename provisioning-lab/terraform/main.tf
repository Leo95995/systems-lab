# Create a new server running debian

# Questo crea la key su hetzner 
# SAMPLE DATAS
# resource "hcloud_ssh_key" "main" {
#   name       = var.ssh_leo_key
#   public_key = file("~/.ssh/example.pub")
# }


data "hcloud_ssh_key" "leo_key" {
  name = var.ssh_leo_key
}

resource "hcloud_server" "systems-lab-vm" {
  name        = "systems-lab-vm"
  image       = "ubuntu-24.04"
  server_type = "cx23"
  location = "fsn1"
 
 #  array di key ssh. Passo l'id della chiave ssh all'interno dell'array target
  ssh_keys = [data.hcloud_ssh_key.leo_key.id]
  public_net {
    ipv4_enabled = true
    ipv6_enabled = true
  }
#   questo in teoria dovrebbe permettermi di evitare di scrivere 
# l'ip a mano in ansible
  labels = {
    env = "devops-lab"
  }
}

# infine mi prendo l'ip del lab creato sebza dover entrare su hetzner

output "server_ip" {
  value = hcloud_server.systems-lab-vm.ipv4_address
}