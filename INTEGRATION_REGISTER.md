# NOVA Gaming — API Integration Contracts
**Updated:** 2026-09-20  
**Owner:** Backend lead  
**Status:** DRAFT (finalized by end of Week 1)

---

## PURPOSE

This register documents all API contracts between backend and frontend, plus third-party integrations. All teams code to these contracts **in parallel** — no waiting for implementation, only interface definitions.

**Key principle:** Frontend builds mock clients; backend implements the actual service. Both ready to integrate by Week 2.

---

## CORE SERVICES

### 1. AUTHENTICATION & SESSION

#### Endpoint: POST /api/auth/register
**Frontend:** Account signup flow  
**Request:**
```json
{
  "email": "user@example.com",
  "password": "hash_only_on_client",
  "market": "UK",
  "locale": "en"
}
```
**Response (201 Created):**
```json
{
  "user_id": "uuid",
  "session_token": "jwt_token",
  "kyc_status": "pending",
  "email_verified": false,
  "created_at": "2026-09-20T12:00:00Z"
}
```
**Error (400 Bad Request):**
```json
{
  "error": "email_already_exists | invalid_market | weak_password"
}
```

---

#### Endpoint: POST /api/auth/login
**Frontend:** Login form  
**Request:**
```json
{
  "email": "user@example.com",
  "password": "hash_only_on_client"
}
```
**Response (200 OK):**
```json
{
  "user_id": "uuid",
  "session_token": "jwt_token",
  "kyc_status": "pending | submitted | approved | rejected",
  "market": "UK",
  "locale": "en"
}
```
**Error (401 Unauthorized):**
```json
{
  "error": "invalid_credentials | account_suspended | kyc_pending"
}
```

---

#### Endpoint: POST /api/auth/logout
**Frontend:** Logout button  
**Request:** (token in Authorization header)  
**Response (200 OK):**
```json
{
  "status": "logged_out"
}
```

---

#### Endpoint: GET /api/auth/verify
**Frontend:** Session check (on page load)  
**Request:** (token in Authorization header)  
**Response (200 OK):**
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "market": "UK",
  "kyc_status": "approved",
  "kyc_approved_at": "2026-09-20T14:30:00Z"
}
```
**Error (401 Unauthorized):**
```json
{
  "error": "invalid_token | token_expired"
}
```

---

### 2. USER PROFILE & KYC

#### Endpoint: GET /api/user/profile
**Frontend:** Account dashboard  
**Response (200 OK):**
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-15",
  "address": "123 Main St, London, UK",
  "postcode": "EC1A 1BB",
  "phone": "+44 20 1234 5678",
  "market": "UK",
  "locale": "en",
  "kyc_status": "approved",
  "kyc_submitted_at": "2026-09-20T10:00:00Z",
  "kyc_approved_at": "2026-09-20T14:30:00Z",
  "aml_status": "passed",
  "account_created_at": "2026-09-20T09:00:00Z",
  "last_login": "2026-09-20T18:00:00Z"
}
```

---

