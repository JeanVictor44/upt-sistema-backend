CREATE TABLE "neighborhood" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"city_id" char(36) NOT NULL,
	"region_id" char(36) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_document_unique" UNIQUE("document");