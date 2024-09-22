const { z } = require("zod");
//creating an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 chars" })
    .max(255, { message: "Name must not be more than 256 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least of 6 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
  departmentId: z
    .string({ required_error: "department is required" })
    .trim()
    .min(3, { message: "deparment must be at least of 3 chars" })
    .max(255, { message: "department must not be more than 256 characters" }),
  about: z
    .string({ required_error: "About is required" })
    .trim()
    .min(3, { message: "About must be at least of 3 chars" })
    .max(255, { message: "About must not be more than 256 characters" }),
  role: z
    .string({ required_error: "role is required" })
    .trim()
    .min(3, { message: "role must be at least of 3 chars" })
    .max(255, { message: "role must not be more than 256 characters" }),
});

module.exports = signupSchema;