#### Endpoint: PATCH /api/user/profile
**Frontend:** Edit account settings  
**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+44 20 1234 5678",
  "locale": "en"
}
```
**Response (200 OK):**
```json
{
  "status": "updated",
  "updated_fields": ["first_name", "locale"],
  "user": { /* full profile */ }
}
```

---

#### Endpoint: GET /api/user/kyc-status
**Frontend:** KYC status display (account page)  
**Response (200 OK):**
```json
{
  "status": "pending | submitted | approved | rejected",
  "submitted_at": "2026-09-20T10:00:00Z",
  "approved_at": "2026-09-20T14:30:00Z",
  "rejection_reason": null,
  "retry_available": false,
  "document_types": ["passport", "proof_of_address"],
  "liveness_check": "passed | failed | pending"
}
```

---

#### Endpoint: POST /api/user/kyc-submit
**Frontend:** KYC flow (document upload + liveness)  
**Request (multipart/form-data):**
```
document_type: "passport" | "driving_license" | "utility_bill"
document_file: <binary>
liveness_video: <binary>
address: "123 Main St, London, UK"
postcode: "EC1A 1BB"
```
**Response (202 Accepted — async processing):**
```json
{
  "status": "submitted",
  "kyc_request_id": "kyc_req_123",
  "submitted_at": "2026-09-20T10:00:00Z",
  "estimated_decision": "2026-09-20T14:00:00Z",
  "provider": "IDology"
}
```
**Note:** Backend sends KYC request to provider (IDology for UK, BGgov-approved for Bulgaria). Result arrives async (webhook or polling).

---

#### Endpoint: GET /api/user/kyc-history
**Frontend:** Compliance audit (user sees their KYC submissions)  
**Response (200 OK):**
```json
{
  "submissions": [
    {
      "submission_id": "kyc_req_123",
      "submitted_at": "2026-09-20T10:00:00Z",
      "status": "approved",
      "document_types": ["passport", "proof_of_address"],
      "decision_at": "2026-09-20T14:30:00Z"
    }
  ]
}
```

---

### 3. WALLET & BALANCE

#### Endpoint: GET /api/wallet/balance
**Frontend:** Display balance in wallet widget  
**Response (200 OK):**
```json
{
  "user_id": "uuid",
  "market": "UK",
  "currency": "GBP",
  "balance": 250.50,
  "balance_in_home_currency": 250.50,
  "pending_withdrawals": 0.00,
  "bonus_balance": 0.00,
  "last_updated": "2026-09-20T18:30:00Z"
}
```

---

#### Endpoint: POST /api/wallet/deposit
**Frontend:** Deposit form submission  
**Request:**
```json
{
  "amount": 50.00,
  "currency": "GBP",
  "payment_method": "card",
  "stripe_token": "tok_xxx"
}
```
**Response (201 Created):**
```json
{
  "transaction_id": "dep_123",
  "status": "pending | completed | failed",
  "amount": 50.00,
  "currency": "GBP",
  "balance_after": 300.50,
  "created_at": "2026-09-20T18:30:00Z",
  "stripe_charge_id": "ch_xxx"
}
```
**Error (402 Payment Required):**
```json
{
  "error": "deposit_cap_exceeded | card_declined | kyc_not_approved"
}
```

---

#### Endpoint: POST /api/wallet/withdrawal
**Frontend:** Withdrawal request form  
**Request:**
```json
{
  "amount": 100.00,
  "currency": "GBP",
  "destination_bank_account": "account_id_xxx"
}
```
**Response (202 Accepted — async processing):**
```json
{
  "transaction_id": "wit_123",
  "status": "pending",
  "amount": 100.00,
  "currency": "GBP",
  "fee": 0.00,
  "balance_after": 200.50,
  "requested_at": "2026-09-20T18:30:00Z",
  "estimated_completion": "2026-09-21T18:30:00Z"
}
```
**Note:** Settlement happens via Stripe ACH or local equivalent. User receives email confirmation.

---

#### Endpoint: GET /api/wallet/transactions
**Frontend:** Transaction history page  
**Query params:**
```
?limit=50&offset=0&type=deposit|withdrawal|wager|win
```
**Response (200 OK):**
```json
{
  "transactions": [
    {
      "transaction_id": "dep_123",
      "type": "deposit",
      "amount": 50.00,
      "currency": "GBP",
      "status": "completed",
      "created_at": "2026-09-20T18:30:00Z",
      "reference": "Deposit via Visa ****1234"
    },
    {
      "transaction_id": "game_123_wager",
      "type": "wager",
      "amount": -10.00,
      "currency": "GBP",
      "status": "completed",
      "game_id": "egt_book_of_dead",
      "created_at": "2026-09-20T19:00:00Z"
    },
    {
      "transaction_id": "game_123_win",
      "type": "win",
      "amount": 25.00,
      "currency": "GBP",
      "status": "completed",
      "game_id": "egt_book_of_dead",
      "created_at": "2026-09-20T19:05:00Z"
    }
  ],
  "total_count": 150
}
```

---

### 4. GAME SESSIONS & RESULTS

#### Endpoint: POST /api/games/:provider/session
**Frontend:** User clicks "Play" on a game  
**Path params:** `:provider` = "egt" or "pragmatic"  
**Request:**
```json
{
  "game_id": "book_of_dead",
  "wager_amount": 10.00,
  "currency": "GBP"
}
```
**Response (201 Created):**
```json
{
  "session_id": "sess_egt_123",
  "session_token": "opaque_token_xyz",
  "game_url": "https://egt-games.example.com/launch?token=opaque_token_xyz&game=book_of_dead",
  "expires_at": "2026-09-20T20:00:00Z",
  "balance_before": 250.50,
  "wager_reserved": 10.00
}
```
**Frontend:** Opens game_url in iFrame or new window. Game runs. User plays.

---

#### Endpoint: POST /api/games/result
**Backend Webhook:** Game provider calls this with result  
**Request (from EGT/Pragmatic server):**
```json
{
  "session_id": "sess_egt_123",
  "game_id": "book_of_dead",
  "provider": "egt",
  "wager": 10.00,
  "win": 25.00,
  "rtp": 96.5,
  "spin_id": "spin_123",
  "timestamp": "2026-09-20T19:05:00Z",
  "signature": "hmac_sha256_signature"
}
```
**Validation:** Backend validates signature (prevents tampering). Updates wallet atomically.

**Response (200 OK):**
```json
{
  "status": "recorded",
  "balance_after": 265.50,
  "transaction_id": "game_123_win"
}
```
**Backend action:**
1. Debit wager from wallet (if not already done)
2. Credit win to wallet
3. Log transaction to ledger (immutable)
4. Update session status to "completed"

---

#### Endpoint: GET /api/games/result/:session_id
**Frontend:** Poll for result (if async callback fails)  
**Response (200 OK):**
```json
{
  "session_id": "sess_egt_123",
  "status": "completed | pending | failed",
  "game_result": {
    "wager": 10.00,
    "win": 25.00,
    "rtp": 96.5
  },
  "balance_after": 265.50
}
```

---

### 5. LIVE DEALER TABLES

#### Endpoint: GET /api/live/tables
**Frontend:** Live tables lobby  
**Response (200 OK):**
```json
{
  "tables": [
    {
      "table_id": "live_roulette_1",
      "provider": "pragmatic",
      "game_type": "roulette",
      "language": "en",
      "status": "open | playing | closed",
      "min_bet": 1.00,
      "max_bet": 1000.00,
      "players_count": 5,
      "dealer_name": "Natasha",
      "video_url": "https://live-dealer.example.com/stream/live_roulette_1",
      "next_spin_time": "2026-09-20T19:10:00Z"
    }
  ]
}
```

---

#### WebSocket: WS /api/live/table/:table_id
**Frontend:** Connect to live table real-time updates  
**Connection header:** Token in Authorization  

**Messages (Frontend receives):**
```json
{
  "event": "table_state_update",
  "data": {
    "table_id": "live_roulette_1",
    "status": "playing",
    "current_hand": "roulette_spin_123",
    "players": [
      { "player_id": "p1", "name": "Alice", "balance": 500, "bet": 50 },
      { "player_id": "p2", "name": "Bob", "balance": 1000, "bet": 100 }
    ],
    "time_remaining": 15
  }
}
```

```json
{
  "event": "dealer_action",
  "data": {
    "action": "spin_result",
    "result": "17_red",
    "winners": ["p1", "p3"],
    "next_round_opens_at": "2026-09-20T19:10:00Z"
  }
}
```

```json
{
  "event": "language_change",
  "data": {
    "language": "bg",
    "dealer_instructions": "Моля направете вашите залози..."
  }
}
```

---

### 6. COMPLIANCE & LIMITS

#### Endpoint: GET /api/user/session-time
**Frontend:** Display minutes played today (compliance display)  
**Response (200 OK):**
```json
{
  "minutes_played_today": 45,
  "session_limit": 60,
  "minutes_remaining": 15,
  "market": "UK"
}
```

---

#### Endpoint: POST /api/user/deposit-limit-check
**Backend:** Called before accepting deposit (client-side validation too)  
**Request:**
```json
{
  "amount": 500.00,
  "currency": "GBP"
}
```
**Response (200 OK — limit OK):**
```json
{
  "allowed": true,
  "deposit_limit": 500.00,
  "already_deposited_today": 0.00,
  "remaining": 500.00
}
```
**Response (403 Forbidden — limit exceeded):**
```json
{
  "allowed": false,
  "error": "daily_deposit_cap_exceeded",
  "deposit_limit": 500.00,
  "already_deposited_today": 400.00,
  "remaining": 100.00,
  "market": "UK"
}
```

---

#### Endpoint: POST /api/user/session-limit-check
**Backend:** Called on game launch (60 min limit for UK, 90 min for Bulgaria)  
**Response (200 OK):**
```json
{
  "allowed": true,
  "session_time": 45,
  "session_limit": 60,
  "remaining": 15
}
```
**Response (403 Forbidden — time exceeded):**
```json
{
  "allowed": false,
  "error": "session_time_limit_exceeded",
  "session_limit": 60,
  "session_time": 65,
  "force_logout_at": "2026-09-20T20:05:00Z"
}
```
**Frontend action:** Show warning modal → auto-logout at timestamp.

---

#### Endpoint: POST /api/user/self-exclude
**Frontend:** Self-exclusion form  
**Request:**
```json
{
  "exclusion_period": "6_months | 1_year | 5_years | permanent",
  "reason": "optional reason"
}
```
**Response (200 OK):**
```json
{
  "status": "self_excluded",
  "exclusion_period": "6_months",
  "exclusion_start": "2026-09-20T19:30:00Z",
  "exclusion_end": "2027-03-20T19:30:00Z",
  "account_locked": true
}
```
**Backend action:** Lock account. Send confirmation email. Flag for compliance reporting.

---

#### Endpoint: GET /api/user/self-exclusion-status
**Frontend:** Check if user is self-excluded (on login)  
**Response (200 OK — not excluded):**
```json
{
  "excluded": false
}
```
**Response (200 OK — excluded):**
```json
{
  "excluded": true,
  "exclusion_start": "2026-09-20T19:30:00Z",
  "exclusion_end": "2027-03-20T19:30:00Z",
  "can_request_early_removal": false
}
```

---

### 7. COMPLIANCE REPORTING (Backend → Admin)

#### Endpoint: GET /api/compliance/reports/ukgc/monthly
**Admin/Compliance Dashboard:** Download monthly UKGC report  
**Query params:**
```
?year=2026&month=9
```
**Response (200 OK — CSV or JSON):**
```json
{
  "report_month": "2026-09",
  "total_players": 1250,
  "new_players": 150,
  "active_players": 800,
  "total_revenue_gbp": 25000.00,
  "total_wagers_gbp": 500000.00,
  "total_wins_gbp": 475000.00,
  "incidents_reported": [
    {
      "date": "2026-09-15",
      "type": "underage_signup_blocked",
      "details": "User age verification failed"
    }
  ]
}
```

---

#### Endpoint: GET /api/compliance/reports/bggovmonthly
**Admin/Compliance Dashboard:** Download monthly BGgov report (different format)  
**Response (200 OK — CSV or JSON):**
```json
{
  "report_month": "2026-09",
  "total_players_bg": 450,
  "new_players_bg": 50,
  "total_revenue_bgn": 50000.00,
  "kyc_completions": 48,
  "aml_flags": 2,
  "incidents": []
}
```

---

### 8. HEALTH & STATUS

#### Endpoint: GET /api/health
**Monitoring/Liveness:** Used by load balancers, K8s, CI/CD  
**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-09-20T19:30:00Z",
  "database": "connected",
  "redis": "connected",
  "websocket_server": "running",
  "egt_api": "connected",
  "pragmatic_api": "connected",
  "stripe_api": "connected",
  "kyc_provider_uk": "connected",
  "kyc_provider_bg": "connected"
}
```

