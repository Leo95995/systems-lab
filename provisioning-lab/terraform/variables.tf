# Preparo la variabile con token non esposta
variable "hcloud_token" {
  sensitive = true
}

variable "ssh_leo_key" {
  sensitive = true
}