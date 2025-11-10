────────────────────────────────────────────────────────────────────────
22) PRICING & REVENUE MODEL
────────────────────────────────────────────────────────────────────────

22.1 PRICING PHILOSOPHY

Predictli operates a **base subscription + usage-based** model designed to:
- Align platform costs with customer value delivery
- Scale fairly from boutique agencies to enterprise RPO firms
- Incentivize marketplace participation and network effects
- Pass through variable costs (AI, messaging) transparently
- Enable predictable budgeting with usage caps and alerts

**Pricing Principles:**
1. Base fee covers platform access, core limits, and fixed infrastructure
2. Usage fees tied to actual consumption (messages, interviews, API calls)
3. Volume discounts encourage higher tiers and bulk usage
4. Marketplace success fees only on completed placements
5. Multi-agency coordination unlocks premium pricing

────────────────────────────────────────────────────────────────────────
22.2 SUBSCRIPTION TIERS

22.2.1 TIER 1: STARTER AGENCY

**Base: $299/month** (billed monthly or $2,990/year, 17% savings)

**Included Limits:**
- 500 active candidates (per_candidate records with active_flag=true)
- 1,000 messages/month (combined WhatsApp + SMS)
- 50 AI interviews/month (evt_interview_* sessions)
- 2 user seats (per_user records)
- 5,000 API calls/month
- Basic sentiment analysis (3-point scale: positive/neutral/negative)
- Standard matching algorithm (deterministic rules-based)
- Single tenant dashboard
- Email support (24-hour SLA)

**Overage Pricing:**
- Messages: $0.020 per message beyond 1,000
- AI Interviews: $5.00 per interview beyond 50
- Candidates: $0.50 per active candidate beyond 500 (prorated daily)
- User Seats: $49/month per additional user
- API Calls: $0.10 per 1,000 calls beyond 5,000

**Not Included:**
- Marketplace access (read-only visibility)
- Multi-agency collaboration
- Custom matching algorithms
- White-label branding
- Dedicated support

**Target Customer:**
- Boutique agencies (1-5 recruiters)
- Niche/specialist recruitment firms
- Agencies testing platform fit
- ~50-100 active placements/year

────────────────────────────────────────────────────────────────────────

22.2.2 TIER 2: PROFESSIONAL AGENCY

**Base: $799/month** (billed monthly or $7,990/year, 17% savings)

**Included Limits:**
- 2,000 active candidates
- 5,000 messages/month
- 200 AI interviews/month
- 5 user seats
- 25,000 API calls/month
- Advanced sentiment analysis (7-point scale with emotion detection)
- Priority matching (candidate pool scanning every 15 minutes)
- Marketplace listing privileges (can offer candidates)
- Multi-user collaboration tools
- Priority email + chat support (8-hour SLA)

**Overage Pricing:**
- Messages: $0.015 per message (25% discount vs Starter)
- AI Interviews: $4.00 per interview (20% discount)
- Candidates: $0.40 per active candidate beyond 2,000
- User Seats: $39/month per additional user
- API Calls: $0.08 per 1,000 calls beyond 25,000

**Additional Features:**
- Revenue share on marketplace referrals: 10% of placement fee
- Custom reactivation cadence rules
- Integration webhooks (outbound to client systems)
- Quarterly business reviews
- 2-hour emergency support SLA

**Target Customer:**
- Mid-market agencies (5-15 recruiters)
- Multi-sector generalist firms
- ~200-500 active placements/year

────────────────────────────────────────────────────────────────────────

22.2.3 TIER 3: ENTERPRISE AGENCY

**Base: $2,499/month** (billed quarterly or $24,990/year, 17% savings)

**Included Limits:**
- Unlimited active candidates
- 20,000 messages/month
- 1,000 AI interviews/month
- Unlimited user seats
- 150,000 API calls/month
- Real-time sentiment analysis with custom models
- Instant matching (triggered on candidate/job changes)
- Full marketplace participation (buy + sell candidates)
- Custom matching algorithm configuration
- White-label portal customization (logo, domain, colors)
- Dedicated account manager
- Phone + Slack support (2-hour SLA, 1-hour critical)

**Overage Pricing:**
- Messages: $0.010 per message (50% discount vs Starter)
- AI Interviews: $3.00 per interview (40% discount)
- API Calls: $0.05 per 1,000 calls beyond 150,000

**Additional Features:**
- Revenue share on marketplace: 15% of placement fee (vs 10% Professional)
- Custom event routing to client data warehouses
- Bulk candidate import/export tools
- Advanced analytics and BI dashboards
- SSO integration (SAML/OIDC)
- Custom SLA agreements available
- On-demand training sessions

**Target Customer:**
- Enterprise RPO firms (15+ recruiters)
- Multi-office national/international agencies
- Specialized high-volume verticals (IT, healthcare, finance)
- ~1,000+ active placements/year

────────────────────────────────────────────────────────────────────────

22.2.4 TIER 4: NETWORK/CONSORTIUM (Custom Pricing)

**Starting: ~$10,000/month** (custom contracts, annual minimum)

