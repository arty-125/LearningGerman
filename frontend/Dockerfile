# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# ─── Stage 2: Serve with nginx ───────────────────────────────────────────────
FROM nginx:alpine

# nginx config — port 8080 hardcoded (Railway always maps containers on 8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx config to avoid conflicts
RUN rm -f /etc/nginx/conf.d/default.conf.template

# Copy the built Angular app
COPY --from=builder /app/dist/learning-german/browser /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
