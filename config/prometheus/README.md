# Prometheus Configuration

This directory contains the configuration files for the Prometheus monitoring server.

**Note:** The `prometheus.yml` file itself is excluded from Git tracking (via `.gitignore`). 

During setup, you will need to manually create the `prometheus.yml` file in this directory (`config/prometheus/`) to track health checks for physical hosts supporting the pipeline.

---

## Sample `prometheus.yml` Content

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['physical.host.name.or.ip:9100']

  - job_name: 'network_storage_metrics'
    scrape_interval: 30s
    metrics_path: /snmp
    params:
      module: ['snmp_host_name']
      auth: ['snmp_v3_auth_example']
    static_configs:
      - targets: ['XXX.XXX.XXX.XXX:9116'] 
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: snmp_exporter:9116
```