**Custom Configuration:**
- Multi-agency coordination and shared talent pools
- Cross-organization candidate visibility rules
- Custom revenue-sharing formulas between consortium members
- Dedicated infrastructure and data isolation
- Enterprise-grade SLA (99.95% uptime)
- Custom integrations and API development
- On-premise deployment options
- 24/7 white-glove support
- Quarterly on-site strategic planning

**Target Customer:**
- Recruitment networks and franchises
- Industry consortiums (e.g., healthcare staffing alliances)
- Large holding companies with multiple agency brands

────────────────────────────────────────────────────────────────────────
22.3 USAGE METERING ARCHITECTURE

All usage events are captured in the event stream with Factory SDK compliance and aggregated for billing purposes.

22.3.1 BILLABLE EVENT DEFINITIONS

**Message Events (evt_message_sent)**
```json
{
  "event_type": "evt_message_sent",
  "org_id": "uuid",
  "per_candidate_id": "uuid",
  "channel": "whatsapp|sms",
  "template_id": "uuid",
  "cost_basis": "billable",
  "timestamp": "ISO8601",
  "message_tokens": 42,
  "delivery_status": "delivered|failed"
}
```

**Billing Rule:**
- Count = 1 per `evt_message_sent` where `delivery_status = 'delivered'`
- Failed messages do NOT count toward usage
- Group SMS (multi-recipient) counts as N messages where N = recipient count
- System-generated transactional messages (password resets, receipts) are NOT billable

────────────────────────────────────────────────────────────────────────

**AI Interview Events (evt_interview_completed)**
```json
{
  "event_type": "evt_interview_completed",
  "org_id": "uuid",
  "per_candidate_id": "uuid",
  "interview_id": "uuid",
  "duration_seconds": 180,
  "questions_asked": 5,
  "transcript_length": 2400,
  "ai_tokens_consumed": 12500,
  "cost_basis": "billable",
  "timestamp": "ISO8601"
}
```

**Billing Rule:**
- Count = 1 per `evt_interview_completed` event
- Abandoned interviews (< 30 seconds or < 2 questions) are NOT billable
- Re-interviews for same candidate on same job within 7 days = 0.5 credit (50% discount)

────────────────────────────────────────────────────────────────────────

**Active Candidate Storage (per_candidate)**
```sql
-- Daily snapshot at 00:00 UTC
SELECT 
  org_id,
  COUNT(*) as active_candidates
FROM per_candidate
WHERE 
  active_flag = true
  AND (last_activity_at >= CURRENT_DATE - INTERVAL '90 days'
       OR created_at >= CURRENT_DATE - INTERVAL '30 days')
GROUP BY org_id;
```

**Billing Rule:**
- Daily average active candidates over billing period
- Prorated to the day if tier limits exceeded
- Example: 550 candidates (Starter tier limit = 500)
  - Overage = 50 candidates × $0.50/candidate × (days_over/days_in_month)
  - If 15 days over in 30-day month: 50 × $0.50 × (15/30) = $12.50

────────────────────────────────────────────────────────────────────────

**API Call Metering (evt_api_call)**
```json
{
  "event_type": "evt_api_call",
  "org_id": "uuid",
  "endpoint": "/api/v1/candidates",
  "method": "POST",
  "response_code": 200,
  "cost_basis": "billable",
  "timestamp": "ISO8601",
  "processing_time_ms": 45
}
```

**Billing Rule:**
- Count = 1 per successful API call (2xx/3xx status codes)
- Billable endpoints: /candidates, /jobs, /matches, /interviews, /analytics
- Non-billable: /auth, /health, /webhooks (inbound), failed calls (4xx/5xx)
- Batch operations count as single call (e.g., bulk candidate import)

────────────────────────────────────────────────────────────────────────

22.3.2 METERING AGGREGATION LOGIC

**Database Schema:**
```sql
CREATE TABLE billing_usage_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES org_tenant(id),
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,
  
  -- Message usage
  messages_sent_total INTEGER DEFAULT 0,
  messages_whatsapp INTEGER DEFAULT 0,
  messages_sms INTEGER DEFAULT 0,
  messages_overage INTEGER DEFAULT 0,
  
  -- Interview usage
  interviews_completed INTEGER DEFAULT 0,
  interviews_overage INTEGER DEFAULT 0,
  
  -- Candidate storage (daily average)
  candidates_active_avg NUMERIC(10,2) DEFAULT 0,
  candidates_overage_days INTEGER DEFAULT 0,
  
  -- API usage
  api_calls_total INTEGER DEFAULT 0,
  api_calls_overage INTEGER DEFAULT 0,
  
  -- User seats
  user_seats_active INTEGER DEFAULT 0,
  user_seats_overage INTEGER DEFAULT 0,
  
  -- Marketplace activity
  marketplace_placements INTEGER DEFAULT 0,
  marketplace_revenue_earned NUMERIC(12,2) DEFAULT 0,
  marketplace_fees_owed NUMERIC(12,2) DEFAULT 0,
  
  -- Calculated amounts
  base_subscription_fee NUMERIC(12,2) NOT NULL,
  usage_charges NUMERIC(12,2) DEFAULT 0,
  marketplace_fees NUMERIC(12,2) DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  finalized_at TIMESTAMPTZ,
  invoice_id UUID REFERENCES billing_invoice(id),
  
  UNIQUE(org_id, billing_period_start)
);

CREATE INDEX idx_billing_usage_org_period 
  ON billing_usage_summary(org_id, billing_period_start);
```

