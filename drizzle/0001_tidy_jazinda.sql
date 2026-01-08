ALTER TABLE "user_role" DROP CONSTRAINT "user_role_class_edition_id_class_edition_id_fk";
--> statement-breakpoint
ALTER TABLE "role" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."roles";--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('ADMIN', 'INTERIOR_MANAGER', 'SECRETARY', 'CAPITAL_MANAGER');--> statement-breakpoint
ALTER TABLE "role" ALTER COLUMN "name" SET DATA TYPE "public"."roles" USING "name"::"public"."roles";--> statement-breakpoint
ALTER TABLE "user_role" ADD COLUMN "teaching_place_id" integer;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_teaching_place_id_teaching_place_id_fk" FOREIGN KEY ("teaching_place_id") REFERENCES "public"."teaching_place"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" DROP COLUMN "class_edition_id";