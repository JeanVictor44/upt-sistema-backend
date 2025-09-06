CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'REGION_MANAGER', 'SECRETARY');--> statement-breakpoint
CREATE TABLE "user" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"document" varchar(11) NOT NULL,
	"telephone" varchar(12) NOT NULL,
	"disabled_at" timestamp,
	"role" "user_role" DEFAULT 'SECRETARY' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "unique_email" UNIQUE NULLS NOT DISTINCT("email")
);
--> statement-breakpoint
CREATE TABLE "region" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "region_name_unique" UNIQUE("name")
);
