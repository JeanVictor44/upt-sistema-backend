CREATE TABLE "city" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "city_name_unique" UNIQUE("name")
);
