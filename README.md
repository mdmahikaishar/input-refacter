# Input Refacter
Input validation for javascript.

## Get Started

Install `Input Refacter` to your project.

```bash
pnpm install input-refacter
```

## Example
Simple login validation example.

```ts
import refacter from "input-refacter";

// define validation schema
const schema = {
  name: refacter("username", "example", {
    min: 4,
    small: true
  }),
  password: refacter("password", "Example123@", {
    min: 4,
    small: true,
    special: true
  })
};

if (schema.name.valid && schema.password.valid) {
 console.log("You are great!");
} else {
  console.log(.name.first);
  console.log(.password.first);
}
```