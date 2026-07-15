#!/bin/sh
# Substitute ONLY $PORT — leave all other nginx variables ($uri, $host, etc.) intact
envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
