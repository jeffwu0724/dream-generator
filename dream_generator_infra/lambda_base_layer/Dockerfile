# Start from Amazon Linux 2023
FROM amazonlinux:2023

# Install Python 3.11, pip, and zip
RUN dnf install -y python3.11 python3.11-pip zip && \
    dnf clean all

# Create necessary directories
RUN mkdir -p /opt/python

# Install virtualenv
RUN python3.11 -m pip install virtualenv

# Set up a virtual environment
RUN python3.11 -m venv /opt/venv

# Activate the virtual environment and install dependencies
COPY ./requirements.txt .
RUN . /opt/venv/bin/activate && \
    pip install -r requirements.txt -t ./python

# Zip it up for deployment
RUN zip -r layer.zip ./python/

# Set the entry point to use the bash shell
ENTRYPOINT ["/bin/bash", "-l"]