────────────────────────────────────────────────────────────────────────

**Aggregation Job (Celery Task)**
```python
# Runs daily at 01:00 UTC to aggregate previous day's usage
@celery_app.task
def aggregate_daily_usage(date: datetime.date):
    """
    Aggregate usage events from evt_* tables into billing summary.
    """
    for org in get_active_orgs():
        # Messages
        msg_count = db.query("""
            SELECT 
              COUNT(*) as total,
              SUM(CASE WHEN channel='whatsapp' THEN 1 ELSE 0 END) as whatsapp,
              SUM(CASE WHEN channel='sms' THEN 1 ELSE 0 END) as sms
            FROM evt_message_sent
            WHERE org_id = %s 
              AND DATE(timestamp) = %s
              AND delivery_status = 'delivered'
              AND cost_basis = 'billable'
        """, (org.id, date))
        
        # Interviews
        interview_count = db.query("""
            SELECT COUNT(*) as total
            FROM evt_interview_completed
            WHERE org_id = %s 
              AND DATE(timestamp) = %s
              AND duration_seconds >= 30
              AND questions_asked >= 2
        """, (org.id, date))
        
        # Active candidates (snapshot)
        candidate_count = db.query("""
            SELECT COUNT(*) as total
            FROM per_candidate
            WHERE org_id = %s
              AND active_flag = true
              AND (last_activity_at >= %s - INTERVAL '90 days'
                   OR created_at >= %s - INTERVAL '30 days')
        """, (org.id, date, date))
        
        # API calls
        api_count = db.query("""
            SELECT COUNT(*) as total
            FROM evt_api_call
            WHERE org_id = %s 
              AND DATE(timestamp) = %s
              AND response_code BETWEEN 200 AND 399
              AND cost_basis = 'billable'
        """, (org.id, date))
        
        # Upsert into summary (accumulate for current billing period)
        db.upsert_usage_summary(
            org_id=org.id,
            date=date,
            messages=msg_count,
            interviews=interview_count,
            candidates=candidate_count,
            api_calls=api_count
        )
```

────────────────────────────────────────────────────────────────────────
22.4 MARKETPLACE REVENUE MODEL

The Predictli marketplace enables agencies to share and monetize their candidate pools while maintaining competitive advantages through controlled visibility.

22.4.1 MARKETPLACE PARTICIPATION RULES

**Tier Requirements:**
- **Starter:** Read-only access (can search, cannot list)
- **Professional:** Can list candidates for marketplace placement
- **Enterprise:** Full participation (list + priority search + bulk operations)
- **Network/Consortium:** Custom rules for inter-agency sharing

**Candidate Listing Eligibility:**
```sql
-- Candidates eligible for marketplace listing
SELECT c.*
FROM per_candidate c
WHERE 
  c.consent->>'marketplace' = 'true'  -- Explicit marketplace consent
  AND c.active_flag = true
  AND c.last_activity_at >= CURRENT_DATE - INTERVAL '120 days'
  AND c.placement_status != 'placed'
  AND NOT EXISTS (
    -- Not currently in active application process
    SELECT 1 FROM org_application a
    WHERE a.per_candidate_id = c.id
      AND a.stage IN ('interview', 'offer', 'negotiation')
      AND a.updated_at >= CURRENT_DATE - INTERVAL '30 days'
  );
```

────────────────────────────────────────────────────────────────────────

22.4.2 REVENUE SHARING MECHANICS

**Placement Fee Split (Standard):**

When Agency A (referring) shares candidate with Agency B (receiving), and placement succeeds:

```
Total Placement Fee: $20,000 (example)

Split Calculation:
├─ Referring Agency (A): 70% = $14,000
├─ Platform Fee: 20% = $4,000
│  ├─ To Referring Agency: 10% = $2,000
│  └─ To Predictli: 10% = $2,000
└─ Receiving Agency (B): 10% = $2,000 (finder's fee)

Final Distribution:
- Agency A receives: $14,000 + $2,000 = $16,000 (80%)
- Agency B receives: $2,000 (10%)
- Predictli receives: $2,000 (10%)
```

**Revenue Share Formula:**
```python
def calculate_marketplace_split(
    placement_fee: Decimal,
    referring_org_tier: str,
    receiving_org_tier: str
) -> dict:
    """
    Calculate revenue split for marketplace placement.
    
    Tier-based platform fee:
    - Professional: 20% platform fee (10% to referrer, 10% to Predictli)
    - Enterprise: 15% platform fee (5% to referrer, 10% to Predictli)
    - Network/Consortium: Custom (typically 5-10% total)
    """
    
    if referring_org_tier == 'professional':
        platform_fee_pct = 0.20
        referrer_bonus_pct = 0.10  # Half of platform fee
    elif referring_org_tier == 'enterprise':
        platform_fee_pct = 0.15
        referrer_bonus_pct = 0.05
    else:
        raise ValueError("Only Pro+ can list in marketplace")
    
    platform_fee = placement_fee * platform_fee_pct
    referrer_bonus = placement_fee * referrer_bonus_pct
    predictli_fee = platform_fee - referrer_bonus
    
    # Finder's fee for receiving agency (fixed 10%)
    receiver_fee = placement_fee * 0.10
    
    # Remainder to referring agency
    referrer_net = placement_fee - platform_fee - receiver_fee
    
    return {
        'referring_agency': referrer_net + referrer_bonus,
        'receiving_agency': receiver_fee,
        'predictli': predictli_fee,
        'total': placement_fee
    }
```

