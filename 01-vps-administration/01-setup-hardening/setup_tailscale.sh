#!/bin/bash

# Installation of tailscale on linux
curl -fsSL https://tailscale.com/install.sh | sh

# Avvio tailscale
sudo tailscale up

# Prendo l'ipv4 della macchina nella rete
tailscale ip -4
