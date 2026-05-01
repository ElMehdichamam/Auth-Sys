const z = require('zod');
const validSchema = z.object({
    email: z.string().trim().min(3).max(255).toLowerCase().email("Invalid email format"),
    password:z.string().trim().min(8,"Password must be at least 8 characters")
});
module.exports = validSchema;