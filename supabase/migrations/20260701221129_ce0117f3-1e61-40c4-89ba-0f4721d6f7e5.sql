CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL CHECK (kind IN ('site-visit', 'apartment-booking', 'callback', 'brochure', 'contact')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'visited', 'reserved', 'completed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
  source TEXT NOT NULL,
  project_name TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  agent TEXT NOT NULL DEFAULT 'Lumen Sales Team',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (
  char_length(customer_name) BETWEEN 2 AND 80
  AND customer_phone ~ '^01[3-9][0-9]{8}$'
  AND source IN ('/book-visit', '/book-apartment', '/callback', '/brochure', '/contact')
);

CREATE POLICY "Authenticated staff can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated staff can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_leads_lead_id ON public.leads (lead_id);
CREATE INDEX idx_leads_customer_phone_created_at ON public.leads (customer_phone, created_at DESC);
CREATE INDEX idx_leads_kind_status_created_at ON public.leads (kind, status, created_at DESC);
CREATE INDEX idx_leads_project_name ON public.leads (project_name);