**Database Schema:**
```sql
CREATE TABLE marketplace_transaction (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Parties
  referring_org_id UUID NOT NULL REFERENCES org_tenant(id),
  receiving_org_id UUID NOT NULL REFERENCES org_tenant(id),
  per_candidate_id UUID NOT NULL REFERENCES per_candidate(id),
  org_job_id UUID NOT NULL REFERENCES org_job(id),
  
  -- Placement details
  placement_date DATE NOT NULL,
  placement_fee NUMERIC(12,2) NOT NULL,
  
  -- Revenue split
  referring_amount NUMERIC(12,2) NOT NULL,
  receiving_amount NUMERIC(12,2) NOT NULL,
  predictli_amount NUMERIC(12,2) NOT NULL,
  
  -- Metadata
  agreement_id UUID,  -- Reference to marketplace agreement terms
  payment_status TEXT CHECK (payment_status IN 
    ('pending', 'paid_referring', 'paid_receiving', 'completed', 'disputed')),
  payment_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_marketplace_txn_referring 
  ON marketplace_transaction(referring_org_id, placement_date);
CREATE INDEX idx_marketplace_txn_receiving 
  ON marketplace_transaction(receiving_org_id, placement_date);
```

────────────────────────────────────────────────────────────────────────

22.4.3 MARKETPLACE USAGE COSTS

**Who Pays for What:**

**During Candidate Sharing:**
- **Reactivation messages** (initial outreach): Paid by referring agency's plan
- **AI interview** for marketplace candidate: Platform absorbs cost (marketing expense)
- **Receiving agency outreach**: Paid by receiving agency's plan once engaged

**Example Scenario:**
```
Day 1: Agency A lists candidate to marketplace
  - No cost (listing is free)

Day 3: Agency B discovers candidate, initiates AI interview
  - AI interview cost: Absorbed by Predictli ($0 to Agency B)
  - Agency A's plan unaffected

Day 5: Agency B wants to engage candidate directly
  - SMS/WhatsApp messages: Count against Agency B's plan
  - Agency A receives notification (no cost)

Day 30: Placement successful, Agency B hires candidate
  - Revenue split triggered (see 22.4.2)
  - Both agencies billed/credited on next invoice
```

────────────────────────────────────────────────────────────────────────

22.4.4 DETAILED MARKETPLACE REVENUE SHARING SCENARIOS

**SCENARIO 1: Standard Two-Party Placement**

```
PARTIES:
- Agency A (Referring): Listed candidate to marketplace
- Agency B (Receiving): Found candidate, made placement
- Client: Hired candidate for $120K salary
- Standard placement fee: 20% = $24,000

REVENUE SPLIT:
┌─────────────────────────────────────────────────────────────────┐
│ Total Placement Fee: $24,000                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Agency A (Referring):                                           │
│   Base retention:        70% × $24,000 = $16,800               │
│   Marketplace bonus:     10% × $24,000 = $2,400                │
│   TOTAL TO AGENCY A:                    $19,200 (80%)          │
│                                                                 │
│ Agency B (Receiving):                                           │
│   Finder's fee:          10% × $24,000 = $2,400                │
│   TOTAL TO AGENCY B:                    $2,400 (10%)           │
│                                                                 │
│ Predictli (Platform):                                           │
│   Platform fee:          10% × $24,000 = $2,400                │
│   TOTAL TO PREDICTLI:                   $2,400 (10%)           │
│                                                                 │
│ VERIFICATION: $19,200 + $2,400 + $2,400 = $24,000 ✓           │
└─────────────────────────────────────────────────────────────────┘
```

**SCENARIO 2: Enterprise Tier Referring Agency (Lower Platform Fee)**

```
PARTIES:
- Agency A (Referring): Enterprise tier customer
- Agency B (Receiving): Professional tier customer
- Placement fee: $30,000

REVENUE SPLIT:
┌─────────────────────────────────────────────────────────────────┐
│ Total Placement Fee: $30,000                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Agency A (Referring - Enterprise tier):                         │
│   Base retention:        70% × $30,000 = $21,000               │
│   Marketplace bonus:      5% × $30,000 = $1,500 (lower %)      │
│   TOTAL TO AGENCY A:                    $22,500 (75%)          │
│                                                                 │
│ Agency B (Receiving):                                           │
│   Finder's fee:          15% × $30,000 = $4,500 (higher %)     │
│   TOTAL TO AGENCY B:                    $4,500 (15%)           │
│                                                                 │
│ Predictli (Platform):                                           │
│   Platform fee:          10% × $30,000 = $3,000                │
│   TOTAL TO PREDICTLI:                   $3,000 (10%)           │
│                                                                 │
│ VERIFICATION: $22,500 + $4,500 + $3,000 = $30,000 ✓           │
└─────────────────────────────────────────────────────────────────┘

NOTE: Enterprise tier gets better retention (75% vs 80%) because they 
have higher volume and negotiate better terms. Receiving agency gets 
larger finder's fee (15% vs 10%) to compensate for working with 
premium candidate.
```

