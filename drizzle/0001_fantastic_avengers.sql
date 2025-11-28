ALTER TABLE "class" DROP CONSTRAINT "class_shift_id_shift_id_fk";
--> statement-breakpoint
ALTER TABLE "class" DROP CONSTRAINT "class_option_id_class_option_id_fk";
--> statement-breakpoint
ALTER TABLE "class" DROP CONSTRAINT "class_status_id_class_status_id_fk";
--> statement-breakpoint
ALTER TABLE "class_edition" ADD COLUMN "shift_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "class_edition" ADD COLUMN "option_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "class_edition" ADD COLUMN "status_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "class_edition" ADD CONSTRAINT "class_edition_shift_id_shift_id_fk" FOREIGN KEY ("shift_id") REFERENCES "public"."shift"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_edition" ADD CONSTRAINT "class_edition_option_id_class_option_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."class_option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_edition" ADD CONSTRAINT "class_edition_status_id_class_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."class_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class" DROP COLUMN "shift_id";--> statement-breakpoint
ALTER TABLE "class" DROP COLUMN "option_id";--> statement-breakpoint
ALTER TABLE "class" DROP COLUMN "status_id";