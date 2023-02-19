
> .env

status=0

write_secret_to_env() {
    if [ "$#" -ne 2 ]; then
        echo "Invalid numbers of parameters passed to write_secret_to_env. Required: 1"
        status=1
    fi

    secret_name=$1
    eval secret_content=\$$secret_name
    env_name=$2

    if [[ "$secret_content" -eq "" || "$secret_content" -eq null ]]; then
        echo "$env_name = $secret_content" >> .env
        echo "Secret $secret_name written to .env"
    else
        echo "ERROR: secret $secret_name is empty or null"
        status=1
    fi
}

# Required
write_secret_to_env "MONGODB_CONNECTION_URL" "CONNECTION_URL"

# Not required
if [[ $MONGODB_PORT -ne "" && $MONGODB_PORT -ne null ]]; then
    write_secret_to_env "MONGODB_PORT" "PORT"
fi

echo "Process ended with status: $status"
exit $status
