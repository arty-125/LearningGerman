# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# ─── Stage 2: Serve with nginx ───────────────────────────────────────────────
FROM nginx:alpine

# nginx will substitute $PORT at container startup via the templates mechanism
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy the built Angular app
COPY --from=builder /app/dist/learning-german/browser /usr/share/nginx/html

# Railway injects PORT at runtime; default to 8080 for local docker runs
ENV PORT=8080
EXPOSE 8080
