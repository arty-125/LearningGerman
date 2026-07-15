# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# ─── Stage 2: Serve with nginx ───────────────────────────────────────────────
FROM nginx:alpine

# Copy startup script — envsubst '$PORT' only, all other nginx vars left intact
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copy nginx config as a template (processed by start.sh at container startup)
COPY nginx.conf /etc/nginx/nginx.conf.template

# Copy the built Angular app
COPY --from=builder /app/dist/learning-german/browser /usr/share/nginx/html

# Railway injects PORT at runtime
ENV PORT=8080
EXPOSE 8080

CMD ["/start.sh"]
