ALTER TABLE "user_role" ALTER COLUMN "region_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_role" ALTER COLUMN "region_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_role" ALTER COLUMN "class_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user_role" ALTER COLUMN "class_id" DROP NOT NULL;