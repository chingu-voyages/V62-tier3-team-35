import { ZodError } from "zod";
import { Prisma } from "@/lib/generated/prisma/client";
import { AppError } from "./app-error";

const PRISMA_ERROR_TO_RESPONSE: Record<
  string,
  { message: string; status: number }
> = {
  P2002: {
    message: "A record with the same unique value already exists.",
    status: 409,
  },
  P2003: {
    message:
      "A related record does not exist. Check that the referenced id is valid.",
    status: 400,
  },
  P2025: { message: "The requested record was not found.", status: 404 },
} as const;

function isPrismaKnownRequestError(error: unknown): error is { code: string } {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    (typeof error === "object" &&
      error !== null &&
      (error as { name?: unknown }).name === "PrismaClientKnownRequestError" &&
      typeof (error as { code?: unknown }).code === "string")
  );
}

export function errorHandler(error: unknown) {
  if (error instanceof ZodError) {
    return Response.json(
      {
        success: false,
        message: "Invalid input",
      },
      { status: 400 },
    );
  }

  if (isPrismaKnownRequestError(error)) {
    const prismaErrorResponse = PRISMA_ERROR_TO_RESPONSE[error.code];
    if (prismaErrorResponse) {
      return Response.json(
        {
          success: false,
          message: prismaErrorResponse.message,
        },
        { status: prismaErrorResponse.status },
      );
    }
  }

  if (error instanceof AppError) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode },
    );
  }
  return Response.json(
    {
      success: false,
      message: "Something went wrong.",
    },
    { status: 500 },
  );
}