**SCENARIO 3: Multi-Touch Placement (Candidate Passed Through Multiple Agencies)**

```
SITUATION:
- Agency A: Originally sourced candidate, listed to marketplace
- Agency B: Engaged candidate, couldn't place (wrong fit)
- Agency C: Found candidate through marketplace, successfully placed
- Placement fee: $25,000

REVENUE SPLIT:
┌─────────────────────────────────────────────────────────────────┐
│ Total Placement Fee: $25,000                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Agency A (Original Source):                                     │
│   Base retention:        60% × $25,000 = $15,000               │
│   Marketplace bonus:      5% × $25,000 = $1,250                │
│   TOTAL TO AGENCY A:                    $16,250 (65%)          │
│                                                                 │
│ Agency B (Middle touch):                                        │
│   Introduction fee:       5% × $25,000 = $1,250                │
│   TOTAL TO AGENCY B:                    $1,250 (5%)            │
│                                                                 │
│ Agency C (Placing agency):                                      │
│   Placement success fee: 20% × $25,000 = $5,000                │
│   TOTAL TO AGENCY C:                    $5,000 (20%)           │
│                                                                 │
│ Predictli (Platform):                                           │
│   Platform fee:          10% × $25,000 = $2,500                │
│   TOTAL TO PREDICTLI:                   $2,500 (10%)           │
│                                                                 │
│ VERIFICATION: $16,250 + $1,250 + $5,000 + $2,500 = $25,000 ✓  │
└─────────────────────────────────────────────────────────────────┘

RULE: Original sourcing agency always retains majority share. 
Subsequent agencies share the remaining pool proportionally based 
on contribution to eventual placement.
```

**SCENARIO 4: Direct Employer Hire from Marketplace**

```
SITUATION:
- Agency A: Listed candidate to marketplace
- Employer X: Discovered candidate directly (no agency intermediary)
- Hired candidate for $110K salary
- Standard placement fee: 18% = $19,800

REVENUE SPLIT:
┌─────────────────────────────────────────────────────────────────┐
│ Total Placement Fee: $19,800                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Agency A (Referring):                                           │
│   Base retention:        85% × $19,800 = $16,830               │
│   Direct placement bonus: 5% × $19,800 = $990                  │
│   TOTAL TO AGENCY A:                    $17,820 (90%)          │
│                                                                 │
│ Employer X:                                                     │
│   No fee (they're paying the $19,800)                          │
│   BENEFIT: Avoided agency markup, direct hire                  │
│                                                                 │
│ Predictli (Platform):                                           │
│   Platform fee:          10% × $19,800 = $1,980                │
│   TOTAL TO PREDICTLI:                   $1,980 (10%)           │
│                                                                 │
│ VERIFICATION: $17,820 + $1,980 = $19,800 ✓                    │
└─────────────────────────────────────────────────────────────────┘

NOTE: Agency A gets BEST terms (90% retention) when employer hires 
directly because there's no receiving agency to pay. This incentivizes 
agencies to list high-quality candidates to marketplace knowing direct 
employer interest = maximum payout.
```

**SCENARIO 5: Placement with Performance Guarantee**

```
SITUATION:
- Agency A: Listed senior candidate to marketplace
- Agency B: Placed candidate with 90-day performance guarantee
- Placement fee: $35,000
- Guarantee: Full refund if candidate leaves within 90 days

REVENUE SPLIT (Escrow Model):
┌─────────────────────────────────────────────────────────────────┐
│ Total Placement Fee: $35,000                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ DAY 0-30 (Initial Payment):                                    │
│   Agency A receives:  30% × $19,200 = $5,760 (escrowed)       │
│   Agency B receives:  30% × $2,400  = $720  (escrowed)        │
│   Predictli receives: 30% × $2,400  = $720  (immediate)       │
│   HELD IN ESCROW:     70% × $24,800 = $17,360                 │
│                                                                 │
│ DAY 31-60 (Second Payment):                                    │
│   Agency A receives:  35% × $19,200 = $6,720                  │
│   Agency B receives:  35% × $2,400  = $840                    │
│   Predictli receives: 35% × $2,400  = $840                    │
│   REMAINING ESCROW:   35% × $24,800 = $8,680                  │
│                                                                 │
│ DAY 61-90 (Performance Period):                                │
│   IF candidate retained & performing:                          │
│     Agency A receives:  35% × $19,200 = $6,720 (final)        │
│     Agency B receives:  35% × $2,400  = $840  (final)         │
│     Predictli receives: 35% × $2,400  = $840  (final)         │
│                                                                 │
│   IF candidate leaves or fails:                                │
│     ALL ESCROWED FUNDS RETURNED TO CLIENT                      │
│     Agency A/B forfeit remaining payments                      │
│     Predictli keeps only delivered value (30% + 35% = 65%)    │
└─────────────────────────────────────────────────────────────────┘

RISK MITIGATION:
- Referring agency shares placement risk
- Incentivizes quality candidates only on marketplace
- Receiving agency accountable for candidate success
- Platform fee tied to value delivery (stages)
```

