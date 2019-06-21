FROM abiosoft/caddy:1.0.0-no-stats

WORKDIR /app

RUN apk --no-cache add gettext bash
ENV ACME_AGREE=true

COPY Caddyfile.template startup.sh ./

ENTRYPOINT [ "bash", "./startup.sh" ]
