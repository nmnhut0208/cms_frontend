# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

RUN echo ${BACKEND_URI}
# Set environment variables
RUN sed 's/process.env.BACKEND_URI/"${BACKEND_URI}"/g' .umirc.ts

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
# EXPOSE 8000
# CMD [ "pnpm", "start" ]

# 2. For Nginx setup
FROM nginx:alpine

# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
# RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .


# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