────────────────────────────────────────────────────────────────────────

22.4.5 MARKETPLACE REVENUE SHARING CONFIGURATION

**Customizable Split Rules:**

Agencies can negotiate custom revenue sharing terms based on:

```python
# Revenue split calculation engine
class MarketplaceRevenueCalculator:
    def calculate_split(
        self,
        placement_fee: Decimal,
        referring_org: Organization,
        receiving_org: Organization,
        placement_context: dict
    ) -> dict:
        """
        Calculate revenue split with configurable rules.
        """
        # Base split percentages
        config = self.get_split_config(
            referring_tier=referring_org.subscription_tier,
            receiving_tier=receiving_org.subscription_tier,
            placement_context=placement_context
        )
        
        # Apply modifiers
        if placement_context.get('direct_employer_hire'):
            config['referring_pct'] += 10  # Bonus for direct hire
            config['receiving_pct'] = 0     # No intermediary
        
        if placement_context.get('multi_touch'):
            # Divide receiving_pct among multiple agencies
            num_touches = len(placement_context['touch_history'])
            config['receiving_pct'] /= num_touches
        
        if placement_context.get('performance_guarantee'):
            # Escrow schedule
            config['escrow_schedule'] = [
                {'day': 0, 'pct': 30},
                {'day': 30, 'pct': 35},
                {'day': 60, 'pct': 35}
            ]
        
        # Calculate amounts
        referring_amount = placement_fee * (config['referring_pct'] / 100)
        receiving_amount = placement_fee * (config['receiving_pct'] / 100)
        predictli_amount = placement_fee * (config['platform_pct'] / 100)
        
        return {
            'referring_agency': {
                'amount': referring_amount,
                'percentage': config['referring_pct'],
                'escrow_schedule': config.get('escrow_schedule')
            },
            'receiving_agency': {
                'amount': receiving_amount,
                'percentage': config['receiving_pct'],
                'escrow_schedule': config.get('escrow_schedule')
            },
            'predictli': {
                'amount': predictli_amount,
                'percentage': config['platform_pct']
            },
            'total': placement_fee
        }
```

**Tier-Based Platform Fees:**

| Referring Agency Tier | Platform Fee | Marketplace Bonus | Net Retention |
|-----------------------|--------------|-------------------|---------------|
| Starter               | 20%          | 10%               | 80%           |
| Professional          | 20%          | 10%               | 80%           |
| Enterprise            | 15%          | 5%                | 80%           |
| Network/Consortium    | 10%          | 5%                | 85%           |

**Volume Discounts:**

```
Quarterly Marketplace Placements:
- 1-10 placements:    Standard rates (above)
- 11-25 placements:   -2% platform fee
- 26-50 placements:   -3% platform fee
- 51-100 placements:  -5% platform fee
- 100+ placements:    Custom negotiated rates
```

────────────────────────────────────────────────────────────────────────
22.5 INVOICE GENERATION & BILLING

22.5.1 BILLING CYCLE

**Standard Billing Cycle:**
- Billing period: 1st of month to last day of month
- Invoice generation: 1st of following month (02:00 UTC)
- Payment due: 15 days from invoice date
- Late payment fee: 1.5% per month on overdue balance

**Annual Prepayment:**
- 17% discount on base subscription fee
- Usage charges still billed monthly
- Annual contract with quarterly true-up

────────────────────────────────────────────────────────────────────────

22.5.2 INVOICE CALCULATION LOGIC