---

## THIRD-PARTY INTEGRATIONS

### EGT (Bulgaria)

| Component | Service | Status |
|-----------|---------|--------|
| **API Docs** | https://developer.egt.com (TBD) | Needed by Week 1 |
| **Session Token Format** | TBD (typically JWT or opaque string) | Needed by Week 2 |
| **Result Callback Endpoint** | POST /api/games/egt/callback | Documented above |
| **Game Catalog Endpoint** | GET https://api.egt.com/games/list | Documented Week 2 |
| **Sandbox URL** | https://sandbox-egt.example.com | TBD |
| **Production URL** | https://egt-games.example.com | TBD |

---

### Pragmatic Play (UK Fallback)

| Component | Service | Status |
|-----------|---------|--------|
| **API Docs** | https://pragmaticplay.com/developer (check portal) | Needed by Week 1 |
| **Session Token Format** | TBD | Needed by Week 2 |
| **Result Callback Endpoint** | POST /api/games/pragmatic/callback | Documented above |
| **Game Catalog Endpoint** | GET https://api.pragmaticplay.com/games | Documented Week 2 |
| **Sandbox URL** | https://sandbox-pp.example.com | TBD |
| **Production URL** | https://pragmatic-games.example.com | TBD |

---

### KYC Providers

| Market | Provider | Status |
|--------|----------|--------|
| **UK** | IDology or Jumio | TBD (contract Week 1) |
| **Bulgaria** | BGgov-approved (TBD) | TBD (contract Week 1) |
| **Result Webhook** | POST /api/user/kyc-result/:provider | Documented Week 2 |

