CREATE TABLE "class_edition" (
	"id" serial PRIMARY KEY NOT NULL,
	"edition_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"enrolled_count" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollment" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" serial NOT NULL,
	"enrollment_date" date NOT NULL,
	"status_id" serial NOT NULL,
	"class_edition_id" serial NOT NULL,
	"is_exempt" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_role" RENAME COLUMN "class_id" TO "class_edition_id";--> statement-breakpoint
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_class_id_class_id_fk";
--> statement-breakpoint
ALTER TABLE "adress" ALTER COLUMN "property_location_category_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "class" ALTER COLUMN "teaching_place_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "class" ALTER COLUMN "shift_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "class" ALTER COLUMN "option_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "class" ALTER COLUMN "status_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_role" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_role" ALTER COLUMN "role_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "class_edition" ADD CONSTRAINT "class_edition_edition_id_edition_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."edition"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_edition" ADD CONSTRAINT "class_edition_class_id_class_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."class"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_student_id_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_status_id_enrollment_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."enrollment_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_class_edition_id_class_edition_id_fk" FOREIGN KEY ("class_edition_id") REFERENCES "public"."class_edition"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_class_edition_id_class_edition_id_fk" FOREIGN KEY ("class_edition_id") REFERENCES "public"."class_edition"("id") ON DELETE no action ON UPDATE no action;