```python
@celery_app.task
def generate_monthly_invoice(org_id: UUID, period_start: date):
    """
    Generate invoice for organization for given billing period.
    """
    period_end = last_day_of_month(period_start)
    
    # Get tier configuration
    subscription = db.get_org_subscription(org_id)
    tier_config = TIER_CONFIGS[subscription.tier]
    
    # Get usage summary
    usage = db.get_usage_summary(org_id, period_start, period_end)
    
    # Calculate base subscription (prorated if mid-month change)
    base_fee = tier_config.monthly_fee
    if subscription.changed_mid_period:
        base_fee = prorate_subscription_fee(
            subscription.old_tier, 
            subscription.new_tier,
            subscription.change_date,
            period_start,
            period_end
        )
    
    # Calculate usage overages
    usage_charges = {
        'messages': calculate_overage(
            usage.messages_sent_total,
            tier_config.included_messages,
            tier_config.price_per_message
        ),
        'interviews': calculate_overage(
            usage.interviews_completed,
            tier_config.included_interviews,
            tier_config.price_per_interview
        ),
        'candidates': calculate_candidate_overage(
            usage.candidates_active_avg,
            tier_config.included_candidates,
            tier_config.price_per_candidate,
            days_in_period=days_between(period_start, period_end)
        ),
        'api_calls': calculate_overage(
            usage.api_calls_total,
            tier_config.included_api_calls,
            tier_config.price_per_1k_calls
        ),
        'user_seats': calculate_overage(
            usage.user_seats_active,
            tier_config.included_users,
            tier_config.price_per_user
        )
    }
    
    # Marketplace fees/credits
    marketplace_net = (
        usage.marketplace_revenue_earned - 
        usage.marketplace_fees_owed
    )
    
    # Generate line items
    line_items = [
        {
            'description': f'{subscription.tier.title()} Subscription',
            'quantity': 1,
            'unit_price': base_fee,
            'amount': base_fee
        }
    ]
    
    for usage_type, charge in usage_charges.items():
        if charge > 0:
            line_items.append({
                'description': f'{usage_type.title()} Overage',
                'quantity': charge['quantity'],
                'unit_price': charge['unit_price'],
                'amount': charge['total']
            })
    
    if marketplace_net != 0:
        line_items.append({
            'description': 'Marketplace Net Activity',
            'quantity': 1,
            'unit_price': marketplace_net,
            'amount': marketplace_net
        })
    
    # Calculate totals
    subtotal = sum(item['amount'] for item in line_items)
    tax = calculate_tax(org_id, subtotal)  # Based on org location
    total = subtotal + tax
    
    # Create invoice record
    invoice = db.create_invoice(
        org_id=org_id,
        period_start=period_start,
        period_end=period_end,
        line_items=line_items,
        subtotal=subtotal,
        tax=tax,
        total=total,
        due_date=period_end + timedelta(days=15)
    )
    
    # Send to payment processor (Stripe/Chargebee)
    payment_processor.create_invoice(invoice)
    
    # Notify customer
    send_invoice_email(org_id, invoice.id)
    
    return invoice.id


def calculate_overage(actual: int, included: int, unit_price: Decimal) -> dict:
    """Calculate overage charges."""
    if actual <= included:
        return {'quantity': 0, 'unit_price': unit_price, 'total': Decimal('0')}
    
    overage_qty = actual - included
    total = overage_qty * unit_price
    
    return {
        'quantity': overage_qty,
        'unit_price': unit_price,
        'total': total
    }


def calculate_candidate_overage(
    avg_active: Decimal, 
    included: int, 
    price_per_candidate: Decimal,
    days_in_period: int
) -> dict:
    """
    Calculate prorated candidate storage overage.
    Average daily overage across billing period.
    """
    if avg_active <= included:
        return {'quantity': 0, 'unit_price': price_per_candidate, 'total': Decimal('0')}
    
    avg_overage = avg_active - included
    
    # Prorated cost: (avg_overage × price_per_candidate)
    # Already averaged over period, so no additional proration needed
    total = avg_overage * price_per_candidate
    
    return {
        'quantity': float(avg_overage),
        'unit_price': price_per_candidate,
        'total': total
    }
```

────────────────────────────────────────────────────────────────────────

22.5.3 INVOICE DATABASE SCHEMA

```sql
CREATE TABLE billing_invoice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES org_tenant(id),
  
  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Amounts
  subtotal NUMERIC(12,2) NOT NULL,
  tax NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) NOT NULL,
  amount_paid NUMERIC(12,2) DEFAULT 0,
  amount_due NUMERIC(12,2) NOT NULL,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN 
    ('draft', 'sent', 'paid', 'overdue', 'void', 'disputed')),
  
  -- Dates
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  
  -- External references
  external_invoice_id TEXT,  -- Stripe/Chargebee invoice ID
  payment_method_id TEXT,
  
  -- Metadata
  line_items JSONB NOT NULL,
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(org_id, period_start)
);

CREATE INDEX idx_invoice_org_status 
  ON billing_invoice(org_id, status);
CREATE INDEX idx_invoice_due_date 
  ON billing_invoice(due_date) WHERE status IN ('sent', 'overdue');

-- Line items stored as JSONB array
-- Example structure:
{
  "line_items": [
    {
      "description": "Professional Subscription",
      "quantity": 1,
      "unit_price": 799.00,
      "amount": 799.00,
      "type": "subscription"
    },
    {
      "description": "Message Overage",
      "quantity": 1250,
      "unit_price": 0.015,
      "amount": 18.75,
      "type": "usage_overage",
      "usage_type": "messages"
    },
    {
      "description": "Marketplace Revenue Share",
      "quantity": 1,
      "unit_price": 250.00,
      "amount": 250.00,
      "type": "marketplace_credit"
    }
  ]
}
```

────────────────────────────────────────────────────────────────────────
22.6 PAYMENT PROCESSING INTEGRATION

**Primary Provider: Stripe** (with Chargebee fallback for complex subscription management)

22.6.1 PAYMENT METHODS
- Credit/Debit Cards (Visa, MC, Amex, Discover)
- ACH Direct Debit (US agencies, $10,000+ invoices)
- Wire Transfer (Enterprise/Network tiers)
- Invoice + Net 30 terms (Enterprise with credit approval)

