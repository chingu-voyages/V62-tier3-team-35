import { describe, it, expect } from "vitest";
import {
  roadmapFormSchema,
  customHoursMin,
  customHoursMax,
} from "./generate-path.schema";

const validInput = {
  careerGoal: "frontend",
  skillLevel: "beginner",
  skills: ["HTML", "CSS"],
  hoursPerWeek: 5,
  learningPace: "relaxed",
};

describe("roadmapFormSchema", () => {
  it("accepts fully valid input", () => {
    expect(roadmapFormSchema.safeParse(validInput).success).toBe(true);
  });

  it("accepts an empty skills array", () => {
    const result = roadmapFormSchema.safeParse({ ...validInput, skills: [] });
    expect(result.success).toBe(true);
  });

  describe("careerGoal", () => {
    it("rejects an empty string", () => {
      const result = roadmapFormSchema.safeParse({
        ...validInput,
        careerGoal: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("skillLevel", () => {
    it("rejects an empty string", () => {
      const result = roadmapFormSchema.safeParse({
        ...validInput,
        skillLevel: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("learningPace", () => {
    it("rejects an empty string", () => {
      const result = roadmapFormSchema.safeParse({
        ...validInput,
        learningPace: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("hoursPerWeek", () => {
    it("rejects a non-integer", () => {
      const result = roadmapFormSchema.safeParse({
        ...validInput,
        hoursPerWeek: 1.5,
      });
      expect(result.success).toBe(false);
    });

    it("accepts the minimum boundary", () => {
      const result = roadmapFormSchema.safeParse({
        ...validInput,
        hoursPerWeek: customHoursMin,
      });
      expect(result.success).toBe(true);
    });

    it("accepts the maximum boundary", () => {
      const result = roadmapFormSchema.safeParse({
        ...validInput,
        hoursPerWeek: customHoursMax,
      });
      expect(result.success).toBe(true);
    });

    it("rejects below the minimum boundary", () => {
      const result = roadmapFormSchema.safeParse({
        ...validInput,
        hoursPerWeek: customHoursMin - 1,
      });
      expect(result.success).toBe(false);
    });

    it("rejects above the maximum boundary", () => {
      const result = roadmapFormSchema.safeParse({
        ...validInput,
        hoursPerWeek: customHoursMax + 1,
      });
      expect(result.success).toBe(false);
    });
  });
});
