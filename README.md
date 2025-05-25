# Elbrus Reach

A comprehensive self-hosted media ecosystem for digitizing, managing, and streaming a personal video collection.

### Basic Components

This project's infrastructure and software components are organized as follows:

* **Custom Web Dashboard (Frontend & Backend):** Provides a web interface for user interaction, media management, and system status overview. The **backend** (`app/backend`) is a Flask API connected to MongoDB, handling data and logic. The **frontend** (`app/frontend`) is a React application with Cloudscape components, providing the user interface.
* **MongoDB Database:** A NoSQL database (`data/mongo_data`) used as the central manifest to track all media files, their metadata, and processing status within the pipeline.
* **Media Processing Pipeline:** A semi-automated workflow to convert physical media into digital files. This involves:
    * **Ripping Station:** A designated machine for initial high-quality media extraction from discs.
    * **Automation Scripts:** Custom shell scripts (`app/scripts/`) that orchestrate file transfers, transcoding, and database updates.
* **Media Serving:** Utilizes a media server (e.g., Jellyfin, to be integrated later) to organize and stream the final digital media library.
* **Monitoring Stack:** Collects and visualizes system health and performance data.
    * **Node Exporter:** A utility running on the Ripping Station that collects host-level metrics (CPU, RAM, disk usage).
    * **SNMP Exporter:** A service that polls SNMP-enabled devices (like the Network Storage) to collect network device-specific metrics.
    * **Prometheus:** A time-series database that scrapes metrics from Node Exporter and SNMP Exporter, storing them for analysis.
    * **Grafana:** A visualization tool that connects to Prometheus to create dashboards and graphs of all collected metrics.
* **Network Storage:** A dedicated device (`data/`) serving as the central, permanent repository for the entire digital media library, accessible over the network.