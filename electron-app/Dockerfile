# Use Windows Server Core for AppX builds
FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Set PowerShell as default shell
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';"]

# Install Chocolatey
RUN Set-ExecutionPolicy Bypass -Scope Process -Force; \
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; \
    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Node.js and Yarn via Chocolatey
RUN choco install nodejs yarn -y

# Install electron-builder globally
RUN npm install -g electron-builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build command
CMD ["cmd", "/c", "yarn run build && electron-builder --win"]