22.6.2 FAILED PAYMENT HANDLING
```python
# Retry schedule for failed payments
PAYMENT_RETRY_SCHEDULE = [
  {'delay_days': 3, 'attempt': 1},
  {'delay_days': 5, 'attempt': 2},
  {'delay_days': 7, 'attempt': 3}
]

# After 3 failed attempts:
# - Account enters "limited" mode (read-only, no new messages/interviews)
# - Email/SMS dunning notifications
# - After 30 days: Account suspended, data retained for 90 days
# - After 120 days: Account deleted (anonymized analytics retained)
```

────────────────────────────────────────────────────────────────────────
22.7 USAGE ALERTS & COST CONTROLS

Organizations can configure alerts and hard caps to prevent surprise charges.

**Alert Thresholds (configurable per org):**
```json
{
  "alerts": {
    "messages": {
      "warning_pct": 80,      // Alert at 80% of included limit
      "critical_pct": 95,     // Alert at 95%
      "hard_cap": false,      // Allow overages
      "hard_cap_limit": null
    },
    "interviews": {
      "warning_pct": 75,
      "critical_pct": 90,
      "hard_cap": true,       // Block new interviews at limit
      "hard_cap_limit": 50
    },
    "monthly_spend": {
      "warning_amount": 1000,
      "critical_amount": 1500,
      "hard_cap": true,
      "hard_cap_limit": 2000  // Suspend non-critical operations at $2K
    }
  },
  "notification_channels": {
    "email": ["billing@agency.com", "ceo@agency.com"],
    "slack_webhook": "https://hooks.slack.com/...",
    "sms": ["+1234567890"]
  }
}
```

**Real-time Usage Dashboard:**
- Current billing period progress (days remaining, usage %)
- Live counters for messages, interviews, API calls
- Projected month-end cost based on current trajectory
- Downloadable usage reports (CSV/JSON)
- Historical trends (3/6/12 months)

────────────────────────────────────────────────────────────────────────
22.8 TIER MIGRATION & PRORATION

**Upgrade/Downgrade Rules:**
- Upgrades: Immediate effect, prorated credit for unused portion of old tier
- Downgrades: Effective next billing period (grace period to stay within new limits)
- Annual contracts: Tier changes allowed quarterly, subject to contract amendment

**Proration Formula:**
```python
def prorate_subscription_fee(
    old_tier_fee: Decimal,
    new_tier_fee: Decimal,
    change_date: date,
    period_start: date,
    period_end: date
) -> Decimal:
    """
    Calculate prorated subscription fee for mid-period tier change.
    """
    total_days = (period_end - period_start).days + 1
    days_on_old_tier = (change_date - period_start).days
    days_on_new_tier = (period_end - change_date).days + 1
    
    old_tier_charge = (old_tier_fee / total_days) * days_on_old_tier
    new_tier_charge = (new_tier_fee / total_days) * days_on_new_tier
    
    return old_tier_charge + new_tier_charge
```

────────────────────────────────────────────────────────────────────────
22.9 FINANCIAL REPORTING & ANALYTICS

**Available Reports (via Dashboard):**
1. **Monthly Billing Summary:** Base fees, usage charges, marketplace activity
2. **Usage Trends:** Message/interview volume over time, seasonal patterns
3. **Cost per Placement:** Total platform costs divided by successful placements
4. **ROI Calculator:** Platform costs vs. placement revenue, time-to-fill savings
5. **Marketplace Performance:** Referral revenue, candidate sharing velocity

**Export Formats:**
- PDF invoices (emailed automatically)
- CSV usage data (API endpoint + dashboard download)
- QuickBooks/Xero integration (webhook push of invoice data)

────────────────────────────────────────────────────────────────────────
22.10 PRICING EVOLUTION & ROADMAP

**v4.1 (Current):**
- Four-tier subscription model
- Usage-based messaging/interview charges
- Marketplace revenue sharing

**v4.2 (Planned Q2 2026):**
- Per-placement pricing option (for agencies who prefer success-based fees)
- Volume discount tiers (e.g., 10% off if 500+ interviews/month)
- Credits system (buy message/interview credits in bulk at discount)

**v5.0 (Vision):**
- White-label SaaS for large agencies to resell to their clients
- AI model tiers (economy/standard/premium) with different capabilities/costs
- Multi-currency support (GBP, EUR, AUD)

────────────────────────────────────────────────────────────────────────
22.11 COMPLIANCE & TAX CONSIDERATIONS

**Sales Tax Collection:**
- US: State-level sales tax on SaaS subscriptions (varies by state)
- EU: VAT collection required for EU-based agencies (reverse charge if applicable)
- Tax rates managed via Stripe Tax or TaxJar integration

**Revenue Recognition:**
- Subscription fees: Recognized ratably over subscription period
- Usage fees: Recognized in the month incurred
- Marketplace fees: Recognized when placement confirmed (not when candidate hired)

**Customer Data for Tax:**
```sql
ALTER TABLE org_tenant ADD COLUMN tax_id TEXT;  -- VAT/EIN
ALTER TABLE org_tenant ADD COLUMN tax_exempt BOOLEAN DEFAULT false;
ALTER TABLE org_tenant ADD COLUMN tax_exemption_cert TEXT;  -- S3 URL
```

────────────────────────────────────────────────────────────────────────

END SECTION 22
