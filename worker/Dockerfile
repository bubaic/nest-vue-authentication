FROM mailhog/mailhog

RUN adduser -D -u 1000 mailhog
USER mailhog

WORKDIR /home/mailhog

ENTRYPOINT ["MailHog"]

EXPOSE 1025 8025