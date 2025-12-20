CREATE TABLE "student_attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"enrollment_id" integer NOT NULL,
	"year" integer NOT NULL,
	"month" integer NOT NULL,
	"is_present" boolean NOT NULL,
	"marked_by_user_id" integer NOT NULL,
	"marked_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "unique_student_attendance" UNIQUE("enrollment_id","year","month")
);
--> statement-breakpoint
ALTER TABLE "student_attendance" ADD CONSTRAINT "student_attendance_enrollment_id_enrollment_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_attendance" ADD CONSTRAINT "student_attendance_marked_by_user_id_user_id_fk" FOREIGN KEY ("marked_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;