---

### AML Screening

| Component | Service | Status |
|-----------|---------|--------|
| **Provider** | Lexis Nexis or Socure | TBD (contract Week 1) |
| **OFAC Lists** | Updated daily | Integrated Week 2 |
| **SDN Lists** | OFAC + Bulgaria equivalent | Integrated Week 2 |
| **API Endpoint** | POST /api/compliance/aml-check | Documented Week 2 |

---

### Stripe (Multi-Currency Payments)

| Component | Service | Status |
|-----------|---------|--------|
| **Stripe FX** | Currency conversion + settlement | Ready (production account needed) |
| **Test Keys** | sandbox stripe keys | Setup immediately |
| **Deposit Endpoint** | Backend calls Stripe API (not frontend) | Documented Week 2 |
| **Webhook** | charge.succeeded, charge.failed | Documented Week 2 |

---

## INTEGRATION TIMELINE

| Week | Deliverable | Owner |
|------|-------------|-------|
| **Week 1** | API contracts finalized (this document) | Backend lead |
| **Week 1** | EGT + Pragmatic API docs received | DevOps / Integration lead |
| **Week 1** | KYC providers selected + API keys | Compliance |
| **Week 2** | Backend implements all endpoints | Backend team |
| **Week 2** | Frontend builds mock API clients | Frontend team |
| **Week 2-3** | EGT SDK integration (sandbox) | Frontend / Integration lead |
| **Week 2-3** | Pragmatic SDK integration (sandbox) | Frontend / Integration lead |
| **Week 2-3** | KYC provider integration (test) | Backend + Compliance |
| **Week 3-4** | Stripe deposit/withdrawal (test) | Backend |
| **Week 3-4** | Live dealer WebSocket (test) | Backend |
| **Week 4-5** | Load testing (all services) | QA + DevOps |
| **Week 5-6** | Staging environment (production-ready) | DevOps |

---

## APPROVAL & SIGN-OFF

- **Backend lead:** Contract definitions accurate? **[ ] YES**
- **Frontend lead:** Contracts support UI flows? **[ ] YES**
- **Compliance:** Legal/regulatory requirements met? **[ ] YES**
- **DevOps:** Infrastructure plan matches? **[ ] YES**

---

**Next step:** All leads review + sign off by end of Week 1 Monday. Teams code to contracts immediately.
