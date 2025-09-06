CREATE TABLE "city" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "city_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "neighborhood" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"city_id" char(36) NOT NULL,
	"region_id" char(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teaching_place" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"neighborhood_id" char(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teaching_place" ADD CONSTRAINT "teaching_place_neighborhood_id_neighborhood_id_fk" FOREIGN KEY ("neighborhood_id") REFERENCES "public"."neighborhood"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_document_unique" UNIQUE("document");