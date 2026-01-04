## Activate a monitoring script as a systemd service

1- go to `/etc/systemd/system` and create a service file, for example `systemd-monitoring-service.service`.
In the `ExecStart` field set it to the script you want to run, for example:

```ini
ExecStart=/usr/local/bin/name_file.sh
```

2- go to `/usr/local/bin` and create the script you want to launch:

```bash
touch name_file.sh
chmod +x name_file.sh
```

make sure the script is executable and contains your monitoring code.

3- once everything is set up, enable and start the service:

```bash
sudo systemctl enable systemd-monitoring-service.service
sudo systemctl start systemd-monitoring-service.service
```

4- After creating or editing the service file, reload systemd to apply changes:

```bash
sudo systemctl daemon-reload
```

noww the script will be managed by systemd, will start at boot, and if it stops for any reason, systemd will restart it automatically.

