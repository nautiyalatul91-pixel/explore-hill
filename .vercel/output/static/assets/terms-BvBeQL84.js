import{a as e,i as t,s as n,t as r}from"./client-T4qWoHs3.js";import{l as i}from"./index-CEpVDJd8.js";import{t as a}from"./PageHero-Bv_Hv57l.js";var o=n(e()),s=t();function c(){let[e,t]=(0,o.useState)({title:`Terms and Conditions`,content:`Please read these terms and conditions carefully before booking treks with Explore Hills.

1. Booking & Confirmations
All bookings must be confirmed via WhatsApp. Seats are only reserved upon slot verification.

2. Health & Safety
Trekking in the Himalayas requires physical fitness. Clients must report any respiratory, cardiac, or medical conditions in advance on their traveler profile.

3. Cancellation Policy
- Cancellations 15 days before departure: 90% refund.
- Cancellations 7-14 days before departure: 50% refund.
- Cancellations within 7 days: No refund.

4. Environmental Policy
Explore Hills promotes responsible mountain tourism. Littering on trails is strictly prohibited.`});return(0,o.useEffect)(()=>{async function e(){let{data:e}=await r.from(`settings`).select(`*`).eq(`key`,`static_pages`).maybeSingle();if(e&&typeof e.value==`object`&&e.value!==null){let n=e.value;n.terms&&t(n.terms)}}e()},[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{eyebrow:`Legal`,title:e.title,subtitle:`Booking policies, safety rules, and mountain codes.`,image:i}),(0,s.jsx)(`section`,{className:`py-20 bg-background text-foreground animate-fade-up`,children:(0,s.jsx)(`div`,{className:`mx-auto max-w-3xl px-4 sm:px-6`,children:(0,s.jsx)(`div`,{className:`prose dark:prose-invert max-w-none whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed space-y-4`,children:e.content})})})]})}export{c as component};