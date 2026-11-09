#!/usr/bin/env bash
set -e

# Detect Java 21 if JAVA_HOME is not set
if [ -z "$JAVA_HOME" ]; then
  if [ -d "/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home" ]; then
    export JAVA_HOME="/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home"
    export PATH="$JAVA_HOME/bin:$PATH"
  elif command -v /usr/libexec/java_home &> /dev/null; then
    export JAVA_HOME=$(/usr/libexec/java_home -v 21 2>/dev/null || /usr/libexec/java_home 2>/dev/null)
    export PATH="$JAVA_HOME/bin:$PATH"
  fi
fi

echo "=========================================================="
echo " Starting Shankar Chaudhary Portfolio Backend (Spring Boot 3) "
echo " Java: $(java -version 2>&1 | head -n 1)"
echo " Database: Persistent H2 (or MySQL via application-mysql.properties)"
echo " Backend URL: http://localhost:8080"
echo " Admin Portal: http://localhost:5173/admin"
echo "=========================================================="

if [ -f "backend/target/portfolio-backend-1.0.0.jar" ]; then
  exec java -jar backend/target/portfolio-backend-1.0.0.jar
else
  exec mvn -f backend/pom.xml spring-boot:run
fi

