PATH  := node_modules/.bin:$(PATH)
SHELL := /usr/bin/env bash
NODE_ENV ?= development

start:
	gatsby develop

build:
	gatsby build

format:
	prettier --write "**/*.{js,jsx,json,md}"
