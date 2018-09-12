FROM nginx:alpine

ENV APP_EXPLORER_MAINNET_URL https://explorer.minter.network
ENV APP_EXPLORER_TESTNET_URL https://testnet.explorer.minter.network

RUN apk update && \
    apk upgrade && \
    apk --no-cache add nginx nodejs git

# Create app directory
WORKDIR /var/www

RUN \
    git clone https://github.com/MinterTeam/minter-status-web.git && \
    cd minter-status-web && \
    npm install && npm run production

ADD ./vhost.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
