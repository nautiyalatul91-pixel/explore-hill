import{a as e,i as t,s as n,t as r}from"./client-T4qWoHs3.js";import{l as i}from"./index-CEpVDJd8.js";import{t as a}from"./PageHero-Bv_Hv57l.js";var o=n(e()),s=t();function c(){let[e,t]=(0,o.useState)({title:`Privacy Policy`,content:`At Explore Hills, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you book a trek, subscribe to our newsletter, or fill out a contact lead form.

1. Information Collection
We collect your name, email address, phone number, and special requirements when you place a booking or request a quote.

2. Information Usage
Your details are only used to coordinate your travel arrangements, verify guide requirements, and contact you via WhatsApp or Email.

3. Data Protection
We do not sell or lease customer profiles to third parties. All traveler profiles are secured with Supabase storage and Row Level Security permissions.`});return(0,o.useEffect)(()=>{async function e(){let{data:e}=await r.from(`settings`).select(`*`).eq(`key`,`static_pages`).maybeSingle();if(e&&typeof e.value==`object`&&e.value!==null){let n=e.value;n.privacy&&t(n.privacy)}}e()},[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{eyebrow:`Legal`,title:e.title,subtitle:`How we handle and protect traveler information.`,image:i}),(0,s.jsx)(`section`,{className:`py-20 bg-background text-foreground animate-fade-up`,children:(0,s.jsx)(`div`,{className:`mx-auto max-w-3xl px-4 sm:px-6`,children:(0,s.jsx)(`div`,{className:`prose dark:prose-invert max-w-none whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed space-y-4`,children:e.content})})})]})}export{c as component};