# Use cases

Who uses Synthwerk, and for what. Each case names the milestone that delivers it.

## Users

| Persona | Who | Goal | Main surface |
|---|---|---|---|
| Sam, solo developer | Freelancer who builds small web apps | Add AI chat to a client site fast | Studio, snippet, SDK |
| Lena, small agency | 3 to 10 developers, 20 or more client sites | Run one widget on many sites from one admin | Studio admin, orgs, roles |
| Max, end user | Visitor of an app that uses Synthwerk | Get an answer, or scan a card on the phone | Chat widget, vision widget |
| Ada, admin | Org admin or platform operator | See health, manage users, tune the AI | Admin dashboard, health view |

## Jobs

| ID | Situation | Wanted result | Persona | Milestone |
|---|---|---|---|---|
| J1 | A site has no AI | Paste one snippet. Visitors chat with an AI in 5 minutes | Sam | M3 |
| J2 | A new app starts | Start from a scaffold with sign-in and AI | Sam | M5 |
| J3 | Many client sites | Configure the widgets per client from one place | Lena | M3 |
| J4 | A visitor has a question | Ask it and get a streamed answer | Max | M2 |
| J5 | A visitor holds a Magic card | Point the phone camera at it and see the card and printing | Max | M6 |
| J6 | Something is slow | Open one live health view and find the failing service in under 1 minute | Ada | M3 |
| J7 | A team needs access | Invite users and set roles | Ada | M3 |
| J8 | An admin needs data | Ask the admin AI. No shell or database access is needed | Ada | M5 |

## Two ways to use it

```text
-- 01 -------------------------------------------- TWO WAYS TO USE IT --

  DROP IN                                 BUILD
  +----------------------------+          +----------------------------+
  | <script src=".../loader">  |          | $ npm i @synthwerk/vue     |
  | chat + vision on any page  |          | your app, same services    |
  +----------------------------+          +----------------------------+
```

- **Drop in.** Widgets, sign-in and admin in your own app. You host your app. Milestone M3.
- **Build.** Your app on the SDK inside the studio app shell. React is the default, Vue by config. Milestone M5.
- Both ways call the same APIs and use the same accounts and roles.
- The loader script and the SDK packages do not exist yet. The names are the plan.

## What you can use today

- **Shared CI and templates** from [synthwerk-blueprint](https://github.com/VelimirMueller/synthwerk-blueprint), version v1.
- **Design tokens** from [synthwerk-sdk](https://github.com/VelimirMueller/synthwerk-sdk): `@synthwerk/tokens` 0.2.0.
- **Image labels** from [synthwerk-vision](https://github.com/VelimirMueller/synthwerk-vision). The eval set scores 93.1 %.

## What Synthwerk does not do

- No anonymous AI. Chat and vision need a signed-in user. The public mascot is the one exception, and it is isolated.
- No native mobile apps. No SAML for customers. No languages other than German and English. None of these is planned.
- Card scan stays free. The card data terms do not allow a paywall.
