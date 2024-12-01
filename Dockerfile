# Start with the official MongoDB image from Docker Hub
FROM mongo:latest

# Expose the default MongoDB port
EXPOSE 27017


WORKDIR /data

# Use the default MongoDB entrypoint
CMD ["mongod"]