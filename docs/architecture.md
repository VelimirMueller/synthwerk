# Architecture

The full diagrams behind the [README](../README.md). The README keeps the short versions.

- Each service and front end is a `synthwerk-<name>` repo. `synthwerk-infra` configures the edge and the bus.
- The llm service reads the other services through read-only MCP tools.
- **Strobe** is the public mascot: a no-login helper on the website. It is isolated from all other services. The name is not final.

## Ecosystem

```text
-- 02 ----------------------------------------------------- ECOSYSTEM --

   your website             your app                 you, the operator
        |                       |                            |
 +------v-------+       +-------v------+             +-------v------+
 |   widgets    |       |     sdk      |             |    studio    |
 | chat, vision |       | npm packages |             | build, admin |
 +------+-------+       +-------+------+             +-------+------+
        |                       |                            |
        +-----------------------+----------------------------+
                                | HTTPS
 +------------------------------v-----------------------------------+
 |  edge     TLS  /  WAF  /  rate limit             (from infra)    |
 +-----+--------------+--------------+--------------+----------+----+
       |              |              |              |          :
 +-----v----+   +-----v----+   +-----v----+   +-----v----+  +..v.........+
 | identity |   |   llm    |   |  vision  |   |  pulse   |  :  Strobe    :
 | orgs     |   | chat     |   | image    |   | health   |  :  mascot    :
 | roles    |   | gateway  |   | labels   |   | audit    |  :  public    :
 +-----+----+   +-----+----+   +-----+----+   +-----+----+  +............+
       |              |              |              |        isolated: no
 ======+==============+==============+==============+=====   tools, no db,
   NATS event bus  (CloudEvents, facts only)                  no egress

 contracts  OpenAPI + event schemas --> generated clients
 infra      servers, compose stack, edge, bus, repo settings
 e2e        Playwright tests across all services
 blueprint  shared CI, lint configs, templates for every repo
```

## Two ways to use it

```text
-- 04 -------------------------------------------- TWO WAYS TO USE IT --

  DROP IN                                 BUILD
  +----------------------------+          +----------------------------+
  | <script src=".../loader">  |          | $ npm i @synthwerk/vue     |
  | chat + vision on any page  |          | your app, same services    |
  +----------------------------+          +----------------------------+
```

- The loader script and the SDK packages do not exist yet. The names are the plan.

## Roadmap

```text
-- 06 ------------------------------------------------------- ROADMAP --

  M0       M1       M2       M3       M4       M5       M6
  [>>]-----[  ]-----[  ]-----[  ]-----[  ]-----[  ]-----[  ]
  2026-10  2026-11  2027-01  2027-02  2027-04  2027-05  2027-06
  clean    spine    chat     MVP      public   paid +   cluster
  slate    local    on dev   on prd   demo     SDK      ready

  [>>] in progress    [  ] planned    [##] done
```

- Targets are estimates.

## How the repos fit

```text
-- 07 --------------------------------------------- HOW THE REPOS FIT --

 +----------+  PR + checks  +--------+     auto      +-------+
 |  feat/*  | ------------> |  main  | ------------> |  dev  |
 +----------+               +--------+               +---+---+
                                                         |
                                                         | tag vX.Y.Z
                                                         |
 +-------+   manual approval   +-------+                 |
 |  prd  | <------------------ |  stg  | <---------------+
 +-------+                     +-------+

  trunk-based: no env branches. one image, built once, promoted by digest.
```

- No service deploys yet. This flow is the target for milestone M1 and later.
