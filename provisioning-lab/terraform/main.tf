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

resource "hcloud_firewall" "default_firewall" {
  name = "default_firewall"
  # impostazioni delle regole.

  # regala inbound per porta ssh 
  rule {
    direction = "in"
    protocol = "tcp"
    port = "22"
    # accetta tutti gli ip
    source_ips = ["0.0.0.0/0", "::/0"] 
  }
  # regola porta http
   rule {
    direction = "in"
    protocol = "tcp"
    port = "80"
    # accetta tutti gli ip
    source_ips = ["0.0.0.0/0", "::/0"] 
  }
  # regola porta https
    rule {
    direction = "in"
    protocol = "tcp"
    port = "443"
    # accetta tutti gli ip
    source_ips = ["0.0.0.0/0", "::/0"] 
  }
 
}

resource "hcloud_server" "systems-lab-vm" {
  name        = "systems-lab-vm"
  image       = "ubuntu-24.04"
  server_type = "cx23"
  location = "fsn1"
 
# array di key ssh. Passo l'id della chiave ssh all'interno dell'array target
  ssh_keys = [data.hcloud_ssh_key.leo_key.id]
  public_net {
    ipv4_enabled = true
    ipv6_enabled = true
  }
# questo in teoria dovrebbe permettermi di evitare di scrivere 
# l'ip a mano in ansible
  labels = {
    env = "devops-lab"
  }
  
# collegamento alla risorsa firewall creata
  firewall_ids = [hcloud_firewall.default_firewall.id]
}

# creo in automatico il file inventory ini con l'ip della macchina creata
resource "local_file" "ansible_inventory" {
  filename = "../ansible/inventory.ini"
  content  = <<EOT
[hetzner_vps]
systems-lab-vm ansible_host=${hcloud_server.systems-lab-vm.ipv4_address} ansible_user=root
EOT
}

# infine mi prendo l'ip del lab creato sebza dover entrare su hetzner

output "server_ip" {
  value = hcloud_server.systems-lab-vm.ipv4_address
}