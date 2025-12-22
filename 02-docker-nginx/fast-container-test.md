create a test container
```bash
# 
# -d -> detached
# --name -> give a custom name to my container
# ubuntu -> the name image
# /bin/bash -c "command to execute"
# 
docker run -d --name test-machine ubuntu /bin/bash -c "sleep infinity"

```