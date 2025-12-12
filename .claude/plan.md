# Implementation Plan: Resend Serverless Function for Form Submissions

## Current State Analysis

**Codebase Structure:**
- Next.js project with App Router
- Contact form exists at [src/components/shared/ContactForm.tsx](src/components/shared/ContactForm.tsx)
- Form fields: name, email, phone, service, message
- Currently has simulated submission (setTimeout)
- Static export enabled (`output: 'export'` in next.config.ts)

**Key Issue:** The current configuration uses static export, which is incompatible with Next.js API routes (serverless functions).

## Recommended Approach

I recommend **Option 1** (Next.js API Route with Vercel deployment) as it's the most straightforward and fully integrated solution.

### Option 1: Next.js API Route (Recommended)

**Pros:**
- Native Next.js integration
- Type-safe with TypeScript
- Easy to maintain and test
- Works seamlessly with Vercel deployment
- No additional configuration needed

**Cons:**
- Requires removing static export
- Site must be deployed to a platform supporting serverless functions (Vercel, Netlify, etc.)

**Implementation Steps:**

1. **Install Resend SDK**
   - Add `resend` package to dependencies
   - Install via npm

2. **Update Next.js Configuration**
   - Remove `output: 'export'` from [next.config.ts](next.config.ts)
   - This enables API routes

3. **Create Environment Variables**
   - Create `.env.local` file
   - Add `RESEND_API_KEY` for the Resend API key
   - Add recipient email addresses

4. **Create API Route**
   - Create [src/app/api/contact/route.ts](src/app/api/contact/route.ts)
   - Implement POST handler to receive form data
   - Validate form data (name, email, message required)
   - Use Resend SDK to send email
   - Return success/error responses

5. **Update ContactForm Component**
   - Modify [src/components/shared/ContactForm.tsx](src/components/shared/ContactForm.tsx)
   - Replace simulated submission with actual API call to `/api/contact`
   - Extract form data from FormData object
   - Handle loading, success, and error states
   - Display appropriate user feedback

6. **Email Template Design**
   - Create formatted email body with all form fields
   - Include sender info (name, email, phone)
   - Include service selection and message
   - Add timestamp and any metadata

7. **Error Handling**
   - Add try-catch blocks
   - Validate API key exists
   - Handle Resend API errors
   - Provide user-friendly error messages
   - Log errors for debugging

### Option 2: Vercel/Netlify Serverless Function (Keep Static Export)

**Pros:**
- Maintains static export benefits
- Faster page loads (pure static)
- Can use CDN for entire site

**Cons:**
- More complex setup
- Platform-specific configuration
- Separate function deployment

**Implementation:**
- Create separate serverless function in `/api` or `/functions` directory
- Configure platform-specific function settings
- Keep Next.js static export
- Update form to call external function endpoint

### Option 3: Client-Side Resend (Not Recommended)

**Pros:**
- No server needed
- Fully static deployment

**Cons:**
- **SECURITY RISK:** Exposes API key in client-side code
- Not recommended by Resend
- Vulnerable to abuse

## Recommended Implementation Details (Option 1)

### File Changes

**New Files:**
1. `src/app/api/contact/route.ts` - API route handler
2. `.env.local` - Environment variables (not committed)
3. `.env.example` - Example env file for documentation

**Modified Files:**
1. [next.config.ts](next.config.ts) - Remove static export
2. [src/components/shared/ContactForm.tsx](src/components/shared/ContactForm.tsx) - Update form submission logic
3. [package.json](package.json) - Add Resend dependency

### API Route Structure

```typescript
// src/app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// POST handler
// - Validate request body
// - Send email via Resend
// - Return success/error response
```

### Environment Variables

```
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=che@askhermarketing.com,drita@askhermarketing.com
```

### Form Submission Flow

1. User fills out form
2. User clicks "Send Message"
3. Form data sent to `/api/contact`
4. API validates data
5. API sends email via Resend
6. API returns success/error
7. Form displays confirmation or error message

## Questions to Clarify

1. **Deployment Platform:** Are you planning to deploy on Vercel, Netlify, or another platform?
2. **Static Export:** Is maintaining static export important for your use case?
3. **Email Recipients:** Should emails go to both che@askhermarketing.com and drita@askhermarketing.com?
4. **From Email:** Do you have a verified domain in Resend, or will you use their default sender?

## Next Steps

Once you approve this approach:
1. Install Resend package
2. Update Next.js config
3. Create API route with Resend integration
4. Update ContactForm component
5. Set up environment variables
6. Test form submission
7. Deploy to hosting platform
